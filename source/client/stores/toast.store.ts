import { makeAutoObservable } from 'mobx';
import { debounce } from '@utils';

type Type = 'log' | 'success' | 'error';

export type Toast = {
	id: string;
	message: string;
	type: 'log' | 'success' | 'error';
	display: boolean;
};

const DEFAULT_TIMEOUT = 1500;

export class ToastStore {
	list: Toast[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	log = (message: string, timeout?: number) => {
		this.create(message, timeout, 'log');
	};

	success = (message: string, timeout?: number) => {
		this.create(message, timeout, 'success');
	};

	error = (message: string, timeout?: number) => {
		this.create(message, timeout, 'error');
	};

	private setToasts = (toasts: Toast[]) => {
		this.list = toasts;
	};

	private create(message: string, timeout = DEFAULT_TIMEOUT, type: Type) {
		return debounce(() => {
			const id = Math.random().toString();

			this.list.push({ id, message, type, display: true });

			setTimeout(() => {
				this.destroy(id);
			}, timeout);
		})();
	}

	private destroy(id: string) {
		const toast = this.list.find((toast) => toast.id === id);

		if (!toast) return;

		toast.display = false;

		setTimeout(() => {
			this.setToasts(this.list.filter((toast) => toast.id !== id));
		}, 3000);
	}
}
