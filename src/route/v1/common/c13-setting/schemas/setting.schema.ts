import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { StatisticLocked } from '../enum/statistic-locked.enum';

@Schema({ timestamps: true, versionKey: false })
export class Setting {
  @Prop({ type: [Number], default: [] })
  readonly appShowRate: number[];

  @Prop({ type: [Number], default: [] })
  readonly saveFileShowRate: number[];

  @Prop({ type: String, default: '' })
  readonly privacyPolicy: string;

  @Prop({ type: String, default: '' })
  readonly termsAndService: string;

  @Prop({ type: String, default: '' })
  readonly androidAppId: string;

  @Prop({ type: String, default: '' })
  readonly iOSAppId: string;

  @Prop({ type: String, default: '' })
  readonly linkShareAndroid: string;

  @Prop({ type: String, default: '' })
  readonly linkShareIos: string;

  @Prop({ type: Number, default: 2 })
  readonly quantityAdsPerDay: number;

  @Prop({ type: mongoose.SchemaTypes.Mixed, default: {} })
  readonly other: any;

  @Prop({ type: Number, default: 0 })
  premiumTrialDays: number;

  @Prop({ type: String, default: '' })
  contactEmail: string;

  @Prop({ type: String, default: '' })
  logo: string;

  @Prop({ type: String, default: '' })
  appName: string;

  @Prop({ type: [{ type: String, enum: StatisticLocked }], default: [] })
  statisticsIsLocked: StatisticLocked[];

  @Prop({ type: String, default: '' })
  themeDefaultId: string;
}

export type SettingDocument = Setting & Document;
export const SettingSchema = SchemaFactory.createForClass(Setting);
