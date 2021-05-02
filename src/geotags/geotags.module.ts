import { Module } from '@nestjs/common';
import { GeotagsService } from './geotags.service';
import { GeotagsController } from './geotags.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Geotag, GeotagSchema } from 'src/schema/geotag.schema';
import { Tracker, TrackerSchema } from 'src/schema/tracker.schema';
import { User, UserSchema } from 'src/schema/user.schema';

@Module({
    controllers: [GeotagsController],
    providers: [GeotagsService],
    imports: [
        MongooseModule.forFeature([
            { name: Geotag.name, schema: GeotagSchema },
            { name: Tracker.name, schema: TrackerSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
})
export class GeotagsModule {}
