import { Inject, Injectable } from '@nestjs/common';

// ENUMS
import { ConstantsEnum } from '@/common/consts.enum';

// INTERFACES
import { DatabaseConnectionInterface } from '@/infrastructure/database/database-connection.interface';

// ENTITIES
import { PostCommentEntity } from './entities/post-comment.entity';

// DTOs
import { CreatePostCommentParamsDTO } from './dtos/input/create-post-comment-params.dto';

@Injectable()
export class PostCommentRepository {
	@Inject(ConstantsEnum.DATABASE)
	private readonly database: DatabaseConnectionInterface;

	public async create(
		ownerId: string,
		payload: CreatePostCommentParamsDTO,
	): Promise<PostCommentEntity> {
		return this.database.postComment.create({
			data: {
				owner: {
					connect: {
						id: ownerId,
					},
				},
				blogPost: {
					connect: {
						id: payload.blogPostId,
					},
				},
				content: payload.content,
			},
		});
	}
}
