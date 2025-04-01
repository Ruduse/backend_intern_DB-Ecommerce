import { TimeZoneEnum } from '@enum/lang.enum';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { SendEveryType } from '../enums/send-every-type.enum';
import { SendToCronEnum } from '../enums/send-to-cron.enum';

export default class CreateCronSettingDto {
  @IsNotEmpty()
  @IsNumber()
  minutes: number;

  @IsOptional()
  @Min(-1)
  @Max(23)
  @IsNumber()
  hours: number;

  @IsOptional()
  @IsNumber()
  lastTimeSent: number;

  @IsNotEmpty()
  @IsEnum(SendEveryType)
  sendEveryType: SendEveryType;

  @IsOptional()
  @IsString()
  bodyVI: string;

  @IsOptional()
  @IsString()
  bodyEN: string;

  @IsOptional()
  @IsString()
  bodyES: string;

  @IsOptional()
  @IsString()
  bodyPT: string;

  @IsOptional()
  @IsString()
  bodyHI: string;

  @IsOptional()
  @IsString()
  bodyFR: string;

  @IsOptional()
  @IsString()
  bodyRU: string;

  @IsOptional()
  @IsString()
  bodyDE: string;

  @IsOptional()
  @IsString()
  bodyIT: string;

  @IsOptional()
  @IsString()
  bodyKO: string;

  @IsOptional()
  @IsString()
  bodyJA: string;

  @IsOptional()
  @IsString()
  bodyAR: string;

  @IsOptional()
  @IsString()
  bodyAF: string;

  @IsOptional()
  @IsString()
  bodyUR: string;

  @IsOptional()
  @IsString()
  bodyHE: string;

  @IsOptional()
  @IsString()
  bodyZH: string;

  @IsOptional()
  @IsString()
  bodyTR: string;

  @IsOptional()
  @IsString()
  bodyIN: string;

  @IsOptional()
  @IsString()
  bodyNL: string;

  @IsOptional()
  @IsString()
  titleVI: string;

  @IsOptional()
  @IsString()
  titleEN: string;

  @IsOptional()
  @IsString()
  titleES: string;

  @IsOptional()
  @IsString()
  titlePT: string;

  @IsOptional()
  @IsString()
  titleHI: string;

  @IsOptional()
  @IsString()
  titleFR: string;

  @IsOptional()
  @IsString()
  titleRU: string;

  @IsOptional()
  @IsString()
  titleDE: string;

  @IsOptional()
  @IsString()
  titleIT: string;

  @IsOptional()
  @IsString()
  titleKO: string;

  @IsOptional()
  @IsString()
  titleJA: string;

  @IsOptional()
  @IsString()
  titleAR: string;

  @IsOptional()
  @IsString()
  titleAF: string;

  @IsOptional()
  @IsString()
  titleUR: string;

  @IsOptional()
  @IsString()
  titleHE: string;

  @IsOptional()
  @IsString()
  titleZH: string;

  @IsOptional()
  @IsString()
  titleTR: string;

  @IsOptional()
  @IsString()
  titleIN: string;

  @IsOptional()
  @IsString()
  titleNL: string;

  @IsNotEmpty()
  @IsEnum(SendToCronEnum)
  sendTo: SendToCronEnum;

  @ValidateIf((o) => o.sendTo === SendToCronEnum.Users)
  @IsArray()
  @IsMongoId({ each: true })
  users: string[];

  @IsOptional()
  @IsEnum(TimeZoneEnum, { each: true })
  timezoneSent: TimeZoneEnum[];

  @IsOptional()
  @IsBoolean()
  isEnable: boolean;
}
