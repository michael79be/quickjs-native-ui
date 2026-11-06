import * as os from 'os';
import { readAll } from './io';

/**
 * Execute a script and return result using the platform scripting engine
 * darwin : osascript
 * win32 : cscript
 * linux : bash
 */
export function run(code: string): string | null {
    if ('darwin' === os.platform) {
        const [tmpRead, tmpWrite] = os.pipe();
        os.exec(['osascript', '-e', code], {
            stdout: tmpWrite,
            stderr: tmpWrite
        });
        os.close(tmpWrite);

        return readAll(tmpRead);
    }

    if ('linux' === os.platform) {
        const [tmpRead, tmpWrite] = os.pipe();
        const parts = code.split(' ');
        const exe = parts.shift() ?? 'zenity';
        const cmd = [exe, parts.join(' ')];
        os.exec(cmd, {
            stdout: tmpWrite,
            stderr: tmpWrite
        });
        os.close(tmpWrite);

        return readAll(tmpRead);
    }

    return null;
}