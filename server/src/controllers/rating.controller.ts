import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RatingService } from '../services/rating.service';
import { CreateRatingDto } from '../dto/rating.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('ratings')
@UseGuards(JwtAuthGuard)
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async create(@Body() createRatingDto: CreateRatingDto, @Request() req) {
    const rating = await this.ratingService.create(
      createRatingDto,
      req.user.userId,
    );
    return { message: 'Rating created successfully', rating };
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    const ratings = await this.ratingService.findByUser(userId);
    return { ratings };
  }

  @Get('swap/:swapId')
  async findBySwap(@Param('swapId') swapId: string) {
    const ratings = await this.ratingService.findBySwap(swapId);
    return { ratings };
  }

  @Get('average/:userId')
  async getAverageRating(@Param('userId') userId: string) {
    const average = await this.ratingService.getAverageRating(userId);
    return { average };
  }
}
