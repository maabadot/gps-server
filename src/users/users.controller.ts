import {
    Body,
    Controller,
    Param,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AddTrackerDto } from './dto/add-tracker.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('addtracker/:id')
    addTracker(
        @Request() req,
        @Param('id') id: string,
        @Body() addTrackerDto: AddTrackerDto,
    ) {
        return this.usersService.addTracker(id, addTrackerDto, req);
    }
}
