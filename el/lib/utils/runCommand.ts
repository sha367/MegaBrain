import { spawn } from 'node:child_process';

export const runCommand = (command: string, args: string[], detached = false) => {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { detached, stdio: 'inherit' });

    if (!detached) {
      process.on('close', (code) => {
        if (code === 0) resolve(true);
        else reject(new Error(`Command failed with exit code ${code}`));
      });
    } else {
      resolve(true);
    }
  });
};
