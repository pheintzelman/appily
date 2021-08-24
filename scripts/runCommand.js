import util from 'util';
import childProcess from 'child_process';

const exec = util.promisify(childProcess.exec);
const fork = util.promisify(childProcess.fork);

export async function runCommand(command, log) {
  const commandPromise = exec(command, {
    env: { ...process.env, FORCE_COLOR: true },
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024, //increase here
    killSignal: 'SIGTERM'
  });

  const { child } = commandPromise;

  child.stdout.on('data', function (data) {
    if (!log) {
      console.log(data);
    } else {
      log.push(data);
    }
  });

  child.stderr.on('data', function (data) {
    if (!log) {
      console.error(data);
    } else {
      log.push(data);
    }
  });

  let _code = null;
  child.on('close', function (code) {
    _code = code;
  });

  await commandPromise;

  return _code;
}
