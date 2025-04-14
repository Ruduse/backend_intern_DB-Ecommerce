import FreeApiModule from '@authorization/a2-free-api/free-api.module';
import AuthUserAccessModule from '@authorization/a3-auth-user-access/auth-user-access.module';
import AuthUserIdModule from '@authorization/a4-auth-user-id/auth-user-id.module';
import GroupModule from '@authorization/a5-group/group.module';
import GroupDetailModule from '@authorization/a6-group-detail/group-detail.module';
import GroupApiModule from '@authorization/a7-group-api/group-api.module';
import BackupDataModule from '@common/c0-backup/backup-data.module';
import DashboardModule from '@common/c10-dashboard/dashboard.module';
import TransactionModule from '@common/c11-transaction/transaction.module';
import NotificationModule from '@common/c12-notification/notification.module';
import SettingModule from '@common/c13-setting/setting.module';
import { SeedModule } from '@common/c14-seed/seed.module';
import CountryModule from '@common/c15-country/country.module';
import CronSettingModule from '@common/c16-cron-setting/cron-setting.module';
import AppSubscriptionModule from '@common/c17-subscriptions/app-subscription.module';
import OtpModule from '@common/c2-otp/otp.module';
import HistoryModule from '@common/c9-history/history.module';
import RolesGuard from '@guard/roles.guard';
import { ShareFunction } from '@helper/static-function';
import { Module } from '@nestjs/common';

import { RouterModule, Routes } from 'nest-router';
import TestModule from 'src/route/v1/features/f1-tests/test.module';
import UserModule from './authorization/a1-user/user.module';
import AuthModule from './common/c1-auth/auth.module';
import UploadModule from './common/c3-upload/upload.module';
import FileManagerModule from './common/c4-file-manager/file-manager.module';
import StaticS3Module from './common/c5-static-s3/static-s3.module';
import ProvinceModule from './common/c6-province/province.module';
import DistrictModule from './common/c7-district/district.module';
import VillageModule from './common/c8-village/village.module';
import OrderItemsModule from './features/f10-order-items/order-items.module';
import ReferralModule from './features/f12-referral/referral.module';
import UserAdressModule from './features/f13-userAddress/userAdress.module';
import BankModule from './features/f14-bank/bank.module';
import UserBankModule from './features/f15-userBank/userBank.module';
import BannerModule from './features/f16-banners/banner.module';
import BrandModule from './features/f17-brands/brand.module';
import AttributeModule from './features/f18-attributes/attribute.module';
import FlashSaleModule from './features/f19-flashSale/flashSale.module';
import CustomerModule from './features/f2-customer/customer.module';
import ShopVoucherModule from './features/f20-shopVoucher/shopVoucher.module';
import ReviewModule from './features/f21-review/review.module';
import NewsModule from './features/f22-news/news.module';
import ConversationModule from './features/f23-conversation/conversations.module';
import MessageModule from './features/f24-messages/messages.module';
import BranchModule from './features/f25-branches/branches.module';
import CategoriesModule from './features/f3-categories/categories.module';
import ShopModule from './features/f3-shop/shop.module';
import ProductsModule from './features/f4-products/products.module';
import SkusModule from './features/f5-skus/skus.module';
import DiscountsModule from './features/f6-discounts/discounts.module';
import CartsModule from './features/f7-carts/carts.module';
import { ShippingMethod } from './features/f8-shipping-methods/schemas/shipping-methods.schema';
import OrdersModule from './features/f9-orders/orders.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      // Authorizations
      { path: '/users', module: UserModule },
      { path: '/free-apis', module: FreeApiModule },
      { path: '/auth-user-accesses', module: AuthUserAccessModule },
      { path: '/auth-user-ids', module: AuthUserIdModule },
      { path: '/groups', module: GroupModule },
      { path: '/group-details', module: GroupDetailModule },
      { path: '/group-apis', module: GroupApiModule },

      // Seed
      { path: '/seeds', module: SeedModule },

      // Commons
      { path: '/backup-datas', module: BackupDataModule },
      { path: '/auth', module: AuthModule },
      { path: '/otps', module: OtpModule },
      { path: '/uploads', module: UploadModule },
      { path: '/file-manager', module: FileManagerModule },
      { path: '/provinces', module: ProvinceModule },
      { path: '/districts', module: DistrictModule },
      { path: '/villages', module: VillageModule },
      { path: '/histories', module: HistoryModule },
      { path: '/dashboards', module: DashboardModule },
      { path: '/transactions', module: TransactionModule },
      { path: '/notifications', module: NotificationModule },
      { path: '/settings', module: SettingModule },
      { path: '/countries', module: CountryModule },

      // Features
      { path: '/cron-settings', module: CronSettingModule },
      { path: '/tests', module: TestModule },
      { path: '/customer', module: CustomerModule },
      { path: '/categories', module: CategoriesModule },
      { path: '/shop', module: ShopModule },
      { path: '/products', module: ProductsModule },
      { path: '/skus', module: SkusModule },
      { path: '/discounts', module: DiscountsModule },
      { path: '/carts', module: CartsModule },
      { path: '/shipping-method', module: ShippingMethod },
      { path: '/orders', module: OrdersModule },
      { path: '/order-items', module: OrderItemsModule },
      { path: '/transaction', module: TransactionModule },
      { path: '/referral', module: ReferralModule },
      { path: '/userAdress', module: UserAdressModule },
      { path: '/bank', module: BankModule },
      { path: '/userBank', module: UserBankModule },
      { path: '/banners', module: BannerModule },
      { path: '/brands', module: BrandModule },
      { path: '/attributes', module: AttributeModule },
      { path: '/flashSale', module: FlashSaleModule },
      { path: '/shopVoucher', module: ShopVoucherModule },
      { path: '/review', module: ReviewModule },
      { path: '/news', module: NewsModule },
      { path: '/conversation', module: ConversationModule },
      { path: '/messages', module: MessageModule },
      { path: '/branches', module: BranchModule },
      { path: '/app-subscriptions', module: AppSubscriptionModule },
      // { path: '/notifications, module: NotificationsModule' },
    ],
  },
];

