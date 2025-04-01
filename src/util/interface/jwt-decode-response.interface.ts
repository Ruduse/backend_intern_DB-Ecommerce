import { RoleEnum } from '@enum/role-user.enum';

export interface JwtDecodeResponse {
  id: string;
  role: RoleEnum;
  iat: number;
  exp: number;
}
