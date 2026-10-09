import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

type SharpTask =
  | { kind: 'favicon'; svg: string }
  | { kind: 'og'; svg: string; brandColor: string }
  | { kind: 'probe'; svg: string };

const workerPath = join(process.cwd(), 'scripts', 'sharp-worker.mjs');

export function runSharpTask(task: SharpTask): Buffer {
  const result = spawnSync(process.execPath, [workerPath], {
    input: JSON.stringify(task),
    maxBuffer: 16 * 1024 * 1024,
  });

  if (result.error) throw result.error;

  const stderr = result.stderr?.toString();
  if (result.status !== 0) {
    throw new Error(stderr || `Sharp worker exited with code ${result.status ?? 'unknown'}`);
  }
  if (stderr) process.stderr.write(stderr);
  if (!result.stdout.length) throw new Error('Sharp worker returned no output');

  return result.stdout;
}
