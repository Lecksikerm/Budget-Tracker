import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './common/entities/user.entity';
import { Transaction } from './common/entities/transaction.entity';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Transaction], 
      synchronize: false, 
      migrations: [__dirname + '/migrations/*{.ts,.js}'], 
      logging: true,
    }),

    UsersModule,
    AuthModule,
    TransactionsModule,


  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

