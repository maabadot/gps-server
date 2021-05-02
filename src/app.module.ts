import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GeotagsModule } from './geotags/geotags.module';
import { TrackersModule } from './trackers/trackers.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { mongoUri } from './config';

@Module({
    imports: [
        MongooseModule.forRoot(mongoUri),
        GeotagsModule,
        TrackersModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
