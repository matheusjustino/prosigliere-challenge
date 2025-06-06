// ENTITIES
import { UserEntity } from '@/modules/auth/entities/user.entity';
import { BlogPostEntity } from '@/modules/blog-post/entities/blog-post.entity';

export class PostLikeEntity {
	public id: string;
	public ownerId: string;
	public owner?: Partial<UserEntity>;
	public blogPostId: string;
	public blogPost?: Partial<BlogPostEntity>;
	public createdAt: Date;
	public updatedAt: Date;

	constructor(data: PostLikeEntity) {
		this.id = data.id;
		this.ownerId = data.ownerId;
		this.owner = data.owner;
		this.blogPostId = data.blogPostId;
		this.blogPost = data.blogPost;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
	}
}
