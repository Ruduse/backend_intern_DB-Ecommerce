import BaseService from '@base-inherit/base.service';
import NotificationService from '@common/c12-notification/notification.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import DiscountsRepository from './discounts.repository';
import { CreateDiscountDto } from './dto/create-discounts.dto';
import { Discount, DiscountDocument } from './schemas/discounts.schema';

@Injectable()
export default class DiscountsService extends BaseService<DiscountDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly discountRepository: DiscountsRepository,
    private readonly notificationService: NotificationService,
  ) {
    super(logger, discountRepository);
  }

  // Tạo mới discount và gửi thông báo nếu cần
  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    // Kiểm tra nếu đã có discount nào có isSendNotification: true
    if (createDiscountDto.isSendNotification) {
      const existingDiscount = await this.discountRepository.findOneBy({
        isSendNotification: true,
      });

      if (existingDiscount) {
        throw new Error(
          'There is already a discount with notification enabled.',
        );
      }
    }

    // Tạo mới discount
    const newDiscount = await this.discountRepository.create(createDiscountDto);

    // Nếu cần gửi thông báo
    if (createDiscountDto.isSendNotification) {
      await this.sendNotificationToAllUsers(newDiscount);
    }

    return newDiscount;
  }

  // Gửi thông báo đến tất cả người dùng
  private async sendNotificationToAllUsers(discount: Discount): Promise<void> {
    this.logger.log(`Gửi bạn mã discount mới của chúng tôi: ${discount.code}`);

    await this.notificationService.sendToAllUsers({
      title: 'Discount mới đã có!',
      message: `Discount mới đã có sẵn: ${discount.code}. Sử dụng nó ngay!`,
      discountCode: discount.code,
    });
  }
  async findAllByUser(userId: string) {
    return this.discountRepository.findManyBy({ user: userId });
  }

  async selectVoucher(voucherId: string, userId: string) {
    // Kiểm tra hợp lệ và chưa hết hạn
    const voucher = await this.discountRepository.findOneBy({
      _id: voucherId,
      user: userId,
    });
    if (!voucher)
      throw new NotFoundException(
        'Voucher không tồn tại hoặc không thuộc về bạn',
      );
    if (voucher.validTo < new Date())
      throw new BadRequestException('Voucher đã hết hạn');

    // Bỏ chọn các voucher khác
    await this.discountRepository.updateManyBy(
      { user: userId },
      { $set: { isUsed: false } },
    );

    // Đánh dấu voucher này là đã chọn
    voucher.isUsed = true;
    await voucher.save();

    return { message: 'Đã chọn voucher thành công', voucher };
  }
}
