import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-messages.dto';

export default class UpdateMessageDto extends PartialType(CreateMessageDto) {}
