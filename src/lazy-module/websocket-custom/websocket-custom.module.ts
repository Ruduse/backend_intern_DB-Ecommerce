import TokenService from '@common/c1-auth/token.service';
import BotService from '@lazy-module/bots/bot.service';
import { Global, Module } from '@nestjs/common';
import WebsocketCustomGateway from './websocket-custom.gateway';
import WebsocketCustomService from './websocket-custom.service';

@Global()
@Module({
  imports: [],
  providers: [
    WebsocketCustomService,
    WebsocketCustomGateway,
    TokenService,
    BotService,
  ],
  exports: [WebsocketCustomService, WebsocketCustomGateway],
})
export default class WebsocketCustomModule {}
