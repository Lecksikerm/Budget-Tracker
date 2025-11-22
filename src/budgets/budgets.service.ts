import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget, BudgetPeriod } from '../common/entities/budget.entity';
import { Transaction, TransactionType } from '../common/entities/transaction.entity';
import { CreateBudgetDto } from 'src/auth/dto/create-budget.dto';
import { PaginationDto } from 'src/auth/dto/pagination.dto';
import { UpdateBudgetDto } from 'src/auth/dto/update-budget.dto';


@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepo: Repository<Budget>,
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async create(dto: CreateBudgetDto, userId: string): Promise<Budget> {
    const budget = this.budgetRepo.create({
      ...dto,
      amount:       Number(dto.amount.toFixed(2)),
      period:       dto.period as BudgetPeriod,
      user:         { id: userId },
    });
    return this.budgetRepo.save(budget);
  }

  async findAll(userId: string, pagination: PaginationDto) {
    const page  = pagination.page  ?? 1;
    const limit = Math.min(pagination.limit ?? 10, 100);
    const skip  = (page - 1) * limit;

    const [data, total] = await this.budgetRepo.findAndCount({
      where:   { user: { id: userId } },
      order:   { createdAt: 'DESC' },
      skip,
      take:    limit,
    });

    return { data, meta: { total, page, limit, lastPage: Math.ceil(total / limit) } };
  }

  async findOne(id: string, userId: string): Promise<Budget> {
    const budget = await this.budgetRepo.findOne({
      where:    { id, user: { id: userId } },
      relations: { user: true },
    });
    if (!budget) throw new NotFoundException('Budget not found');
    return budget;
  }

  async update(id: string, dto: UpdateBudgetDto, userId: string): Promise<Budget> {
    await this.findOne(id, userId); 

    const payload: Partial<Budget> = {};
    if (dto.name      !== undefined) payload.name      = dto.name;
    if (dto.amount    !== undefined) payload.amount    = Number(dto.amount.toFixed(2));
    if (dto.period    !== undefined) payload.period    = dto.period as BudgetPeriod;
    if (dto.startDate !== undefined) payload.startDate = dto.startDate;
    if (dto.endDate   !== undefined) payload.endDate   = dto.endDate;
    if (dto.category  !== undefined) payload.category  = dto.category;

    await this.budgetRepo.update(id, payload);
    return this.findOne(id, userId);
  }

  async delete(id: string, userId: string): Promise<{ message: string }> {
    await this.findOne(id, userId);
    await this.budgetRepo.delete(id);
    return { message: 'Budget deleted successfully' };
  }

  async calculateUsage(id: string, userId: string) {
    const budget = await this.findOne(id, userId);

    const { total } = await this.transactionRepo
      .createQueryBuilder('t')
      .select('COALESCE(SUM(t.amount), 0)', 'total')
      .where('t.userId = :userId', { userId })
      .andWhere('t.type = :type', { type: TransactionType.EXPENSE })
      .andWhere('t.date BETWEEN :start AND :end', {
        start: budget.startDate,
        end:   budget.endDate,
      })
      .andWhere(budget.category ? 't.category = :cat' : '1=1', {
        cat: budget.category,
      })
      .getRawOne<{ total: string }>() ?? { total: '0' };

    const spent       = Number(total);
    const percentUsed = Number(((spent / budget.amount) * 100).toFixed(1));

    let status: 'under' | 'warning' | 'over' = 'under';
    if (spent > budget.amount)       status = 'over';
    else if (spent > budget.amount * 0.75) status = 'warning';

    return { budget, spent, percentUsed, status };
  }
}




