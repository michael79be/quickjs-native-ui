import { alert, confirm } from '../dialogs';

if (confirm('Do you want continue ?')) {
    alert('You clicked OK');
} else {
    alert('You did NOT click OK');
}
