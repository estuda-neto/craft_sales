import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forRoot({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: "craft_sales",
        models: [],
        autoLoadModels: true,
        synchronize: true
    })]
})
export class DatabaseModule { }
