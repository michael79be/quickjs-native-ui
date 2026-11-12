import * as os from 'os';
import { run } from './script';
import { loadLibrary, stringToUtf16Bytes } from 'quickjs-native';

function zenity(args: string[]): number {
    const status = os.exec(args);
    if (127 === status) {
        throw new Error('Unable to run zenity. Install it and ensure it is available on PATH.');
    }

    return status;
}

function messageBox(message: string, title: string, type: number): number {
    const user32 = loadLibrary('user32.dll', { MessageBoxW: 'number' });

    try {
        return user32.MessageBoxW([
            0,
            stringToUtf16Bytes(`${message}\x00`).buffer,
            stringToUtf16Bytes(`${title}\x00`).buffer,
            type
        ]);
    } finally {
        user32.destroy();
    }
}

export function alert(message: string, title?: string): void {
    if ('darwin' === os.platform) {
        let script = `display alert "${title ?? ''}" message "${message}"`;
        run(script);

        return;
    }

    if ('linux' === os.platform) {
        const args = ['zenity', '--info', `--text=${message}`];
        if (undefined !== title) {
            args.push(`--title=${title}`);
        }
        const status = zenity(args);
        if (0 !== status && 1 !== status) {
            throw new Error(`zenity info dialog exited with status ${status}.`);
        }

        return;
    }

    messageBox(message, title ?? '', 0);
}

export function confirm(message: string, title?: string): boolean {
    if ('darwin' === os.platform) {
        let script = `display dialog "${message}"`;
        if (undefined !== title) {
            script += `with title "${title}"`;
        }
        script += `default button "OK"`;

        return -1 !== (run(script) ?? '').indexOf(':OK');
    }

    if ('linux' === os.platform) {
        const args = ['zenity', '--question', `--text=${message}`];
        if (undefined !== title) {
            args.push(`--title=${title}`);
        }
        const status = zenity(args);
        if (0 === status) {
            return true;
        }
        if (1 === status) {
            return false;
        }

        throw new Error(`zenity question dialog exited with status ${status}.`);
    }

    return 1 === messageBox(message, title ?? '', 1);
}
