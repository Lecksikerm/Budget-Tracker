import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from 'src/auth/dto/create-wallet.dto';
import { UpdateWalletDto } from 'src/auth/dto/update-wallet.dto';
import { UserDecorator } from 'src/auth/user.decorator';


@ApiTags('Wallets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('wallets')
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) { }

    @ApiOperation({ summary: 'Create a wallet' })
    @Post('/')
    create(@Body() dto: CreateWalletDto, @UserDecorator('id') userId: string) {
        return this.walletsService.create(dto, userId);
    }

    @ApiOperation({ summary: 'List all wallets of the user' })
    @Get('/all')
    findAll(@UserDecorator('id') userId: string) {
        return this.walletsService.findAll(userId);
    }

    @ApiOperation({ summary: 'Get a single wallet by ID' })
    @Get('/:id')
    findOne(@Param('id') id: string, @UserDecorator('id') userId: string) {
        return this.walletsService.findOne(id, userId);
    }

    @ApiOperation({ summary: 'Update a wallet' })
    @Patch('/:id')
    update(@Param('id') id: string, @Body() dto: UpdateWalletDto, @UserDecorator('id') userId: string) {
        return this.walletsService.update(id, dto, userId);
    }

    @ApiOperation({ summary: 'Delete a wallet' })
    @Delete('/:id')
    delete(@Param('id') id: string, @UserDecorator('id') userId: string) {
        return this.walletsService.delete(id, userId);
    }
}
