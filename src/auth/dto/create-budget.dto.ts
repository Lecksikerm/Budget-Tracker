import { IsEnum, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BudgetPeriod } from '../../common/entities/budget.entity';

export class CreateBudgetDto {
  @ApiProperty({ example: 'Food Budget', description: 'Name of the budget' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 50_000, description: 'Budget amount' })
  @IsNumber({ maxDecimalPlaces: 2 })
  amount!: number;

  @ApiProperty({
    enum: BudgetPeriod,                      
    example: BudgetPeriod.MONTHLY,
    description: 'Budget period',
  })
  @IsEnum(BudgetPeriod)
  period!: BudgetPeriod;

  @ApiProperty({ example: '2025-11-01', description: 'Budget start date' })
  @IsDateString()
  startDate!: string;

  @ApiProperty({ example: '2025-11-30', description: 'Budget end date' })
  @IsDateString()
  endDate!: string;

  @ApiProperty({ example: 'Groceries', description: 'Category', required: false })
  @IsOptional()
  @IsString()
  category?: string;
}

