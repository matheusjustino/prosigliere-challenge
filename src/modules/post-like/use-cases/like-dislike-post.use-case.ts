import { Inject, Injectable, Logger } from '@nestjs/common';

// REPOSITORIES
import { PostLikeRepository } from '../post-like.repository';

// DTOs
import { PostLikeDTO } from '../dtos/output/post-like.dto';
import { CreatePostLikeParamsDTO } from '../dtos/input/create-post-like-params.dto';

@Injectable()
export class LikeDislikePostUseCase {
	private readonly logger: Logger = new Logger(LikeDislikePostUseCase.name);

	@Inject(PostLikeRepository)
	private readonly postLikeRepository: PostLikeRepository;

	public async execute(
		ownerId: string,
		payload: CreatePostLikeParamsDTO,
	): Promise<PostLikeDTO> {
		this.logger.log(
			`Executing... payload: ${JSON.stringify({ ownerId, ...payload }, null, 4)}`,
		);

		const likeDislike = await this.postLikeRepository.likeDislike(
			ownerId,
			payload,
		);
		return new PostLikeDTO(likeDislike);
	}
}
