import * as os from 'os';

export function readAll(fd: number) {
    const chunks = [];
    const buf = new ArrayBuffer(4096);
    while (true) {
        const n = os.read(fd, buf, 0, buf.byteLength);
        if (n <= 0) break;
        chunks.push(String.fromCharCode(...new Uint8Array(buf, 0, n)));
    }
    os.close(fd);

    return chunks.join('');
};
