import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTransactionDto } from 'src/auth/dto/create-transaction.dto';
import { PaginationQueryDto } from 'src/auth/dto/pagination-query.dto';
import { UpdateTransactionDto } from 'src/auth/dto/update-transaction.dto';

@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/')
  create(@Req() req, @Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(req.user, dto);
  }

  @Get('/all')
  findAll(@Req() req, @Query() pagination: PaginationQueryDto) {
    return this.transactionsService.findAll(req.user, pagination);
  }

  @Get('/:id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.transactionsService.findOne(req.user, id);
  }

  @Patch('/:id')
  update(@Req() req, @Param('id') id: string, @Body() dto: UpdateTransactionDto) {
    return this.transactionsService.update(req.user, id, dto);
  }

  @Delete('/:id')
  remove(@Req() req, @Param('id') id: string) {
    return this.transactionsService.remove(req.user, id);
  }
}
