import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'countrys' })
export class Country {
  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String })
  country_vietnamese: string;

  @Prop({
    type: String,
    slug: 'country_vietnamese',
    index: true,
    unique: true,
  })
  readonly slug: string;
}

export type CountryDocument = Country & Document;
export const CountrySchema = SchemaFactory.createForClass(Country);
