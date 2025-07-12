import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Rating, RatingDocument } from '../schemas/rating.schema';
import { CreateRatingDto } from '../dto/rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name) private ratingModel: Model<RatingDocument>,
  ) {}

  async create(
    createRatingDto: CreateRatingDto,
    raterId: string,
  ): Promise<Rating> {
    const createdRating = new this.ratingModel({
      ...createRatingDto,
      raterId: new Types.ObjectId(raterId),
      swapId: new Types.ObjectId(createRatingDto.swapId),
      ratedUserId: new Types.ObjectId(createRatingDto.ratedUserId),
    });
    return createdRating.save();
  }

  async findByUser(userId: string): Promise<Rating[]> {
    return this.ratingModel
      .find({ ratedUserId: new Types.ObjectId(userId) })
      .populate('raterId', '-password')
      .exec();
  }

  async findBySwap(swapId: string): Promise<Rating[]> {
    return this.ratingModel
      .find({ swapId: new Types.ObjectId(swapId) })
      .populate('raterId ratedUserId', '-password')
      .exec();
  }

  async getAverageRating(
    userId: string,
  ): Promise<{ average: number; total: number }> {
    const ratings = await this.ratingModel.find({
      ratedUserId: new Types.ObjectId(userId),
    });

    if (ratings.length === 0) {
      return { average: 0, total: 0 };
    }

    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const average = total / ratings.length;

    return { average: Math.round(average * 100) / 100, total: ratings.length };
  }
}
