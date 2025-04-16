import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StatisticLocked } from '../enum/statistic-locked.enum';

export class CreateSettingDto {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly appShowRate?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly saveFileShowRate?: number[];

  @IsOptional()
  @IsString()
  readonly privacyPolicy?: string;

  @IsOptional()
  @IsString()
  readonly termsAndService?: string;

  @IsOptional()
  @IsString()
  readonly androidAppId?: string;

  @IsOptional()
  @IsString()
  readonly iOSAppId?: string;

  @IsOptional()
  @IsString()
  readonly linkShareAndroid?: string;

  @IsOptional()
  @IsString()
  readonly linkShareIos?: string;

  @IsOptional()
  @IsNumber()
  readonly quantityAdsPerDay?: number;

  @IsOptional()
  readonly other?: any;

  @IsOptional()
  @IsNumber()
  readonly premiumTrialDays?: number;

  @IsOptional()
  @IsString()
  readonly contactEmail?: string;

  @IsOptional()
  @IsString()
  readonly contactPhone?: string;

  @IsOptional()
  @IsString()
  readonly logo?: string;

  @IsOptional()
  @IsString()
  readonly appName?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(StatisticLocked, { each: true })
  readonly statisticsIsLocked?: StatisticLocked[];

  @IsOptional()
  @IsString()
  readonly themeDefaultId?: string;

  @IsOptional()
  @IsString()
  readonly websiteLink?: string;

  @IsOptional()
  @IsString()
  readonly facebookLink?: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsString()
  readonly returnPolicy?: string;

  @IsOptional()
  @IsString()
  readonly purchasePolicy?: string;

  @IsOptional()
  @IsString()
  readonly warrantyPolicy?: string;

  @IsOptional()
  @IsString()
  readonly buyingGuide?: string;

  @IsOptional()
  @IsString()
  readonly transferInformation?: string;

  @IsOptional()
  @IsString()
  readonly referralPrice?: string;

  @IsOptional()
  @IsString()
  readonly privacyPolicyEn?: string;

  @IsOptional()
  @IsString()
  readonly returnPolicyEn?: string;

  @IsOptional()
  @IsString()
  readonly purchasePolicyEn?: string;

  @IsOptional()
  @IsString()
  readonly warrantyPolicyEn?: string;

  @IsOptional()
  @IsString()
  readonly buyingGuideEn?: string;

  @IsOptional()
  @IsString()
  readonly transferInformationEn?: string;
}
