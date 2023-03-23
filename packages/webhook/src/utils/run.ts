import { exec, ExecOptions } from 'child_process';

export type RunResult =
  | {
      success: true;
      command: string;
      stdout: string;
      stderr: string;
    }
  | {
      success: false;
      command: string;
      errorMessage: string;
    };

export async function run(command: string, options?: ExecOptions) {
  return new Promise<RunResult>(resolve => {
    exec(command, resovleDefaultRunOptions(options), (error, stdout, stderr) => {
      if (error) {
        resolve({ success: false, command, errorMessage: error.message });
      } else {
        resolve({ success: true, command, stdout, stderr });
      }
    });
  });
}

export async function runAll(commandLines: string, options?: ExecOptions) {
  const commands = commandLines.trim().split('\n');
  const outputBuffer: RunResult[] = [];
  for (const command of commands) {
    const result = await run(command.trim(), options);
    outputBuffer.push(result);
    if (!result.success) {
      break;
    }
  }
  return outputBuffer;
}

function resovleDefaultRunOptions(options: ExecOptions = {}): ExecOptions {
  return {
    env: {
      PATH: process.env.PATH,
    },
    ...options,
  };
}
