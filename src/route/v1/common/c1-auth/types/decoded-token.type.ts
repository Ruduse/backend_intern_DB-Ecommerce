import { RoleEnum } from '@enum/role-user.enum';

export type DecodedToken = {
  readonly _id: string;

  readonly role: RoleEnum;

  readonly phone?: string;

  readonly username?: string;

  readonly email?: string;

  readonly tokenLogin?: string;

  readonly fullName?: string;

  readonly password?: string;

  readonly iat?: number;

  readonly exp?: number;
};
