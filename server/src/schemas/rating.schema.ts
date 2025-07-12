import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RatingDocument = Rating & Document;

@Schema({ timestamps: true })
export class Rating {
  @Prop({ type: Types.ObjectId, ref: 'Swap', required: true })
  swapId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  raterId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  ratedUserId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop()
  comment: string;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const RatingSchema = SchemaFactory.createForClass(Rating); 