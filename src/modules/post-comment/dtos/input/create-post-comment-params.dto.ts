import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePostCommentParamsDTO {
	@ApiProperty({ type: String, description: 'Blog post ID' })
	@IsString()
	@IsUUID()
	@IsNotEmpty()
	public blogPostId: string;

	@ApiProperty({ type: String, description: 'Post comment content' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(300)
	public content: string;
}
