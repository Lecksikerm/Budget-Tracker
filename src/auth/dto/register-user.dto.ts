import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';


export class RegisterUserDto {
@ApiProperty({ example: 'Jane Doe' })
@IsString()
@IsNotEmpty()
name: string;


@ApiProperty({ example: 'jane@example.com' })
@IsEmail()
email: string;


@ApiProperty({ minLength: 6 })
@IsString()
@MinLength(6)
password: string;
}