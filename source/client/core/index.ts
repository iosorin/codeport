import { configure } from 'mobx';

export * from './context';
export * from './core';

// global mobx configuration
configure({
    enforceActions: 'observed',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: false,
    disableErrorBoundaries: false,
});
