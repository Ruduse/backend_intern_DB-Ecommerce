import { PartialType } from '@nestjs/mapped-types';

export default class UpdateBranchDto extends PartialType(CreateBranchDto) {}
