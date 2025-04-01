import { RoleEnum } from '@enum/role-user.enum';
import { Types } from 'mongoose';

export interface JwtStrategyValidate {
  _id: Types.ObjectId;
  role: RoleEnum;
}
