import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GeotagDocument = Geotag & Document;

@Schema()
export class Geotag {
    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    time: Date;

    @Prop({ required: true })
    trackerId: string;
}

export const GeotagSchema = SchemaFactory.createForClass(Geotag);
