import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderItemDocument = OrderItem & Document;

@Schema({ timestamps: true, versionKey: false, collection: 'orderitems' })
export class OrderItem {
  @Prop({ type: String, ref: 'Order', required: true })
  orderId: string;

  @Prop({ type: String, ref: 'Product', required: true, unique: true })
  productId: string;
  @Prop({ type: String, ref: 'Sku', required: true, unique: true })
  skudId: string;

  @Prop({ type: Number, required: true, default: 0 })
  quantity: number;

  @Prop({ type: Number, required: true, default: 0 })
  price: number;
}

export const OrderItemsSchema = SchemaFactory.createForClass(OrderItem);
