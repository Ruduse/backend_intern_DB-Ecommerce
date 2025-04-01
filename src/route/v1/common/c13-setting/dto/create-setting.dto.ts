import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StatisticLocked } from '../enum/statistic-locked.enum';

export default class CreateSettingDto {
  @IsArray()
  @IsNumber({}, { each: true })
  readonly appShowRate: [];

  @IsOptional()
  @IsString()
  readonly androidAppId: string;

  @IsOptional()
  @IsString()
  readonly iOSAppId: string;

  @IsOptional()
  @IsString()
  readonly linkShareAndroid: string;

  @IsOptional()
  @IsString()
  readonly linkShareIos: string;

  @IsArray()
  @IsNumber({}, { each: true })
  readonly saveFileShowRate: [];

  @IsOptional()
  @IsString()
  readonly privacyPolicy: string;

  @IsOptional()
  @IsString()
  readonly termsAndService: string;

  @IsOptional()
  @IsNumber()
  readonly quantityAdsPerDay: number;

  @IsOptional()
  readonly other: any;

  @IsOptional()
  @IsNumber()
  premiumTrialDays: number;

  @IsOptional()
  @IsString()
  contactEmail: string;

  @IsOptional()
  @IsString()
  logo: string;

  @IsOptional()
  @IsString()
  appName: string;

  @IsOptional()
  @IsArray()
  @IsEnum(StatisticLocked, { each: true })
  statisticsIsLocked: StatisticLocked[];

  @IsOptional()
  @IsString()
  themeDefaultId: string;
}
