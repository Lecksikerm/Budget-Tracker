import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../common/entities/user.entity';
import { Transaction } from 'src/common/entities/transaction.entity';
import { Wallet } from 'src/common/entities/wallet.entity';
import { Budget } from 'src/common/entities/budget.entity';

dotenv.config();
const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Transaction, Wallet, Budget],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});


export default AppDataSource;