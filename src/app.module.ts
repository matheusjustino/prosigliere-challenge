import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

// MODULES
import { BlogModule } from './modules/blog-post/blog.module';
import { CommonModule } from './common/common.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostCommentModule } from './modules/post-comment/post-comment.module';
import { PostLikeModule } from './modules/post-like/post-like.module';

@Module({
	imports: [
		CommonModule,
		InfrastructureModule,
		BlogModule,
		AuthModule,
		PostCommentModule,
		PostLikeModule,
	],
	controllers: [AppController],
})
export class AppModule {}
