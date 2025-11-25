import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './modules/car/car.module';
import { OrderModule } from './modules/order/order.module';
import { ItemModule } from './modules/item/item.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { AssessmentModule } from './modules/assessment/assessment.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), DatabaseModule, UserModule, CarModule, OrderModule, ItemModule, CategoryModule, ProductModule, AssessmentModule, AddressModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
