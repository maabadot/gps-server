import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { GeotagsService } from './geotags.service';
import { Geotag } from 'src/schema/geotag.schema';
import { CreateGeotagDto } from './dto/create-geotag.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('geotags')
export class GeotagsController {
    constructor(private readonly geotagsService: GeotagsService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOne(
        @Param('id') id: string,
        @Query() queryParams: any,
        @Request() req: any,
    ): Promise<Geotag[]> {
        return this.geotagsService.getGeotagById(id, req, queryParams);
    }

    @Post(':id')
    createOne(
        @Param('id') id: string,
        @Body() createGeotagDto: CreateGeotagDto,
    ): Promise<Geotag> {
        return this.geotagsService.createGeotag(id, createGeotagDto);
    }
}
