import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserIdHeader = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return (
      request.headers.userId ||
      request.headers.userid ||
      request.headers['user-id']
    );
  },
);
