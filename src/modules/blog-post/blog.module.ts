import { Module } from '@nestjs/common';

import { BlogProviders } from './blog.providers';
import { BlogController } from './blog-post.controller';

@Module({
	controllers: [BlogController],
	providers: BlogProviders,
})
export class BlogModule {}
