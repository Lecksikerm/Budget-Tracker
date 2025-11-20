import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { WalletType } from 'src/common/entities/wallet.entity';


export class CreateWalletDto {
  @ApiProperty({ example: 'Main Bank Account' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: WalletType, example: WalletType.BANK })
  @IsEnum(WalletType)
  type: WalletType;

  @ApiProperty({ example: 5000, required: false })
  @IsOptional()
  @IsNumber()
  balance?: number;

  @ApiProperty({ example: 'NGN', required: false })
  @IsOptional()
  @IsString()
  currency?: string;
}
