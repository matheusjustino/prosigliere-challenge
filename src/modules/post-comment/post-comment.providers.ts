import { Provider } from '@nestjs/common';

// REPOSITORIES
import { PostCommentRepository } from './post-comment.repository';

// USE_CASES
import { CreatePostCommentUseCase } from './use-cases/create-post-comment.use-case';

export const PostCommentProviders: Provider[] = [
	CreatePostCommentUseCase,
	PostCommentRepository,
];
