import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWalletDto } from 'src/auth/dto/create-wallet.dto';
import { UpdateWalletDto } from 'src/auth/dto/update-wallet.dto';
import { Wallet } from 'src/common/entities/wallet.entity';
import { Repository } from 'typeorm';


@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepo: Repository<Wallet>,
    ) { }

    create(dto: CreateWalletDto, userId: string) {
        const wallet = this.walletRepo.create({ ...dto, user: { id: userId } });
        return this.walletRepo.save(wallet);
    }

    findAll(userId: string) {
        return this.walletRepo.find({ where: { user: { id: userId } } });
    }

    async findOne(id: string, userId: string) {
        const wallet = await this.walletRepo.findOne({
            where: { id, user: { id: userId } },
        });
        if (!wallet) throw new NotFoundException('Wallet not found');
        return wallet;
    }

    async update(id: string, dto: UpdateWalletDto, userId: string) {
        const wallet = await this.findOne(id, userId);

        await this.walletRepo.update(
            { id },
            dto
        );
        return { message: 'Wallet updated successfully', wallet: { ...wallet, ...dto } };
    }

    async delete(id: string, userId: string) {
        const result = await this.walletRepo.delete({ id, user: { id: userId } });

        if (result.affected === 0) {
            throw new NotFoundException('Wallet not found');
        }

        return { message: 'Wallet deleted successfully' };
    }


}
