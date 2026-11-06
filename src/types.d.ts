export { };

declare global {
    function print(...args: any[]): void;
    const native: {
        dlopen(path: string): number | null;
        dlsym(handle: number, symbol: string): number | null;
        invoke(handle: number, args: any[]): number | null;
        dlclose(handle: number): number | null;
    };
}
