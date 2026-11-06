import * as os from 'os';
import { run } from './script';
import { utf16 } from './utf16';

export function alert(message: string, title?: string): boolean {
    if ('darwin' === os.platform) {
        let script = `display dialog "${message}"`;
        if (undefined !== title) {
            script += `with title "${title}"`;
        }
        script += `default button "OK"`;

        return -1 !== (run(script) ?? '').indexOf(':OK');
    }

    const user32 = native.dlopen('user32.dll') ?? 0;

    if (0 !== user32) {
        const messageBoxW = native.dlsym(user32, 'MessageBoxW');

        let result: number | null = 0;

        if (messageBoxW) {
            result = native.invoke(messageBoxW, [0, utf16(`${message}\x00`).buffer, utf16(`${title ?? ''}\x00`).buffer, 0]);
        }

        native.dlclose(user32);

        return 1 === result;
    } else {
        throw new Error('Error loading user32.dll');
    }
}
