// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type OrderDocument = Order & Document;

// @Schema({ timestamps: true, versionKey: false, collection: 'orders' })
// export class Order {
//   @Prop({ type: String, ref: 'User', required: true })
//   userId: string;

//   @Prop({ type: String, ref: 'Shop', required: true })
//   shopId: string;

//   @Prop({ type: String, ref: 'Discount', required: true })
//   discountId?: string;

//   @Prop({ type: String, ref: 'ShippingMethod', required: true })
//   shippingMethodId?: string;

//   @Prop({ type: Number, required: true })
//   totalAmount?: number;

//   @Prop({
//     type: String,
//     enum: ['pending', 'completed', 'cancelled'],
//     default: 'pending',
//   })
//   status: string;
// }

// export const OrdersSchema = SchemaFactory.createForClass(Order);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaymentMethod } from '../enums/paymentMethod';
import { status } from '../enums/status';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: String, ref: 'User', required: true })
  orderBy: string;

  @Prop({ type: String, ref: 'Customer', required: true })
  customerId: string;

  @Prop({
    type: {
      note: String,
      contactName: String,
      contactPhone: String,
    },
    required: true,
  })
  contact: {
    note: string;
    contactName: string;
    contactPhone: string;
  };

  @Prop({ type: String, ref: 'UserAddress', required: true })
  userAddressId: string;

  @Prop({ type: String, ref: 'Province', required: true })
  provinceId: string;

  @Prop({ type: String, ref: 'District', required: true })
  districtId: string;

  @Prop({ type: String, ref: 'Village', required: true })
  villageId: string;

  @Prop({ type: String, required: true })
  street: string;

  @Prop({ type: String, required: true })
  addressFull: string;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, enum: PaymentMethod, required: true, default: 'cod' })
  paymentMethod: string;

  @Prop({ type: String })
  paymentInfo: string;

  @Prop({ type: String, ref: 'ShopVoucher', required: false })
  shopVoucherId: string;

  @Prop({ type: String, enum: status, required: true })
  status: string;

  @Prop({
    type: {
      subTotal: Number,
      shippingCost: Number,
      discountAmount: Number,
      totalAmount: Number,
    },
    required: true,
  })
  checkout: {
    subTotal: number;
    shippingCost: number;
    discountAmount: number;
    totalAmount: number;
  };

  @Prop({
    type: [
      {
        status: { type: String, required: true },
        changedAt: { type: Date, required: true },
        changedBy: { type: String, required: true },
        changeReason: { type: String, required: false },
        changeImages: { type: [String], default: [] },
      },
    ],
    default: [],
  })
  statusHistories: {
    status: string;
    changedAt: Date;
    changedBy: string;
    changeReason?: string;
    changeImages?: string[];
  }[];

  @Prop({
    type: {
      name: String,
      price: Number,
      fromDate: Date,
      toDate: Date,
    },
    required: true,
  })
  shippingInfo: {
    name: string;
    price: number;
    fromDate: Date;
    toDate: Date;
  };

  @Prop({ type: String, ref: 'OrderItem', required: true })
  shopId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
