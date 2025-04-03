import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Cart } from './carts.schema';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class CartItem {
  @Prop({ type: String, ref: 'Product', required: true })
  productId: string;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, ref: 'Sku', required: true })
  skuId: string;

  @Prop()
  price: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
