import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SkillService } from '../services/skill.service';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(@Body() skillData: any) {
    const skill = await this.skillService.create(skillData);
    return { message: 'Skill created successfully', skill };
  }

  @Get()
  async findAll() {
    const skills = await this.skillService.findAll();
    return { skills };
  }

  @Get('popular')
  async getPopularSkills() {
    const skills = await this.skillService.getPopularSkills();
    return { skills };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const skill = await this.skillService.findById(id);
    return { skill };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() skillData: any) {
    const skill = await this.skillService.update(id, skillData);
    return { message: 'Skill updated successfully', skill };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.skillService.remove(id);
    return { message: 'Skill deleted successfully' };
  }
}