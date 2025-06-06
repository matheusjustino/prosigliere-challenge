import { Module } from '@nestjs/common';

import { PostCommentController } from './post-comment.controller';
import { PostCommentProviders } from './post-comment.providers';

@Module({
	controllers: [PostCommentController],
	providers: PostCommentProviders,
})
export class PostCommentModule {}
