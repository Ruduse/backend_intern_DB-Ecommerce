import { PartialType } from '@nestjs/mapped-types';
import { CreateConversationDto } from './create-conversations.dto';

export default class UpdateConservationDto extends PartialType(
  CreateConversationDto,
) {}
