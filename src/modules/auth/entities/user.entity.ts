// ENTITIES
import { BlogPostEntity } from '@/modules/blog-post/entities/blog-post.entity';
import { PostCommentEntity } from '@/modules/post-comment/entities/post-comment.entity';
import { PostLikeEntity } from '@/modules/post-like/entities/post-like.entity';

export class UserEntity {
	public id: string;
	public email: string;
	public password: string;
	public blogPosts?: Partial<BlogPostEntity[]>;
	public postsComments?: Partial<PostCommentEntity[]>;
	public postsLike?: Partial<PostLikeEntity[]>;
	public createdAt: Date;
	public updatedAt: Date;

	constructor(data: UserEntity) {
		this.id = data.id;
		this.email = data.email;
		this.password = data.password;
		this.blogPosts = data.blogPosts;
		this.postsComments = data.postsComments;
		this.postsLike = data.postsLike;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
	}
}
