import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Geotag, GeotagDocument } from 'src/schema/geotag.schema';
import { Tracker, TrackerDocument } from 'src/schema/tracker.schema';
import { User, UserDocument } from 'src/schema/user.schema';
import { CreateGeotagDto } from './dto/create-geotag.dto';

@Injectable()
export class GeotagsService {
    constructor(
        @InjectModel(Geotag.name) private geotagModel: Model<GeotagDocument>,
        @InjectModel(Tracker.name) private trackerModel: Model<TrackerDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async getGeotagById(
        trackerId: string,
        req: any,
        queryParams: any,
    ): Promise<Geotag[]> {
        const user = await this.userModel.findById(req.user.userId);
        const authorizedTrackers = user.authorizedTrackers.map(
            (tracker) => tracker.id,
        );
        if (authorizedTrackers.includes(trackerId)) {
            if (Object.keys(queryParams).length !== 0) {
                return this.geotagModel
                    .find({
                        trackerId: trackerId,
                        time: { $gte: queryParams.from, $lte: queryParams.to },
                    })
                    .exec();
            } else {
                return this.geotagModel.find({ trackerId: trackerId }).exec();
            }
        } else {
            throw new UnauthorizedException();
        }
    }

    async createGeotag(
        trackerId: string,
        createGeotagDto: CreateGeotagDto,
    ): Promise<Geotag> {
        const tracker = await this.getTrackerById(trackerId);
        if (
            tracker &&
            tracker.trackerPassword === createGeotagDto.trackerPassword
        ) {
            const newGeotag = new this.geotagModel({
                ...createGeotagDto,
                time: new Date().toISOString(),
                trackerId,
            });
            return newGeotag.save();
        } else {
            throw new HttpException(
                'Invalid tracker credentials!',
                HttpStatus.UNAUTHORIZED,
            );
        }
    }

    async getTrackerById(trackerId: string): Promise<Tracker> {
        return this.trackerModel.findOne({ trackerId: trackerId }).exec();
    }
}
