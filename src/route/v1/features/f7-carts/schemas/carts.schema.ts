import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CartItem } from './cart-item.schema';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true, versionKey: false, collection: 'carts' })
export class Cart {
  @Prop({ type: String, ref: 'Customer', required: true, unique: true })
  customerId: string;
  @Prop({
    type: [
      {
        productId: { type: String, ref: 'Product', required: true },
        skuId: { type: String, ref: 'sku', required: true },
        discountId: { type: String, ref: 'discount', required: false },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    default: [],
  })
  items: CartItem[];
}

export const CartsSchema = SchemaFactory.createForClass(Cart);
