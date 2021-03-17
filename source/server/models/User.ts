import { Schema, model, Document, Model } from 'mongoose';
import { ScheduleEventStrict, ScheduleEvent } from 'types';

export interface IUser extends Document {
    email: string;
    name: string;
    schedule: ScheduleEvent[];
    activity: ScheduleEventStrict[];
}

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    completed: [
        {
            completeEventId: {
                type: Schema.Types.ObjectId,
                ref: 'CompleteEvent',
                required: true,
            },
        },
    ],
    schedule: [
        {
            scheduleEventId: {
                type: Schema.Types.ObjectId,
                ref: 'ScheduleEvent',
                required: true,
            },
        },
    ],
});

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);
