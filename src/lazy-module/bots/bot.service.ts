import UserService from '@authorization/a1-user/user.service';
import { Global, Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

// import for socket
const io = require('socket.io-client');

@Global()
@Injectable()
export default class BotService {
  private openaiClient: any;

  constructor(readonly userService: UserService) {
    const key = [process.env.OPENAI_API_KEY];

    const configuration1 = new Configuration({
      apiKey: key[0],
    });

    this.openaiClient = new OpenAIApi(configuration1);
  }

  /**
   * Generate response
   *
   * @param prompt
   * @returns
   */
  async generateResponse(
    prompt: string | { subject: string; text: string },
  ): Promise<string> {
    // init Chat GPT
    const messages = [];

    // check type prompt
    if (typeof prompt === 'string') {
      messages.push({ role: 'user', content: `Giải bài tập sau: /n${prompt}` });
    } else {
      messages.push({
        role: 'user',
        content: `Giải bài tập ${prompt.subject} sau: /n${prompt.text}`,
      });
    }

    const response = await this.openaiClient
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
      })
      .catch((error: any) => {
        console.log({ error: error.response.data });
      });

    return response.data.choices[0].message.content.trim();
  }

  /**
   * Generate response
   *
   * @param prompt
   * @returns
   */
  async generateResponseGPT4(prompt: string): Promise<string> {
    // init Chat GPT
    const messages = [];
    messages.push({ role: 'user', content: prompt });

    const response = await this.openaiClient
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
      })
      .catch((error: any) => {
        console.log({ error: error.response.data }); // eslint-disable-line no-console
      });

    return response.data.choices[0].message.content.trim();
  }
}
