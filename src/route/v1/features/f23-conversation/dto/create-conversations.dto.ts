import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  userIds: string[];

  @IsOptional()
  @IsString()
  lastMessage?: string;
}
