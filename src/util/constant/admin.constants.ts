import { SocialType } from '@authorization/a1-user/enums/social-type.enum';
import { RoleEnum } from '@enum/role-user.enum';
import { generateCodeID } from '@helper/generate-codeid';

export const adminConstants = {
  email: 'admin@gmail.com',
  password: 'admin123123',
  role: RoleEnum.manager,
  codeID: generateCodeID(),
  socialKey: `${generateCodeID()}admin@gmail.com${generateCodeID()}`,
  socialType: SocialType.local,
};

export const emailAdministrator = ['admin@gmail.com'];
