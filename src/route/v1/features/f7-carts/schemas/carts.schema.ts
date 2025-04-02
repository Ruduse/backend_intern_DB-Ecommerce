import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true, versionKey: false, collection: 'carts' })
export class Cart {
  @Prop({ type: String, ref: 'User', required: true })
  UserId: string;
  @Prop({
    type: [
      {
        productId: { Type: String, ref: 'product', required: true },
        skuId: { Type: String, ref: 'sku', required: true },
        quantity: { Type: Number, required: true, min: 1 },
      },
    ],
    default: [],
  })
  items: [{ productId: string; skuId: string; quantity: number }];
}

export const CartsSchema = SchemaFactory.createForClass(Cart);
