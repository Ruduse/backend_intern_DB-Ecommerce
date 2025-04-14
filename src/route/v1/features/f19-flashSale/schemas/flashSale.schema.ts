import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  FlashSaleProduct,
  FlashSaleProductSchema,
} from './flash-sale-product.schema';

@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
export class FlashSale {
  @Prop({ type: String, require: true, default: '' })
  creatorId: string;

  @Prop({ type: String, required: true, default: '' })
  name: string;

  @Prop({ type: Number, require: true, default: '' })
  validFrom: number;

  @Prop({ type: Number, require: true, default: '' })
  validTo: number;

  // @Prop({
  //   type: [
  //     {
  //       flashSalePrice: { type: Number, require: true, default: 0 },
  //       productId: { type: String, require: true, default: '' },
  //       skuId: { type: String, require: true, default: '' },
  //       maxQuantity: { type: Number, require: true, default: 1 },
  //       soldCount: { type: Number, require: true, default: 1 },
  //     },
  //   ],
  //   require: true,
  //   default: [],
  // })
  // products: {
  //   flashSalePrice: number;
  //   productId: string;
  //   skuId: string;
  //   maxQuantity: number;
  //   soldCount: number;
  // };
  // @Prop({ type: Boolean, require: true, default: true })
  // isActive: boolean;
  // @Prop({ type: String, require: true, default: '' })
  // nameEn: string;
  // thay thế bằng cho dễ update sau này
  @Prop({ type: [FlashSaleProductSchema], default: [], required: true })
  products: FlashSaleProduct[];
}

export type FlashSaleDocument = FlashSale & Document;
export const FlashSaleSchema = SchemaFactory.createForClass(FlashSale);
