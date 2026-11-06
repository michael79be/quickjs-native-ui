import { alert } from './dialogs';

const imports: { [key: string]: any } = {
    alert: alert
};

Object.keys(imports).forEach((key: string) => {
    if (undefined !== imports[key]) {
        print(`[OK] ${key} is defined`);
    } else {
        print(`[ERR] ${key} is not defined`)
    }
});
