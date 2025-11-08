import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';



@Injectable()
export class UsersService {
constructor(
@InjectRepository(User)
private readonly usersRepo: Repository<User>,
) {}


async create(userPartial: Partial<User>): Promise<User> {
const user = this.usersRepo.create(userPartial);
return this.usersRepo.save(user);
}


async findByEmail(email: string): Promise<User | null> {
return this.usersRepo.findOneBy({ email });
}


async findById(id: string): Promise<User> {
const user = await this.usersRepo.findOneBy({ id });
if (!user) throw new NotFoundException('User not found');
return user;
}
}