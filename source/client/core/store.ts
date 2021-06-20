import { UiStore } from '@/stores/ui.store';
import { ToastStore } from '@/stores/toast.store';
import { SocketStore } from '@/stores/socket.store';
import { SnippetsStore } from '@/features/Snippets';

class RootStore {
	ui = new UiStore();

	toast = new ToastStore();

	socket = SocketStore.getInstance();

	snippets = new SnippetsStore();
}

export const store = new RootStore();

export function always<K extends keyof typeof store>(key: K) {
	return store[key];
}
