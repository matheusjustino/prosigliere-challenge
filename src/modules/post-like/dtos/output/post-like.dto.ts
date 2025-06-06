import { ApiProperty } from '@nestjs/swagger';

// ENTITIES
import { PostLikeEntity } from '../../entities/post-like.entity';

export class PostLikeDTO {
	@ApiProperty({ type: String, description: 'PostLike ID' })
	public id: string;

	@ApiProperty({ type: String, description: 'Owner ID' })
	public ownerId: string;

	@ApiProperty({ type: String, description: 'Blog post ID' })
	public blogPostId: string;

	@ApiProperty({ type: Date, description: 'PostLike create date' })
	public createdAt: Date;

	@ApiProperty({ type: Date, description: 'PostLike update date' })
	public updatedAt: Date;

	constructor(data: PostLikeEntity) {
		this.id = data.id;
		this.ownerId = data.ownerId;
		this.blogPostId = data.blogPostId;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
	}
}
