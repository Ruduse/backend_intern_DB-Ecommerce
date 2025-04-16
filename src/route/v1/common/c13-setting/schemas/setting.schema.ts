import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { StatisticLocked } from '../enum/statistic-locked.enum';

@Schema({ timestamps: true, versionKey: false })
export class Setting {
  @Prop({ type: [Number], default: [] })
  appShowRate: number[];

  @Prop({ type: [Number], default: [] })
  saveFileShowRate: number[];

  @Prop({ type: String, default: '' })
  privacyPolicy: string;

  @Prop({ type: String, default: '' })
  termsAndService: string;

  @Prop({ type: String, default: '' })
  androidAppId: string;

  @Prop({ type: String, default: '' })
  iOSAppId: string;

  @Prop({ type: String, default: '' })
  linkShareAndroid: string;

  @Prop({ type: String, default: '' })
  linkShareIos: string;

  @Prop({ type: Number, default: 2 })
  quantityAdsPerDay: number;

  @Prop({ type: mongoose.SchemaTypes.Mixed, default: {} })
  other: any;

  @Prop({ type: Number, default: 0 })
  premiumTrialDays: number;

  @Prop({ type: String, default: '' })
  contactEmail: string;

  @Prop({ type: String, default: '' })
  contactPhone: string;

  @Prop({ type: String, default: '' })
  logo: string;

  @Prop({ type: String, default: '' })
  appName: string;

  @Prop({ type: [{ type: String, enum: StatisticLocked }], default: [] })
  statisticsIsLocked: StatisticLocked[];

  @Prop({ type: String, default: '' })
  themeDefaultId: string;

  @Prop({ type: String, default: '' })
  websiteLink: string;

  @Prop({ type: String, default: '' })
  facebookLink: string;

  @Prop({ type: String, default: '' })
  address: string;

  @Prop({ type: String, default: '' })
  returnPolicy: string;

  @Prop({ type: String, default: '' })
  purchasePolicy: string;

  @Prop({ type: String, default: '' })
  warrantyPolicy: string;

  @Prop({ type: String, default: '' })
  buyingGuide: string;

  @Prop({ type: String, default: '' })
  transferInformation: string;

  @Prop({ type: String, default: '' })
  referralPrice: string;

  @Prop({ type: String, default: '' })
  privacyPolicyEn: string;

  @Prop({ type: String, default: '' })
  returnPolicyEn: string;

  @Prop({ type: String, default: '' })
  purchasePolicyEn: string;

  @Prop({ type: String, default: '' })
  warrantyPolicyEn: string;

  @Prop({ type: String, default: '' })
  buyingGuideEn: string;

  @Prop({ type: String, default: '' })
  transferInformationEn: string;
}

export type SettingDocument = Setting & Document;
export const SettingSchema = SchemaFactory.createForClass(Setting);
