import { ApiProperty } from '@nestjs/swagger';

// ENTITIES
import { BlogPostEntity } from '../../entities/blog-post.entity';
import { PostLikeDTO } from '@/modules/post-like/dtos/output/post-like.dto';
import { PostCommentDTO } from '@/modules/post-comment/dtos/output/post-comment.dto';

export class BlogPostDTO {
	@ApiProperty({ type: String, description: 'BlogPost ID' })
	public id: string;

	@ApiProperty({ type: String, description: 'BlogPost title' })
	public title: string;

	@ApiProperty({ type: String, description: 'BlogPost content' })
	public content: string;

	@ApiProperty({ type: String, description: 'BlogPost owner ID' })
	public ownerId: string;

	@ApiProperty({ type: Number, description: 'BlogPost comments count' })
	public commentsCount?: number;

	@ApiProperty({ type: Number, description: 'BlogPost likes count' })
	public postLikesCount?: number;

	@ApiProperty({
		type: () => [PostCommentDTO],
		description: 'BlogPost comments',
	})
	public comments?: PostCommentDTO[];

	@ApiProperty({ type: () => [PostLikeDTO], description: 'BlogPost lies' })
	public postLikes?: PostLikeDTO[];

	@ApiProperty({ type: String, description: 'BlogPost create date' })
	public createdAt: Date;

	@ApiProperty({ type: Date, description: 'BlogPost update date' })
	public updatedAt: Date;

	constructor(data: BlogPostEntity) {
		this.id = data.id;
		this.title = data.title;
		this.content = data.content;
		this.ownerId = data.ownerId;
		this.commentsCount = data._count?.comments;
		this.postLikesCount = data._count?.postLikes;
		this.comments = data?.comments
			? data.comments.map((comment) => new PostCommentDTO(comment))
			: [];
		this.postLikes = data?.postLikes
			? data.postLikes.map((like) => new PostLikeDTO(like))
			: [];
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
	}
}
