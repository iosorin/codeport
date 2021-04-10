export class ToastManager {
    toasts: { message: string; id: number }[] = [];

    constructor(public timeout = 300) {}

    log = (message: string, timeout = this.timeout) => {
        const id = this.toasts.length;

        this.toasts.push({ id, message });

        setTimeout(() => {
            this.toasts = this.toasts.filter((toast) => toast.id === id);
        }, timeout);
    };
}
