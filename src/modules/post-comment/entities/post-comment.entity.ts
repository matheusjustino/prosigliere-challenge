// ENTITIES
import { UserEntity } from '@/modules/auth/entities/user.entity';
import { BlogPostEntity } from '@/modules/blog-post/entities/blog-post.entity';

export class PostCommentEntity {
	public id: string;
	public content: string;
	public ownerId: string;
	public owner?: Partial<UserEntity>;
	public blogPostId: string;
	public blogPost?: Partial<BlogPostEntity>;
	public createdAt: Date;
	public updatedAt: Date;

	constructor(data: PostCommentEntity) {
		this.id = data.id;
		this.content = data.content;
		this.ownerId = data.ownerId;
		this.owner = data.owner;
		this.blogPostId = data.blogPostId;
		this.blogPost = data.blogPost;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
	}
}
