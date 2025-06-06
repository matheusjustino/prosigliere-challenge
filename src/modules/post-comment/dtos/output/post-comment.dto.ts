import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ENTITIES
import { PostCommentEntity } from '../../entities/post-comment.entity';

// DTOs
import { UserDTO } from '@/modules/auth/dtos/output/user.dto';

export class PostCommentDTO {
	@ApiProperty({ type: String, description: 'PostComment ID' })
	public id: string;

	@ApiProperty({ type: String, description: 'PostComment content' })
	public content: string;

	@ApiProperty({ type: String, description: 'PostComment owner ID' })
	public ownerId: string;

	@ApiPropertyOptional({
		type: () => UserDTO,
		description: 'PostComment owner',
	})
	public owner?: UserDTO;

	@ApiProperty({ type: String, description: 'BlogPost ID' })
	public blogPostId: string;

	@ApiProperty({ type: Date, description: 'PostComment create date' })
	public createdAt: Date;

	@ApiProperty({ type: Date, description: 'PostComment update date' })
	public updatedAt: Date;

	constructor(data: PostCommentEntity) {
		this.id = data.id;
		this.content = data.content;
		this.ownerId = data.ownerId;
		this.owner = data?.owner ? new UserDTO(data.owner) : null;
		this.blogPostId = data.blogPostId;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
	}
}
