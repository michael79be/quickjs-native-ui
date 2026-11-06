import { alert } from './dialogs';

const imports: { [key: string]: any } = {
    alert: alert
};

Object.keys(imports).forEach((key: string) => {
    if (undefined !== imports[key]) {
        print(`✅ ${key} is defined`);
    } else {
        print(`❌ ${key} is not defined`)
    }
});
