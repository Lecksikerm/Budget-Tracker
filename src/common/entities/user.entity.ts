import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Transaction } from './transaction.entity';
import { Wallet } from './wallet.entity';
import { Budget } from './budget.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User extends Base {
    @Column({ length: 100 })
    name: string;


    @Column({ length: 150, unique: true })
    email: string;

    
    @Column()
    @Exclude()
    password: string;

    @Column({ nullable: true })
    avatar?: string;

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions: Transaction[];

    @OneToMany(() => Wallet, wallet => wallet.user)
    wallets: Wallet[];

    @OneToMany(() => Budget, budget => budget.user)
    budgets: Budget[];

}