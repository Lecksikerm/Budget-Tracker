import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from 'src/common/entities/transaction.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionsController],
  providers: [TransactionsService, JwtStrategy],
})
export class TransactionsModule {}
