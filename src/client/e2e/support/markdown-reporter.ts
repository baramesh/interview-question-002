import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { format } from 'prettier';
import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';

interface Options {
  outputFile: string;
  screenshotDir: string;
  baseURL: string;
}
interface Recorded {
  id: string;
  title: string;
  project: string;
  status: string;
  durationMs: number;
  screenshot?: string;
  error?: string;
}

export default class MarkdownReporter implements Reporter {
  private readonly results: Recorded[] = [];
  private totalTests = 0;
  constructor(private readonly options: Options) {}
  onBegin(_config: FullConfig, suite: Suite): void {
    this.totalTests = suite.allTests().length;
  }
  onTestEnd(test: TestCase, result: TestResult): void {
    const match = /^((?:TC|SEC)-[A-Z0-9-]+)\s+(.+)$/.exec(test.title);
    const passed = result.status === test.expectedStatus;
    const id = match?.[1] ?? 'UNMAPPED';
    const attachment = result.attachments.find(
      (item) => item.contentType === 'image/png' && item.path,
    );
    let screenshot: string | undefined;
    if (attachment?.path) {
      const screenshotDir = resolve(process.cwd(), this.options.screenshotDir);
      const screenshotPath = resolve(screenshotDir, `${id.toLowerCase()}.png`);
      mkdirSync(screenshotDir, { recursive: true });
      copyFileSync(attachment.path, screenshotPath);
      screenshot = relative(
        dirname(resolve(process.cwd(), this.options.outputFile)),
        screenshotPath,
      )
        .split(sep)
        .join('/');
    }
    this.results.push({
      id,
      title: match?.[2] ?? test.title,
      project: test.parent.project()?.name ?? '-',
      status: passed ? 'PASS' : result.status.toUpperCase(),
      durationMs: result.duration,
      screenshot,
      error: passed ? undefined : result.error?.message,
    });
  }
  async onEnd(result: FullResult): Promise<void> {
    const passed = this.results.filter((item) => item.status === 'PASS').length;
    const lines = [
      '---',
      'doc_id: QAT-AUTH2-04',
      'module: AUTH2',
      'type: playwright-test-result',
      `generated_at: ${new Date().toISOString()}`,
      '---',
      '',
      '# QAT-AUTH2-04 — ผลทดสอบ Playwright',
      '',
      '> ไฟล์นี้สร้างอัตโนมัติจาก `npm run test:e2e` ห้ามแก้ผลด้วยมือ',
      '',
      '## สภาพแวดล้อม',
      '',
      '| รายการ | ค่า |',
      '|---|---|',
      `| Base URL | \`${this.options.baseURL}\` |`,
      '| Browser | Chromium |',
      '| ระบบที่ทดสอบ | Angular → Nginx → ASP.NET Core API → PostgreSQL บน OrbStack |',
      '',
      '## สรุปผล',
      '',
      '| ทั้งหมด | ผ่าน | ไม่ผ่าน | สถานะ |',
      '|---:|---:|---:|---|',
      `| ${this.totalTests} | ${passed} | ${this.results.length - passed} | ${result.status === 'passed' ? 'PASS' : result.status.toUpperCase()} |`,
      '',
      '## ผลรายกรณี',
      '',
      '| Test Case ID | ชื่อกรณีทดสอบ | ประเภท | ผล | เวลา (ms) | Screenshot |',
      '|---|---|---|---|---:|---|',
      ...this.results.map(
        (item) =>
          `| ${item.id} | ${escapeCell(item.title)} | ${category(item.id)} | ${item.status} | ${item.durationMs} | ${item.screenshot ? `[เปิดภาพ](${item.screenshot})` : '—'} |`,
      ),
    ];
    const screenshots = this.results.filter((item) => item.screenshot);
    if (screenshots.length) {
      lines.push('', '## ภาพหลักฐาน', '');
      for (const item of screenshots)
        lines.push(
          `### ${item.id} — ${item.title}`,
          '',
          `![${item.id} — ${item.title}](${item.screenshot})`,
          '',
        );
    }
    const failures = this.results.filter((item) => item.error);
    if (failures.length) {
      lines.push('', '## รายละเอียดข้อผิดพลาด', '');
      for (const item of failures)
        lines.push(`### ${item.id}`, '', '```text', item.error ?? '', '```', '');
    }
    lines.push(
      '',
      '## การสืบย้อน',
      '',
      '- Test Step และผลที่คาดหวัง: `playwright-test-cases.md`',
      '- รหัสในรายงานตรงกับ `src/client/e2e/authentication.spec.ts`',
      '',
    );
    const outputPath = resolve(process.cwd(), this.options.outputFile);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(
      outputPath,
      await format(`${lines.join('\n')}\n`, { parser: 'markdown' }),
      'utf8',
    );
  }
  printsToStdio(): boolean {
    return false;
  }
}

function escapeCell(value: string): string {
  return value.replaceAll('|', '\\|').replaceAll('\n', '<br>');
}
function category(id: string): string {
  if (id.includes('-VAL-')) return 'Validation';
  if (id.includes('-RESP-')) return 'Responsive';
  if (id.startsWith('SEC-')) return 'Security';
  return 'Functional';
}
