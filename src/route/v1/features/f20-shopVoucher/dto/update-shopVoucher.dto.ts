import { PartialType } from '@nestjs/mapped-types';
import CreateShopDto from '../../f3-shop/dto/create-shop.dto';

export default class UpdateBannerDto extends PartialType(CreateShopDto) {}
