import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrackerDocument = Tracker & Document;

@Schema()
export class Tracker {
    @Prop({ required: true })
    trackerId: string;

    @Prop({ required: true })
    trackerPassword: string;
}

export const TrackerSchema = SchemaFactory.createForClass(Tracker);
