import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  bio: string;

  @Prop()
  location: string;

  @Prop({ default: 'user' })
  role: 'user' | 'admin';

  @Prop({ type: [String], default: [] })
  offeredSkills: string[];

  @Prop({ type: [String], default: [] })
  wantedSkills: string[];

  @Prop({ type: [String], default: [] })
  availability: string[];

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  totalRatings: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Swap' })
  activeSwaps: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User); 