import { Inject, Injectable, Logger } from '@nestjs/common';

// REPOSITORIES
import { PostCommentRepository } from '../post-comment.repository';

// DTOs
import { PostCommentDTO } from '../dtos/output/post-comment.dto';
import { CreatePostCommentParamsDTO } from '../dtos/input/create-post-comment-params.dto';

@Injectable()
export class CreatePostCommentUseCase {
	private readonly logger: Logger = new Logger(CreatePostCommentUseCase.name);

	@Inject(PostCommentRepository)
	private readonly postCommentRepository: PostCommentRepository;

	public async execute(
		ownerId: string,
		payload: CreatePostCommentParamsDTO,
	): Promise<PostCommentDTO> {
		this.logger.log(
			`Executing... payload: ${JSON.stringify({ ownerId, ...payload }, null, 4)}`,
		);

		const postComment = await this.postCommentRepository.create(
			ownerId,
			payload,
		);
		return new PostCommentDTO(postComment);
	}
}
