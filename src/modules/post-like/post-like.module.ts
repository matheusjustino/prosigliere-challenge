import { Module } from '@nestjs/common';

import { PostLikeController } from './post-like.controller';
import { PostLikeProviders } from './post-like.providers';

@Module({
	controllers: [PostLikeController],
	providers: PostLikeProviders,
})
export class PostLikeModule {}
