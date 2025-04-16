import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false }) // _id: false vì nó sẽ được embed vào Transaction
export class UserBank {
  @Prop()
  userBankId: string;

  @Prop()
  bankName: string;

  @Prop()
  accountName: string;

  @Prop()
  accountNumber: string;
}

export const UserBankSchema = SchemaFactory.createForClass(UserBank);
