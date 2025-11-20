import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Base } from './base.entity';


export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity('transactions')
export class Transaction extends Base {
  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column()
  category: string;

  @Column({ nullable: true })
  note?: string;

  @Column({ type: 'date' })
  date: string;

  @ManyToOne(() => User, user => user.transactions, { onDelete: 'CASCADE', nullable: false })
  user: User;
}
