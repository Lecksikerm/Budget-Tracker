import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

export enum BudgetPeriod {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

@Entity('budgets')
export class Budget extends Base {
  @Column()
  name: string;

  @Column({
    type: 'decimal', precision: 12, scale: 2,
    transformer: {
      from: val => parseFloat(val as string),
      to: val => val,
    },
  })
  amount: number;

  @Column({ type: 'enum', enum: BudgetPeriod })
  period: BudgetPeriod;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ nullable: true })
  category?: string;

  @ManyToOne(() => User, user => user.budgets, { onDelete: 'CASCADE' })
  user: User;
}
