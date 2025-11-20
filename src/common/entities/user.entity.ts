import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Transaction } from './transaction.entity';

@Entity({ name: 'users' })
export class User extends Base {
    @Column({ length: 100 })
    name: string;


    @Column({ length: 150, unique: true })
    email: string;


    @Column()
    password: string;


    @Column({ nullable: true })
    avatar?: string;

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions: Transaction[];
}