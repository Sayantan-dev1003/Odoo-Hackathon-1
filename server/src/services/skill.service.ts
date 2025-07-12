import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from '../schemas/skill.schema';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
  ) {}

  async create(skillData: Partial<Skill>): Promise<Skill> {
    const createdSkill = new this.skillModel(skillData);
    return createdSkill.save();
  }

  async findAll(): Promise<Skill[]> {
    return this.skillModel.find({ isActive: true }).exec();
  }

  async findById(id: string): Promise<Skill> {
    const skill = await this.skillModel.findById(id).exec();
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }
    return skill;
  }

  async findByName(name: string): Promise<Skill> {
    return this.skillModel
      .findOne({ name: { $regex: name, $options: 'i' } })
      .exec();
  }

  async update(id: string, skillData: Partial<Skill>): Promise<Skill> {
    const updatedSkill = await this.skillModel
      .findByIdAndUpdate(id, skillData, { new: true })
      .exec();
    if (!updatedSkill) {
      throw new NotFoundException('Skill not found');
    }
    return updatedSkill;
  }

  async remove(id: string): Promise<void> {
    const result = await this.skillModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec();
    if (!result) {
      throw new NotFoundException('Skill not found');
    }
  }

  async getPopularSkills(): Promise<Skill[]> {
    return this.skillModel
      .find({ isActive: true })
      .sort({ popularity: -1 })
      .limit(10)
      .exec();
  }
}
