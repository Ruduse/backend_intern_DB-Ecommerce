// import BaseService from '@base-inherit/base.service';
// import CustomLoggerService from '@lazy-module/logger/logger.service';
// import { Injectable } from '@nestjs/common';
// import { Types } from 'mongoose';
// import { Language, languages } from 'src/util/lang/lang';
// import { NotificationTrans } from 'src/util/lang/notification-trans';
// import { ThumbnailType } from './enums/thumbnail-type';
// import NotificationRepository from './notification.repository';
// import { NotificationDocument } from './schemas/notification.schema';

// @Injectable()
// export default class NotificationService extends BaseService<NotificationDocument> {
//   sendToAllUsers(arg0: {
//     title: string;
//     message: string;
//     discountCode: string;
//   }) {
//     throw new Error('Method not implemented.');
//   }
//   constructor(
//     readonly logger: CustomLoggerService,
//     readonly notificationRepository: NotificationRepository,
//   ) {
//     super(logger, notificationRepository);
//   }

//   async sendPurchaseCloverSuccessNotification(
//     systemAccountId: string,
//     recipientId: string,
//     numberClovers: number,
//   ) {
//     // Initialize title and description objects with correct types
//     const title: { [key in Language]?: string } = {};
//     const description: { [key in Language]?: string } = {};

//     // Populate title and description for each language
//     languages.forEach((lang) => {
//       title[lang] = NotificationTrans.purchaseClovers.title[lang];
//       description[lang] =
//         NotificationTrans.purchaseClovers.description(numberClovers)[lang];
//     });

//     const notificationItem = {
//       senderId: systemAccountId,
//       recipientId,
//       title, // Object containing titles in all languages
//       description, // Object containing descriptions in all languages
//       thumbnailType: ThumbnailType.clover,
//     };

//     await this.notificationRepository.create(notificationItem);
//   }

//   async sendGiftCloverSuccessNotification(
//     systemAccountId: string,
//     recipientId: string,
//     numberClovers: number,
//   ) {
//     // Initialize title and description objects with correct types
//     const title: { [key in Language]?: string } = {};
//     const description: { [key in Language]?: string } = {};

//     // Populate title and description for each language
//     languages.forEach((lang) => {
//       title[lang] = NotificationTrans.giftClovers.title[lang];
//       description[lang] =
//         NotificationTrans.giftClovers.description(numberClovers)[lang];
//     });

//     const notificationItem = {
//       senderId: systemAccountId,
//       recipientId,
//       title, // Object containing titles in all languages
//       description, // Object containing descriptions in all languages
//       thumbnailType: ThumbnailType.gift,
//     };

//     return await this.notificationRepository.create(notificationItem);
//   }

//   async sendUpgradePremiumNotification(
//     systemAccountId: string,
//     recipientId: string,
//   ) {
//     // Initialize title and description objects with correct types
//     const title: { [key in Language]?: string } = {};
//     const description: { [key in Language]?: string } = {};

//     // Populate title and description for each language
//     languages.forEach((lang) => {
//       title[lang] = NotificationTrans.upgradePremium.title[lang];
//       description[lang] = NotificationTrans.upgradePremium.description[lang];
//     });

//     const notificationItem = {
//       senderId: systemAccountId,
//       recipientId,
//       title, // Object containing titles in all languages
//       description, // Object containing descriptions in all languages
//       thumbnailType: ThumbnailType.premium,
//     };

//     return await this.notificationRepository.create(notificationItem);
//   }

//   async readNotification(notificationId: Types.ObjectId) {
//     // Check notification is exist
//     const notification = await this.notificationRepository.findOneById(
//       notificationId,
//     );

//     if (!notification) {
//       throw new Error('Notification not found');
//     }

//     const updatedNotification = await this.notificationRepository.updateOneById(
//       notificationId,
//       {
//         isOpened: true,
//       },
//     );

//     return updatedNotification;
//   }
// }
import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Language, languages } from 'src/util/lang/lang';
import { NotificationTrans } from 'src/util/lang/notification-trans';
import { ThumbnailType } from './enums/thumbnail-type';
import NotificationRepository from './notification.repository';
import { NotificationDocument } from './schemas/notification.schema';

