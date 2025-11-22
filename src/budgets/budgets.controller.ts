import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Req,
  Query,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { BudgetsService } from './budgets.service';

import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateBudgetDto } from 'src/auth/dto/create-budget.dto';
import { PaginationDto } from 'src/auth/dto/pagination.dto';
import { UpdateBudgetDto } from 'src/auth/dto/update-budget.dto';


@ApiBearerAuth()
@ApiTags('Budgets')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) { }

  @Post('/')
  @ApiOperation({ summary: 'Create new budget' })
  @ApiResponse({
    status: 201,
    description: 'Budget created',
    type: CreateBudgetDto,
  })
  create(@Body() dto: CreateBudgetDto, @Req() req) {
    return this.budgetsService.create(dto, req.user.id);
  }

  @Get('/all')
  @ApiOperation({ summary: 'Get paginated budgets for logged-in user' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAll(@Req() req, @Query() pagination: PaginationDto) {
    return this.budgetsService.findAll(req.user.id, pagination);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get budget usage & details' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.budgetsService.calculateUsage(id, req.user.id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update existing budget' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBudgetDto,
    @Req() req,
  ) {
    return this.budgetsService.update(id, dto, req.user.id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a budget' })
  delete(@Param('id') id: string, @Req() req) {
    return this.budgetsService.delete(id, req.user.id);
  }
}
