import { Schema, model, Document } from 'mongoose';
import { ScheduleEventStrict } from 'types';

export type IActivityEvent = ScheduleEventStrict & Document;

const ActivityModel = new Schema({
    date: { type: Number, required: true },
    title: { type: String, required: true },
    stack: String,
    salary: String,
    contacts: String,
    additional: String,
    color: String,
});

export const Activity = model<IActivityEvent>('Activity', ActivityModel);
