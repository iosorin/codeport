import { SocketService } from '@services';
import { ToastStore } from '@/stores/Toast.store';
import { UiStore } from '@/stores/Ui.store';

export const core = {
    ui: new UiStore(),
    toast: new ToastStore(),
    socket: SocketService.getInstance(),
};

export function dep<K extends keyof typeof core>(key: K) {
    return core[key];
}
