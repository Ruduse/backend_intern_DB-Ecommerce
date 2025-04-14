import { PartialType } from '@nestjs/mapped-types';

export default class UpdateReviewDto extends PartialType(CreateReviewDto) {}
