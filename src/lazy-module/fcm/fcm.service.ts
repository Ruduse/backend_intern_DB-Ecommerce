import * as firebaseAdmin from 'firebase-admin';
import { MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';
import path from 'path';

import { ShareFunction } from '@helper/static-function';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FcmService {
  constructor(private logger: CustomLoggerService) {
    this.init();
  }

  init() {
    const fileService = path.join(__dirname, './firebase-project-service.json');

    if (ShareFunction.isFileExist(fileService)) {
      const serviceAccount = ShareFunction.readFileSync(fileService).toString();

      try {
        const serviceAccountObj = JSON.parse(serviceAccount);

        firebaseAdmin.initializeApp({
          credential: firebaseAdmin.credential.cert(serviceAccountObj),
        });

        this.logger.log('FcmModule init success');
      } catch (e) {
        this.logger.error((e as any).toString());
      }
    } else {
      this.logger.warn(
        `${__dirname}/firebase-project-service.json was not found, FcmModule was not init`,
      );
    }
  }

  public async pushFCMToUser(message: MulticastMessage) {
    try {
      return await firebaseAdmin.messaging().sendEachForMulticast(message);
    } catch (e) {
      this.logger.log('FcmService pushFCMToUser', (e as any).toString());
    }
  }
}
