import { Provider } from '@nestjs/common';

// REPOSITORIES
import { PostLikeRepository } from './post-like.repository';

// USE-CASES
import { LikeDislikePostUseCase } from './use-cases/like-dislike-post.use-case';

export const PostLikeProviders: Provider[] = [
	PostLikeRepository,
	LikeDislikePostUseCase,
];
