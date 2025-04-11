import { PartialType } from '@nestjs/mapped-types';
import CreateBankDto from './create-userBank.dto';

export default class UpdateBankDto extends PartialType(CreateBankDto) {}
