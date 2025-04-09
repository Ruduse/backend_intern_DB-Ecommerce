import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
export class UserAdress {
  @Prop({ type: String, required: true, default: '' })
  userId: string;

  @Prop({ type: String, default: '' })
  addressName: string;
  @Prop({ type: String, default: '' })
  contactName: string;

  @Prop({ type: Number, default: '' })
  contactPhone: number;

  @Prop({ type: String, default: '' })
  provinceId: string;

  @Prop({ type: String, default: '' })
  districtId: string;

  @Prop({ type: String, default: '' })
  villageId: string;

  @Prop({ type: String, default: '' })
  street: string;

  @Prop({ type: String, default: '' })
  location: string;

  @Prop({ type: String, default: '' })
  note: string;

  @Prop({ type: String, default: '' })
  apartmentNumber: string;

  @Prop({ type: Boolean, default: false })
  isDefault: boolean;
}

export type UserAdressDocument = UserAdress & Document;
export const UserAdressSchema = SchemaFactory.createForClass(UserAdress);
