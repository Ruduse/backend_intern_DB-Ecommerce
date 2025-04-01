import { TimeZoneEnum } from '@enum/lang.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SendEveryType } from '../enums/send-every-type.enum';
import { SendToCronEnum } from '../enums/send-to-cron.enum';

@Schema({ timestamps: true, versionKey: false, collection: 'cronsettings' })
export class CronSetting {
  @Prop({ type: Number, required: true }) // ms or timestamp
  minutes: number;

  @Prop({ type: Number, default: -1 }) // ms or timestamp
  hours: number;

  @Prop({ type: Number, default: 0 }) // ms or timestamp
  lastTimeSent: number;

  @Prop({ type: String, enum: SendEveryType, default: SendEveryType.Time })
  sendEveryType: SendEveryType;

  @Prop({ type: String, required: true })
  bodyVI: string;

  @Prop({ type: String, default: '' })
  bodyEN: string;

  @Prop({ type: String, default: '' })
  bodyES: string;

  @Prop({ type: String, default: '' })
  bodyPT: string;

  @Prop({ type: String, default: '' })
  bodyHI: string;

  @Prop({ type: String, default: '' })
  bodyFR: string;

  @Prop({ type: String, default: '' })
  bodyRU: string;

  @Prop({ type: String, default: '' })
  bodyDE: string;

  @Prop({ type: String, default: '' })
  bodyIT: string;

  @Prop({ type: String, default: '' })
  bodyKO: string;

  @Prop({ type: String, default: '' })
  bodyJA: string;

  @Prop({ type: String, default: '' })
  bodyAR: string;

  @Prop({ type: String, default: '' })
  bodyAF: string;

  @Prop({ type: String, default: '' })
  bodyUR: string;

  @Prop({ type: String, default: '' })
  bodyHE: string;

  @Prop({ type: String, default: '' })
  bodyZH: string;

  @Prop({ type: String, default: '' })
  bodyTR: string;

  @Prop({ type: String, default: '' })
  bodyIN: string;

  @Prop({ type: String, default: '' })
  bodyNL: string;

  @Prop({ type: String, required: true })
  titleVI: string;

  @Prop({ type: String, default: '' })
  titleEN: string;

  @Prop({ type: String, default: '' })
  titleES: string;

  @Prop({ type: String, default: '' })
  titlePT: string;

  @Prop({ type: String, default: '' })
  titleHI: string;

  @Prop({ type: String, default: '' })
  titleFR: string;

  @Prop({ type: String, default: '' })
  titleRU: string;

  @Prop({ type: String, default: '' })
  titleDE: string;

  @Prop({ type: String, default: '' })
  titleIT: string;

  @Prop({ type: String, default: '' })
  titleKO: string;

  @Prop({ type: String, default: '' })
  titleJA: string;

  @Prop({ type: String, default: '' })
  titleAR: string;

  @Prop({ type: String, default: '' })
  titleAF: string;

  @Prop({ type: String, default: '' })
  titleUR: string;

  @Prop({ type: String, default: '' })
  titleHE: string;

  @Prop({ type: String, default: '' })
  titleZH: string;

  @Prop({ type: String, default: '' })
  titleTR: string;

  @Prop({ type: String, default: '' })
  titleIN: string;

  @Prop({ type: String, default: '' })
  titleNL: string;

  @Prop({ type: String, enum: SendToCronEnum, default: SendToCronEnum.All })
  sendTo: SendToCronEnum;

  @Prop({ type: [{ type: String, ref: 'User' }] })
  @Prop({ type: [{ type: String, enum: TimeZoneEnum }], default: [] })
  timezoneSent: TimeZoneEnum[];

  @Prop({ type: [{ type: String, ref: 'User' }] })
  users: string[];

  @Prop({ type: Boolean, default: true })
  isEnable: boolean;
}

export type CronSettingDocument = CronSetting & Document;
export const CronSettingSchema = SchemaFactory.createForClass(CronSetting);
