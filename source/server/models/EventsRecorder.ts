type EventsRecorderEvent = {
	roomID: string;
	startDate: number;
	endDate: number;
	minutes: number;
};

export class EventsRecorder {
	private events: EventsRecorderEvent[] = [];

	constructor(
		public saveOnServer: (date: number, time: number, roomID: string) => void
	) {}

	createCandidate = (roomID: string) => {
		const index = this.events.findIndex((event) => event.roomID === roomID);

		const candidate = {
			roomID,
			startDate: Date.now(),
			endDate: 0,
			minutes: 0,
		};

		index >= 0 ? (this.events[index] = candidate) : this.events.push(candidate);

		return candidate;
	};

	saveCandidate = (roomID: string) => {
		if (!roomID) return;

		const candidate = this.setEndDate(roomID);

		if (candidate)
			this.saveOnServer(
				candidate.startDate,
				candidate.minutes,
				candidate.roomID
			);
	};

	setEndDate = (roomID: string, endDate = Date.now()) => {
		const candidate = this.events.find((event) => event.roomID === roomID);

		if (!candidate) return;

		candidate.endDate = endDate;
		candidate.minutes = Math.round(
			(candidate.endDate - candidate.startDate) / 60000
		);

		return candidate;
	};
}
