import { LangEnum } from '@enum/lang.enum';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const GetLanguage = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const language = request.headers['language'] || LangEnum.vietnamese;
    return language.toLowerCase() as LangEnum;
  },
);
