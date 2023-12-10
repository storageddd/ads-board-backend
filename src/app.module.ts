import { Module } from '@nestjs/common';
import { AuthorizationModule } from '~/modules/authorization/authorization.module';
import { UsersModule } from '~/modules/users/users.module';
import { CategoriesModule } from '~/modules/categories/categories.module';
import { AdvertisementsModule } from '~/modules/advertisements/advertisements.module';

@Module({
  imports: [
    AuthorizationModule,
    UsersModule,
    CategoriesModule,
    AdvertisementsModule,
  ],
})
export class AppModule {}
