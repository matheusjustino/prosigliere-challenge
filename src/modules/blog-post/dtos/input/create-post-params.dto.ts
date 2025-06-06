import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostParamsDTO {
	@ApiProperty({ type: String, description: 'Post title' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(10)
	public title: string;

	@ApiProperty({ type: String, description: 'Post content' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(1000)
	public content: string;
}