if (ShareFunction.checkIsConfigS3Storage()) {
  /* eslint no-console: 0 */
  console.log('*** Replace serve static via router static with s3 storage ***');
  routes.push({ path: '/static', module: StaticS3Module });
}
const imports = [
  RouterModule.forRoutes(routes),

  // authorization
  UserModule,
  FreeApiModule,
  AuthUserAccessModule,
  AuthUserIdModule,
  GroupModule,
  GroupDetailModule,
  GroupApiModule,
  RolesGuard,

  // Seed
  SeedModule,

  // common
  BackupDataModule,
  AuthModule,
  OtpModule,
  UploadModule,
  FileManagerModule,
  ProvinceModule,
  DistrictModule,
  VillageModule,
  HistoryModule,
  DashboardModule,
  NotificationModule,
  SettingModule,
  CountryModule,
  TransactionModule,

  // features
  TestModule,
  CustomerModule,
  CategoriesModule,
  ShopModule,
  ProductsModule,
  SkusModule,
  DiscountsModule,
  CartsModule,
  ShippingMethod,
  OrdersModule,
  OrderItemsModule,
  ReferralModule,
  UserAdressModule,
  BankModule,
  UserBankModule,
  BannerModule,
  BrandModule,
  AttributeModule,
  FlashSaleModule,
  ShopVoucherModule,
  ReviewModule,
  NewsModule,
  ConversationModule,
  MessageModule,
  BranchModule,
  AppSubscriptionModule,
];

if (ShareFunction.checkIsConfigS3Storage()) {
  /* eslint no-console: 0 */
  console.log('*** Import module S3Storage dynamic ***');
  imports.push(StaticS3Module);
}

@Module({
  imports,
})
export default class V1Module {}
