import { PartialType } from '@nestjs/mapped-types';

export default class UpdateBannerDto extends PartialType(CreateBannerDto) {}
