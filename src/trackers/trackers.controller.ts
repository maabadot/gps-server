import { Body, Controller, Post } from '@nestjs/common';
import { CreateTrackerDto } from './dto/create-tracker.dto';
import { TrackersService } from './trackers.service';

@Controller('trackers')
export class TrackersController {
    constructor(private readonly trackersService: TrackersService) {}

    @Post()
    createOne(@Body() createTrackerDto: CreateTrackerDto) {
        return this.trackersService.createTracker(createTrackerDto);
    }
}
