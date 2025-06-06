// ENTITIES
import { PostCommentEntity } from '@/modules/post-comment/entities/post-comment.entity';
import { PostLikeEntity } from '@/modules/post-like/entities/post-like.entity';

export class BlogPostEntity {
	public id: string;
	public title: string;
	public content: string;
	public ownerId: string;
	public _count?: {
		comments?: number;
		postLikes?: number;
	};
	public comments?: Partial<PostCommentEntity[]>;
	public postLikes?: Partial<PostLikeEntity[]>;
	public createdAt: Date;
	public updatedAt: Date;

	constructor(data: BlogPostEntity) {
		this.id = data.id;
		this.title = data.title;
		this.content = data.content;
		this.ownerId = data.ownerId;
		this._count = data._count;
		this.comments = data?.comments;
		this.postLikes = data?.postLikes;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
	}
}