@Injectable()
export default class NotificationService extends BaseService<NotificationDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly notificationRepository: NotificationRepository,
  ) {
    super(logger, notificationRepository);
  }

  // ✅ Gửi thông báo đến tất cả người dùng
  async sendToAllUsers(notificationData: {
    title: string;
    message: string;
    discountCode: string;
  }) {
    const users = await this.getAllUserIds(); // 👈 logic cần hiện thực hóa

    for (const userId of users) {
      await this.sendNotification(
        'system',
        userId,
        notificationData.title,
        notificationData.message,
      );
    }
  }

  // ✅ Hàm gửi thông báo đến 1 người dùng cụ thể
  private async sendNotification(
    senderId: string,
    recipientId: string,
    titleVi: string,
    descriptionVi: string,
  ) {
    const title: { [key in Language]?: string } = { vi: titleVi };
    const description: { [key in Language]?: string } = { vi: descriptionVi };

    await this.notificationRepository.create({
      senderId,
      recipientId,
      title,
      description,
      thumbnailType: ThumbnailType.discount,
    });
  }

  // 🧪 Tạm thời mock, bạn cần thay thế bằng logic thật để lấy danh sách user
  private async getAllUserIds(): Promise<string[]> {
    // TODO: Lấy danh sách toàn bộ user từ UserRepository
    return ['userId1', 'userId2']; // Thay bằng user thực tế
  }

  async sendPurchaseCloverSuccessNotification(
    systemAccountId: string,
    recipientId: string,
    numberClovers: number,
  ) {
    const title: { [key in Language]?: string } = {};
    const description: { [key in Language]?: string } = {};

    languages.forEach((lang) => {
      title[lang] = NotificationTrans.purchaseClovers.title[lang];
      description[lang] =
        NotificationTrans.purchaseClovers.description(numberClovers)[lang];
    });

    const notificationItem = {
      senderId: systemAccountId,
      recipientId,
      title,
      description,
      thumbnailType: ThumbnailType.clover,
    };

    await this.notificationRepository.create(notificationItem);
  }

  async sendGiftCloverSuccessNotification(
    systemAccountId: string,
    recipientId: string,
    numberClovers: number,
  ) {
    const title: { [key in Language]?: string } = {};
    const description: { [key in Language]?: string } = {};

    languages.forEach((lang) => {
      title[lang] = NotificationTrans.giftClovers.title[lang];
      description[lang] =
        NotificationTrans.giftClovers.description(numberClovers)[lang];
    });

    const notificationItem = {
      senderId: systemAccountId,
      recipientId,
      title,
      description,
      thumbnailType: ThumbnailType.gift,
    };

    return await this.notificationRepository.create(notificationItem);
  }

  async sendUpgradePremiumNotification(
    systemAccountId: string,
    recipientId: string,
  ) {
    const title: { [key in Language]?: string } = {};
    const description: { [key in Language]?: string } = {};

    languages.forEach((lang) => {
      title[lang] = NotificationTrans.upgradePremium.title[lang];
      description[lang] = NotificationTrans.upgradePremium.description[lang];
    });

    const notificationItem = {
      senderId: systemAccountId,
      recipientId,
      title,
      description,
      thumbnailType: ThumbnailType.premium,
    };

    return await this.notificationRepository.create(notificationItem);
  }

  async readNotification(notificationId: Types.ObjectId) {
    const notification = await this.notificationRepository.findOneById(
      notificationId,
    );

    if (!notification) {
      throw new Error('Notification not found');
    }

    const updatedNotification = await this.notificationRepository.updateOneById(
      notificationId,
      {
        isOpened: true,
      },
    );

    return updatedNotification;
  }
  async sendOrderUpdate(userId: string, message: string) {
    const notificationItem = {
      senderId: 'system', // Bạn có thể thay đổi senderId thành một userId hoặc một giá trị thích hợp
      recipientId: userId, // Gửi thông báo cho user này
      title: { vi: 'Cập nhật đơn hàng', en: 'Order update' }, // Tạo title cho các ngôn ngữ
      description: { vi: message, en: message }, // Tạo description cho các ngôn ngữ
    };

    // Lưu thông báo vào DB
    await this.notificationRepository.create(notificationItem);
    console.log(` Notify user ${userId}: ${message}`);
  }
}
