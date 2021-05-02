import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tracker, TrackerDocument } from 'src/schema/tracker.schema';
import { CreateTrackerDto } from './dto/create-tracker.dto';

@Injectable()
export class TrackersService {
    constructor(
        @InjectModel(Tracker.name) private trackerModel: Model<TrackerDocument>,
    ) {}

    async createTracker(createTrackerDto: CreateTrackerDto): Promise<Tracker> {
        const newTracker = new this.trackerModel(createTrackerDto);
        return newTracker.save();
    }
}
