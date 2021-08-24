import util from 'util';
import childProcess from 'child_process';

const fork = util.promisify(childProcess.fork);

export async function runCommandFork(command, args, options) {
  const child = childProcess.fork(command, args, options);

  return new Promise((resolve) => {
    child.on('close', (code) => {
      resolve(code);
    });
  });
  //return await commandPromise;
}
