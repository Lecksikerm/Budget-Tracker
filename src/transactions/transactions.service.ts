import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from 'src/auth/dto/create-transaction.dto';
import { PaginatedResultDto } from 'src/auth/dto/paginated-result.dto';
import { PaginationQueryDto } from 'src/auth/dto/pagination-query.dto';
import { UpdateTransactionDto } from 'src/auth/dto/update-transaction.dto';
import { Transaction } from 'src/common/entities/transaction.entity';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';




@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) { }
  async create(userPayload: any, dto: CreateTransactionDto) {
    const transaction = this.transactionRepo.create({
      ...dto,
      user: { id: userPayload.userId } as User,
    });

    return await this.transactionRepo.save(transaction);
  }

  async findAll(userPayload: any, pagination?: PaginationQueryDto) {
    const { limit = 10, page = 1 } = pagination || {};

    const [data, total] = await this.transactionRepo.findAndCount({
      where: { user: { id: userPayload.userId } },
      take: limit,
      skip: (page - 1) * limit,
      order: { date: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }


  async findOne(userPayload: any, id: string) {
    const transaction = await this.transactionRepo.findOne({
      where: { id, user: { id: userPayload.userId } },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');
    return transaction;
  }


  async update(user: User, id: string, dto: UpdateTransactionDto) {
    const transaction = await this.findOne(user, id);
    Object.assign(transaction, dto);
    return this.transactionRepo.save(transaction);
  }

  async remove(user: User, id: string) {
    const transaction = await this.findOne(user, id);
    return this.transactionRepo.remove(transaction);
  }
}
