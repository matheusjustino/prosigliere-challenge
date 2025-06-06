import { ApiProperty } from '@nestjs/swagger';

// ENTITIES
import { UserEntity } from '../../entities/user.entity';

// DTOs
import { BlogPostDTO } from '@/modules/blog-post/dtos/output/blog-post.dto';
import { PostCommentDTO } from '@/modules/post-comment/dtos/output/post-comment.dto';
import { PostLikeDTO } from '@/modules/post-like/dtos/output/post-like.dto';

export class UserDTO {
	@ApiProperty({ type: String, description: 'User ID' })
	public id: string;

	@ApiProperty({ type: String, description: 'User email' })
	public email: string;

	@ApiProperty({
		type: () => [BlogPostDTO],
		description: 'Blog post list',
	})
	public blogPosts?: BlogPostDTO[];

	@ApiProperty({
		type: () => [PostCommentDTO],
		description: 'Post comment list',
	})
	public postsComments?: PostCommentDTO[];

	@ApiProperty({ type: () => [PostLikeDTO], description: 'Post like list' })
	public postsLike?: PostLikeDTO[];

	@ApiProperty({ type: Date, description: 'User create date' })
	public createdAt: Date;

	@ApiProperty({ type: Date, description: 'User update date' })
	public updatedAt: Date;

	constructor(data: UserEntity | Partial<UserEntity>) {
		this.id = data?.id;
		this.email = data?.email;
		this.blogPosts = data?.blogPosts?.map(
			(blogPost) => new BlogPostDTO(blogPost),
		);
		this.postsComments = data?.postsComments?.map(
			(postComment) => new PostCommentDTO(postComment),
		);
		this.postsLike = data?.postsLike?.map(
			(postLike) => new PostLikeDTO(postLike),
		);
		this.createdAt = data?.createdAt;
		this.updatedAt = data?.updatedAt;
	}
}
