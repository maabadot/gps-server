import { Module } from '@nestjs/common';
import { TrackersService } from './trackers.service';
import { TrackersController } from './trackers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tracker, TrackerSchema } from 'src/schema/tracker.schema';

@Module({
    controllers: [TrackersController],
    providers: [TrackersService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Tracker.name,
                schema: TrackerSchema,
            },
        ]),
    ],
})
export class TrackersModule {}
