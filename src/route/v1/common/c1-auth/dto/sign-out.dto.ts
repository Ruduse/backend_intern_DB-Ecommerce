import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export default class SignOutDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @MinLength(3)
  @MaxLength(512)
  readonly fcmToken?: string;
}
