import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from 'src/modules/address/entities/address.entity';
import { Assessment } from 'src/modules/assessment/entities/assessment.entity';
import { Car } from 'src/modules/car/entities/car.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { ProductCategory } from 'src/modules/category/entities/productcategory.entity';
import { Item } from 'src/modules/item/entities/item.entity';
import { Midia } from 'src/modules/midia/entities/midia.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Module({
    imports: [SequelizeModule.forRoot({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: "craft_sales",
        models: [User, Product, Order, Item, Category, Car, Assessment, Address, ProductCategory, Midia],
        autoLoadModels: true,
        synchronize: true
    })]
})
export class DatabaseModule { }
