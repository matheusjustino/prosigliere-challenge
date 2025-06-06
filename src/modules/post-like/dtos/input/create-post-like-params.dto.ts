import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePostLikeParamsDTO {
	@ApiProperty({ type: String, description: 'Blog post ID' })
	@IsNotEmpty()
	@IsUUID()
	public blogPostId: string;
}
