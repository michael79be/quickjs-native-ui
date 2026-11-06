export function utf16(str: string) {
    const utf16Bytes = new Uint8Array(str.length * 2);
    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i);
        utf16Bytes[i * 2] = code & 0xFF;
        utf16Bytes[i * 2 + 1] = (code >> 8) & 0xFF;
    }
    return utf16Bytes;
};
