import { makeAutoObservable } from 'mobx';
import type { ScheduleEvent } from 'types';
import { date, debounce, groupBy, randomEventColor } from '@/library/utils';
import { api, Contract } from './api';

type ScheduleEventOrNull = Partial<ScheduleEvent> | null | undefined;

class ScheduleStore {
	events: ScheduleEvent[] = [];

	dialogVisible = false;

	confirmDialogVisible = false;

	dialogEvent: ScheduleEventOrNull = null;

	constructor() {
		makeAutoObservable(this);
	}

	get empty() {
		return !this.events.length;
	}

	get active() {
		return this.group(
			[...this.events]
				.sort((a, b) => a.date - b.date)
				.filter((event) => event.date >= Date.now())
		);
	}

	get expired() {
		return this.group(
			[...this.events]
				.sort((a, b) => b.date - a.date)
				.filter((event) => event.date < Date.now())
		);
	}

	get today() {
		return this.events.filter((event) => date.match(event.date));
	}

	group = (events: ScheduleEvent[]) =>
		groupBy<ScheduleEvent>(events, (event) => date.when(event.date, false));

	toggleDialog = (event?: ScheduleEventOrNull, visible?: boolean) => {
		this.setDialogEvent(event);

		this.dialogVisible =
			typeof visible === 'boolean' ? visible : Boolean(event);
	};

	openDialog = () => this.toggleDialog(null, true);

	toggleConfirmDialog = (event?: ScheduleEventOrNull) => {
		this.setDialogEvent(event);

		this.confirmDialogVisible = Boolean(event);
	};

	setDialogEvent = (dialogEvent: ScheduleEventOrNull = null) => {
		this.dialogEvent = dialogEvent;
	};

	updateDialogEvent = (details: ScheduleEvent) => {
		this.setDialogEvent({ ...this.dialogEvent, ...details });
	};

	setEvents = (events: ScheduleEvent[]) => {
		this.events = events;
	};

	fetch = () => api.get().then(this.setEvents);

	create = (data: Contract['create']) => {
		// date problem
		if (!data.date) data.date = date.addDays(1);
		if (!data.color) data.color = randomEventColor();

		return api.create(data).then(debounce(this.setEvents));
	};

	update = (data: Contract['update']) =>
		api.update(data).then(debounce(this.setEvents));

	remove = (id: Contract['id']) => api.remove(id).then(this.setEvents);
}

const store = new ScheduleStore();

export type ScheduleStoreType = typeof store;

export default store;
