import { SocketService } from '@services';
import { UiStore } from '../stores/Ui.store';

export const Core = {
    ui: new UiStore(),
    socket: SocketService.getInstance(),
};

// export const inject = (store:)
