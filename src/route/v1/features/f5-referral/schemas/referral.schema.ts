import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ReferralStatus } from '../enums/referral.enums';

@Schema({ timestamps: true, versionKey: false, collection: 'referrals' })
export class Referral {
  @Prop({ type: String, required: true })
  sharedCodeFrom: string;
  @Prop({ type: String, required: true })
  customerTo: string;

  @Prop({ type: String })
  customerFrom?: string; // Người giới thiệu (có thể null)

  @Prop({ type: Number, default: 0 })
  price: number;

  @Prop({ type: String, enum: ReferralStatus, default: ReferralStatus.PENDING })
  status: ReferralStatus;
}

export type ReferralDocument = Referral & Document;
export const ReferralSchema = SchemaFactory.createForClass(Referral);
