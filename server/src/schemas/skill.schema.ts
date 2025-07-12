import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkillDocument = Skill & Document;

@Schema({ timestamps: true })
export class Skill {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: 'general' })
  category: string;

  @Prop({ default: 0 })
  popularity: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const SkillSchema = SchemaFactory.createForClass(Skill); 