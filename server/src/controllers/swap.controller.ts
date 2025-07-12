import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SwapService } from '../services/swap.service';
import { CreateSwapDto, UpdateSwapDto } from '../dto/swap.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('swaps')
@UseGuards(JwtAuthGuard)
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @Post()
  async create(@Body() createSwapDto: CreateSwapDto, @Request() req) {
    const swap = await this.swapService.create(createSwapDto, req.user.userId);
    return { message: 'Swap request created successfully', swap };
  }

  @Get()
  async findAll() {
    const swaps = await this.swapService.findAll();
    return { swaps };
  }

  @Get('my-swaps')
  async findMySwaps(@Request() req) {
    const swaps = await this.swapService.findByUser(req.user.userId);
    return { swaps };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const swap = await this.swapService.findById(id);
    return { swap };
  }

  @Patch(':id/accept')
  async acceptSwap(@Param('id') id: string, @Request() req) {
    console.log('Accept swap request:', { id, user: req.user });
    
    try {
      const swap = await this.swapService.acceptSwap(id, req.user.userId);
      console.log('Swap accepted successfully:', swap);
      return { message: 'Swap accepted successfully', swap };
    } catch (error) {
      console.error('Error accepting swap:', error);
      throw error;
    }
  }

  @Patch(':id/reject')
  async rejectSwap(@Param('id') id: string, @Request() req) {
    const swap = await this.swapService.rejectSwap(id, req.user.userId);
    return { message: 'Swap rejected successfully', swap };
  }

  @Patch(':id/complete')
  async completeSwap(@Param('id') id: string, @Request() req) {
    const swap = await this.swapService.completeSwap(id, req.user.userId);
    return { message: 'Swap completed successfully', swap };
  }

  @Patch(':id/cancel')
  async cancelSwap(@Param('id') id: string, @Request() req) {
    const swap = await this.swapService.cancelSwap(id, req.user.userId);
    return { message: 'Swap cancelled successfully', swap };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSwapDto: UpdateSwapDto) {
    const swap = await this.swapService.update(id, updateSwapDto);
    return { message: 'Swap updated successfully', swap };
  }
}
