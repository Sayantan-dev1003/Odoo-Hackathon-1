import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SwapDocument = Swap & Document;

export enum SwapStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class Swap {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  requesterId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  providerId: Types.ObjectId;

  @Prop({ required: true })
  requestedSkill: string;

  @Prop({ required: true })
  offeredSkill: string;

  @Prop({ type: String, enum: SwapStatus, default: SwapStatus.PENDING })
  status: SwapStatus;

  @Prop()
  message: string;

  @Prop()
  scheduledDate: Date;

  @Prop()
  completedDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Rating' })
  requesterRating: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Rating' })
  providerRating: Types.ObjectId;
}

export const SwapSchema = SchemaFactory.createForClass(Swap);
