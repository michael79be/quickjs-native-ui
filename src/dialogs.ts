import { utf16 } from './utf16';

export function alert(message: string, title?: string): boolean {
    const user32 = native.dlopen('user32.dll');

    if (0 !== user32 && null !== user32) {
        const messageBoxW = native.dlsym(user32, 'MessageBoxW');

        if (messageBoxW) {
            const result = native.invoke(messageBoxW, [0, utf16(`${message}\x00`).buffer, utf16(`${title ?? ''}\x00`).buffer, 0]);
            print(result);
        }

        native.dlclose(user32);

        return true;
    } else {
        throw new Error('Error loading user32.dll');
    }
}
