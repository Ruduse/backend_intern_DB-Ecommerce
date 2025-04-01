import { LangEnum } from '@enum/lang.enum';
import { MethodRouteEnum } from '@enum/method-route.enum';
import { RoleEnum, UserRoleEnum } from '@enum/role-user.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'argon2';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';
import { GroupDetailType } from 'src/util/types/group-detail.type';
import { AccountType } from '../enums/account-type.enum';
import { Gender } from '../enums/gender.enum';
import { SocialType } from '../enums/social-type.enum';
import { StartOfWeek } from '../enums/start-of-week.enum';

@Schema({ timestamps: true, versionKey: false, collection: 'users' })
export class User {
  // Authorizations
  @Prop({ type: [{ type: ObjectId, ref: 'Group' }] })
  groups: string[];

  @Prop({
    type: [
      {
        idGroupDetail: { type: ObjectId, ref: 'GroupDetail' },
        accessMethods: {
          type: [{ type: String, enum: MethodRouteEnum }],
          default: [MethodRouteEnum.GET],
        },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    default: [],
  })
  groupDetails: GroupDetailType[];

  @Prop({ type: [{ type: ObjectId, ref: 'GroupApi' }] })
  groupAPIAccesses: string[];

  @Prop({ type: [{ type: ObjectId, ref: 'GroupApi' }] })
  groupAPIDenines: string[];

  @Prop({ type: String, enum: SocialType, default: SocialType.google })
  socialType: SocialType;

  @Prop({ type: String, default: '' })
  phone: string;

  @Prop({ type: String })
  socialKey: string;

  @Prop({ type: String, default: '' })
  deviceID: string;

  @Prop({ type: String })
  tokenId: string;

  @Prop({ type: [String], default: [] })
  fcmTokens: string[];

  @Prop({ type: Boolean, default: true })
  isEnableFCM: boolean;

  @Prop({ type: String, default: '' })
  avatar: string;

  @Prop({ type: String, default: '' })
  linkFb: string;

  @Prop({ type: String, default: '' })
  email: string;

  @Prop({ type: String, default: '' })
  fullName: string;

  @Prop({ type: String, enum: RoleEnum, default: RoleEnum.customer })
  readonly role: RoleEnum; // only for check authorization

  @Prop({ type: String, enum: UserRoleEnum, default: UserRoleEnum.Customer })
  readonly userRole: UserRoleEnum; // role of user

  @Prop({ type: String, default: '' })
  password: string;

  @Prop({ type: String, enum: Gender, default: Gender.female })
  gender: Gender;

  @Prop({ type: Number, default: 0 })
  dateOfBirth: number;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  // ---- Feature -----
  @Prop({ type: String, enum: StartOfWeek })
  startOfWeek: StartOfWeek;

  @Prop({ type: String, enum: LangEnum, default: LangEnum.english })
  language: LangEnum;

  @Prop({ type: String, enum: AccountType, default: AccountType.free })
  accountType: AccountType;

  comparePassword: (candidatePassword: string) => boolean;
}

type UserDocument = HydratedDocument<User>;
const UserSchema = SchemaFactory.createForClass(User);

// Pre save
UserSchema.pre('save', async function preSave(next: any) {
  const user: any = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // Hash password
  user.password = await hash(user.password);

  return next();
});

export { UserDocument, UserSchema };
