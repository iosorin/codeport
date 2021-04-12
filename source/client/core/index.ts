import { configure } from 'mobx';
import { SocketService } from '@services';
import { UiStore } from '../stores/Ui.store';

// global mobx configuration
configure({
    enforceActions: 'observed',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: false,
    disableErrorBoundaries: false,
});

export const Core = {
    ui: new UiStore(),
    socket: SocketService.getInstance(),
};

export function createStore<T>(Store: { new (core: typeof Core): T }) {
    return new Store(Core);
}
