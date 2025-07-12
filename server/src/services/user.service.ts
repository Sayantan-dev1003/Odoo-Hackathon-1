import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto, UpdateUserDto, LoginDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({ isActive: true }).select('-password').exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password')
      .exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndUpdate(id, { isActive: false }).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }

  async login(loginDto: LoginDto): Promise<{ user: User; token: string }> {
    const user = await this.findByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return { user: userWithoutPassword, token };
  }

  async searchBySkills(skills: string[]): Promise<User[]> {
    return this.userModel
      .find({
        isActive: true,
        offeredSkills: { $in: skills }
      })
      .select('-password')
      .exec();
  }

  async getSmartMatches(userId: string): Promise<User[]> {
    const user = await this.findById(userId);
    const wantedSkills = user.wantedSkills;
    
    if (wantedSkills.length === 0) {
      return [];
    }

    return this.userModel
      .find({
        _id: { $ne: new Types.ObjectId(userId) },
        isActive: true,
        offeredSkills: { $in: wantedSkills }
      })
      .select('-password')
      .limit(10)
      .exec();
  }
} 