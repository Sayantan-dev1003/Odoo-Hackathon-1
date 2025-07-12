import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SwapService } from '../services/swap.service';
import { SkillService } from '../services/skill.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly swapService: SwapService,
    private readonly skillService: SkillService,
  ) {}

  @Get('dashboard')
  async getDashboardStats() {
    // This would typically include more complex aggregations
    const totalUsers = await this.userService.findAll();
    const totalSwaps = await this.swapService.findAll();
    const totalSkills = await this.skillService.findAll();

    return {
      stats: {
        totalUsers: totalUsers.length,
        totalSwaps: totalSwaps.length,
        totalSkills: totalSkills.length,
        activeSwaps: totalSwaps.filter(swap => swap.status === 'accepted').length,
      }
    };
  }

  @Get('users')
  async getAllUsers() {
    const users = await this.userService.findAll();
    return { users };
  }

  @Get('swaps')
  async getAllSwaps() {
    const swaps = await this.swapService.findAll();
    return { swaps };
  }

  @Patch('users/:id/status')
  async updateUserStatus(@Param('id') id: string, @Body() body: { isActive: boolean }) {
    const user = await this.userService.update(id, { isActive: body.isActive });
    return { message: 'User status updated successfully', user };
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.remove(id);
    return { message: 'User deleted successfully' };
  }
} 