import { Inject, Injectable, NotFoundException } from '@nestjs/common';

// ENUMS
import { ConstantsEnum } from '@/common/consts.enum';

// INTERFACES
import { DatabaseConnectionInterface } from '@/infrastructure/database/database-connection.interface';

// ENTITIES
import { PostLikeEntity } from './entities/post-like.entity';

// DTOs
import { CreatePostLikeParamsDTO } from './dtos/input/create-post-like-params.dto';

@Injectable()
export class PostLikeRepository {
	@Inject(ConstantsEnum.DATABASE)
	private readonly database: DatabaseConnectionInterface;

	public async likeDislike(
		ownerId: string,
		payload: CreatePostLikeParamsDTO,
	): Promise<PostLikeEntity> {
		const post = await this.database.blogPost.findUnique({
			where: {
				id: payload.blogPostId,
			},
		});
		if (!post) {
			throw new NotFoundException('Post not found');
		}

		const existingLike = await this.database.postLike.findUnique({
			where: {
				ownerId_blogPostId: {
					ownerId,
					blogPostId: payload.blogPostId,
				},
			},
		});

		if (existingLike) {
			return this.database.postLike.delete({
				where: {
					id: existingLike.id,
				},
			});
		}

		return this.database.postLike.create({
			data: {
				ownerId,
				blogPostId: payload.blogPostId,
			},
		});
	}
}
