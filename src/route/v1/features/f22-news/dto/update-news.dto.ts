import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';

export default class UpdateNewsDto extends PartialType(CreateNewsDto) {}
