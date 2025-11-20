import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

export enum WalletType {
  CASH = 'cash',
  BANK = 'bank',
  MOBILE_MONEY = 'mobile_money',
}

@Entity('wallets')
export class Wallet extends Base {
  @Column()
  name: string;

  @Column({ type: 'enum', enum: WalletType })
  type: WalletType;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  balance: number;

  @Column({ length: 5, default: 'NGN' })
  currency: string;

  @ManyToOne(() => User, user => user.wallets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })  
  user: User;
}

