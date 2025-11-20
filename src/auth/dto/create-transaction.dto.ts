import { IsEnum, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';
import { TransactionType } from 'src/common/entities/transaction.entity';


export class CreateTransactionDto {
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  amount: number;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsDateString()
  date: string;
}
