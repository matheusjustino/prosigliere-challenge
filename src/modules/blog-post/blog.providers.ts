import { Provider } from '@nestjs/common';

// REPOSITORIES
import { BlogPostRepository } from './blog-post.repository';

// USE-CASES
import { CreateBlogPostUseCase } from './use-cases/create-blog-post.use-case';
import { GetBlogPostByIdUseCase } from './use-cases/get-blog-post-by-id.use-case';
import { ListBlogPostsUseCase } from './use-cases/list-blog-posts.use-case';

export const BlogProviders: Provider[] = [
	CreateBlogPostUseCase,
	GetBlogPostByIdUseCase,
	ListBlogPostsUseCase,
	BlogPostRepository,
];
