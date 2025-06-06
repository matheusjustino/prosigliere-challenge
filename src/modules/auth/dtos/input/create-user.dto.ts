import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
	@ApiProperty({ type: String, description: 'User email' })
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	public email: string;

	@ApiProperty({ type: String, description: 'User password' })
	@IsNotEmpty()
	@IsString()
	public password: string;
}
