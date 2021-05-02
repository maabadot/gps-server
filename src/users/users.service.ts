import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tracker, TrackerDocument } from 'src/schema/tracker.schema';
import { User, UserDocument } from 'src/schema/user.schema';
import { AddTrackerDto } from './dto/add-tracker.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Tracker.name) private trackerModel: Model<TrackerDocument>,
    ) {}

    async findOne(email: string): Promise<User> {
        return this.userModel.findOne({ email: email }).exec();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.findOne(createUserDto.email);
        if (!user) {
            const newUser = new this.userModel({
                ...createUserDto,
                authorizedTrackers: [],
            });

            return newUser.save();
        } else {
            throw new HttpException(
                'User with such email already exists!',
                HttpStatus.CONFLICT,
            );
        }
    }

    async addTracker(
        trackerId: string,
        addTrackerDto: AddTrackerDto,
        req: any,
    ): Promise<User> {
        const tracker = await this.trackerModel.findOne({
            trackerId: trackerId,
        });
        if (
            tracker &&
            tracker.trackerPassword == addTrackerDto.trackerPassword
        ) {
            const user = await this.userModel
                .findById(req.user.userId)
                .select('-userPassword');
            const authorizedTrackers = user.authorizedTrackers.map(
                (tracker) => tracker.id,
            );
            if (authorizedTrackers.includes(trackerId)) {
                throw new HttpException(
                    'This tracker is already authorized.',
                    HttpStatus.CONFLICT,
                );
            } else {
                user.authorizedTrackers = [
                    ...user.authorizedTrackers,
                    {
                        id: trackerId,
                        alias: addTrackerDto.alias || `Tracker ${trackerId}`,
                    },
                ];
                return user.save();
            }
        } else {
            throw new UnauthorizedException();
        }
    }
}
