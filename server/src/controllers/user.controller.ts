import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto, LoginDto } from '../dto/user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return { message: 'User created successfully', user };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.userService.login(loginDto);
    return { message: 'Login successful', ...result };
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return { users };
  }

  @Get('search')
  async searchBySkills(@Body() body: { skills: string[] }) {
    const users = await this.userService.searchBySkills(body.skills);
    return { users };
  }

  @UseGuards(JwtAuthGuard)
  @Get('matches')
  async getSmartMatches(@Request() req) {
    const users = await this.userService.getSmartMatches(req.user.userId);
    return { users };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    return { message: 'User updated successfully', user };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
    return { message: 'User deleted successfully' };
  }
} 