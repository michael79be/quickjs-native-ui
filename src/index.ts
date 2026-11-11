import { alert, confirm } from './dialogs';

const imports: { [key: string]: any } = {
    alert: alert,
    confirm: confirm
};

Object.keys(imports).forEach((key: string) => {
    if (undefined !== imports[key]) {
        print(`[OK] ${key} is defined`);
    } else {
        print(`[ERR] ${key} is not defined`)
    }
});
