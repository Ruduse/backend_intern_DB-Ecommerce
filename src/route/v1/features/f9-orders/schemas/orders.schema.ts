import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true, versionKey: false, collection: 'orders' })
export class Order {
  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;

  @Prop({ type: String, ref: 'Discount', required: true })
  discountId?: string;

  @Prop({ type: String, ref: 'ShippingMethod', required: true })
  shippingMethodId?: string;

  @Prop({ type: Number, required: true })
  totalAmount: number;

  @Prop({
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string;
}

export const OrdersSchema = SchemaFactory.createForClass(Order);
