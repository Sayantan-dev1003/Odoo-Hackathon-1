import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Swap, SwapDocument, SwapStatus } from '../schemas/swap.schema';
import { CreateSwapDto, UpdateSwapDto } from '../dto/swap.dto';

@Injectable()
export class SwapService {
  constructor(@InjectModel(Swap.name) private swapModel: Model<SwapDocument>) {}

  async create(
    createSwapDto: CreateSwapDto,
    requesterId: string,
  ): Promise<Swap> {
    const createdSwap = new this.swapModel({
      ...createSwapDto,
      requesterId: new Types.ObjectId(requesterId),
      providerId: new Types.ObjectId(createSwapDto.providerId),
    });
    return createdSwap.save();
  }

  async findAll(): Promise<Swap[]> {
    return this.swapModel
      .find()
      .populate('requesterId providerId', '-password')
      .exec();
  }

  async findById(id: string): Promise<Swap> {
    const swap = await this.swapModel
      .findById(id)
      .populate('requesterId providerId', '-password')
      .exec();
    if (!swap) {
      throw new NotFoundException('Swap not found');
    }
    return swap;
  }

  async findByUser(userId: string): Promise<Swap[]> {
    return this.swapModel
      .find({
        $or: [
          { requesterId: new Types.ObjectId(userId) },
          { providerId: new Types.ObjectId(userId) },
        ],
      })
      .populate('requesterId providerId', '-password')
      .exec();
  }

  async update(id: string, updateSwapDto: UpdateSwapDto): Promise<Swap> {
    const updatedSwap = await this.swapModel
      .findByIdAndUpdate(id, updateSwapDto, { new: true })
      .populate('requesterId providerId', '-password')
      .exec();
    if (!updatedSwap) {
      throw new NotFoundException('Swap not found');
    }
    return updatedSwap;
  }

  async acceptSwap(id: string, userId: string): Promise<Swap> {
    console.log('AcceptSwap called with:', { id, userId });
    
    const swap = await this.findById(id);
    console.log('Found swap:', {
      requesterId: swap.requesterId.toString(),
      providerId: swap.providerId.toString(),
      status: swap.status,
      userId: userId
    });

    if (swap.providerId.toString() !== userId) {
      console.log('Authorization failed: User is not the provider');
      throw new BadRequestException('Only the provider can accept this swap');
    }

    if (swap.status !== SwapStatus.PENDING) {
      console.log('Status check failed: Swap is not pending');
      throw new BadRequestException('Swap is not in pending status');
    }

    console.log('Updating swap status to ACCEPTED');
    return this.update(id, { status: SwapStatus.ACCEPTED });
  }

  async rejectSwap(id: string, userId: string): Promise<Swap> {
    const swap = await this.findById(id);

    if (swap.providerId.toString() !== userId) {
      throw new BadRequestException('Only the provider can reject this swap');
    }

    if (swap.status !== SwapStatus.PENDING) {
      throw new BadRequestException('Swap is not in pending status');
    }

    return this.update(id, { status: SwapStatus.REJECTED });
  }

  async completeSwap(id: string, userId: string): Promise<Swap> {
    const swap = await this.findById(id);

    if (
      ![swap.requesterId.toString(), swap.providerId.toString()].includes(
        userId,
      )
    ) {
      throw new BadRequestException(
        'Only swap participants can complete this swap',
      );
    }

    if (swap.status !== SwapStatus.ACCEPTED) {
      throw new BadRequestException('Swap must be accepted before completion');
    }

    return this.update(id, {
      status: SwapStatus.COMPLETED,
      completedDate: new Date(),
    });
  }

  async cancelSwap(id: string, userId: string): Promise<Swap> {
    const swap = await this.findById(id);

    if (
      ![swap.requesterId.toString(), swap.providerId.toString()].includes(
        userId,
      )
    ) {
      throw new BadRequestException(
        'Only swap participants can cancel this swap',
      );
    }

    if (
      swap.status !== SwapStatus.PENDING &&
      swap.status !== SwapStatus.ACCEPTED
    ) {
      throw new BadRequestException(
        'Swap cannot be cancelled in current status',
      );
    }

    return this.update(id, { status: SwapStatus.CANCELLED });
  }
}
