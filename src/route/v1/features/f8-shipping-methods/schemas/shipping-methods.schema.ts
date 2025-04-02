import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShippingMethodDocument = ShippingMethod & Document;

@Schema({ timestamps: true, versionKey: false, collection: 'shippingmethods' })
export class ShippingMethod {
  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;

  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true, default: 0 })
  cost: number;
  @Prop({ type: Number, required: true, default: '' })
  estimatedDeliveryTime: number;
}

export const ShippingMethodsSchema =
  SchemaFactory.createForClass(ShippingMethod);
