import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from '../schemas/skill.schema';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async seedSkills() {
    const skills = [
      {
        name: 'JavaScript',
        category: 'Programming',
        description: 'Web development language',
      },
      {
        name: 'Python',
        category: 'Programming',
        description: 'General purpose programming language',
      },
      {
        name: 'React',
        category: 'Frontend',
        description: 'JavaScript library for building user interfaces',
      },
      {
        name: 'Node.js',
        category: 'Backend',
        description: 'JavaScript runtime for server-side development',
      },
      {
        name: 'Cooking',
        category: 'Lifestyle',
        description: 'Culinary arts and food preparation',
      },
      {
        name: 'Photography',
        category: 'Arts',
        description: 'Art and practice of creating images',
      },
      {
        name: 'Guitar',
        category: 'Music',
        description: 'String instrument playing',
      },
      {
        name: 'Spanish',
        category: 'Language',
        description: 'Spanish language learning',
      },
      {
        name: 'Yoga',
        category: 'Fitness',
        description: 'Physical and mental exercise practice',
      },
      {
        name: 'Drawing',
        category: 'Arts',
        description: 'Visual art form using various drawing instruments',
      },
    ];

    for (const skill of skills) {
      const existingSkill = await this.skillModel.findOne({ name: skill.name });
      if (!existingSkill) {
        await this.skillModel.create(skill);
      }
    }

    console.log('Skills seeded successfully');
  }

  async seedAdminUser() {
    const adminEmail = 'admin@skilllink.com';
    const existingAdmin = await this.userModel.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.userModel.create({
        email: adminEmail,
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        offeredSkills: ['JavaScript', 'React', 'Node.js'],
        wantedSkills: ['Python', 'Photography'],
        availability: ['Weekends', 'Evenings'],
        bio: 'Platform administrator',
        location: 'Online',
      });
      console.log('Admin user seeded successfully');
    }
  }
}
