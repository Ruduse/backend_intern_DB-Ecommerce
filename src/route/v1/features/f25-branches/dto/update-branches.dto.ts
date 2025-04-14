import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchDto } from './create-branches.dto';

export default class UpdateBranchDto extends PartialType(CreateBranchDto) {}
