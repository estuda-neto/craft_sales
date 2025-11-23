import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/user/entities/user.entity';

@Module({
    imports: [SequelizeModule.forRoot({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: "craft_sales",
        models: [User],
        autoLoadModels: true,
        synchronize: true
    })]
})
export class DatabaseModule { }
