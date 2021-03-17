import { Schema, model, Document, Model } from 'mongoose';
import { CompletedScheduleEvent, ScheduleEventStrict } from 'types';

export type IEvent = ScheduleEventStrict & Document;
export type ICompletedEvent = CompletedScheduleEvent & Document;

const EventSchema = new Schema({
    date: { type: Number, required: true },
    title: { type: String, required: true },
    stack: String,
    salary: String,
    contacts: String,
    additional: String,
    color: String,
});

const CompletedEventSchema = new Schema({
    ...EventSchema.obj,
    rating: Number,
    time: { type: Number, required: true },
    // snippets,
});

export const ScheduleEventModel: Model<IEvent> = model<IEvent>('ScheduleEvent', EventSchema);

export const CompleteEventModel: Model<ICompletedEvent> = model<ICompletedEvent>(
    'CompletedEvent',
    CompletedEventSchema
);
