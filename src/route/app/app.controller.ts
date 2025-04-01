import BotService from '@lazy-module/bots/bot.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as googleTTS from 'google-tts-api';
import AppService from './app.service';
import { TextToAudioDto } from './dto/text-to-audio.dto';

@ApiTags('Welcome')
@Controller()
export default class AppController {
  private data: string = '';
  constructor(
    private readonly appService: AppService,
    private readonly botService: BotService,
  ) {}

  @Post('/text-to-audio')
  async textToAudio(@Body() input: TextToAudioDto) {
    const url = googleTTS.getAudioUrl(input.text, {
      lang: input.lang,
      slow: false,
      host: 'https://translate.google.com',
    });

    return { url };
  }

  @Get()
  async sayHello(@Query('prompt') prompt: string): Promise<string> {
    this.data = `${this.data}${prompt}\n`;
    const reply = await this.botService.generateResponseGPT4(this.data);

    this.data = `${this.data}${reply}\n`;

    return this.data;
  }
}
