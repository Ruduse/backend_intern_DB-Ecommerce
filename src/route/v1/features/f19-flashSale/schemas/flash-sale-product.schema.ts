import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
@Schema({ timestamps: true, versionKey: false, collection: 'themetypes' })
export class FlashSaleProduct {
  @Prop({ required: true, default: 0 })
  flashSalePrice: number;
  @Prop({ required: true, default: '' })
  productId: string;

  @Prop({ required: true, default: '' })
  skuId: string;

  @Prop({ required: true, default: 1 })
  maxQuantity: number;

  @Prop({ required: true, default: 1 })
  soldCount: number;
}

export const FlashSaleProductSchema =
  SchemaFactory.createForClass(FlashSaleProduct);
