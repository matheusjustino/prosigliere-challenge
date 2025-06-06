import { Inject, Injectable, Logger } from '@nestjs/common';

// REPOSITORIES
import { BlogPostRepository } from '../blog-post.repository';

// DTOs
import { BlogPostDTO } from '../dtos/output/blog-post.dto';
import { PaginationDTO } from '@/common/dtos/pagination.dto';

@Injectable()
export class ListBlogPostsUseCase {
	private readonly logger: Logger = new Logger(ListBlogPostsUseCase.name);

	@Inject(BlogPostRepository)
	private readonly blogPostRepository: BlogPostRepository;

	public async execute(query: PaginationDTO): Promise<BlogPostDTO[]> {
		this.logger.log(
			`Executing... query: ${JSON.stringify(query, null, 4)}`,
		);

		const blogPosts = await this.blogPostRepository.find(query);
		return blogPosts.map((blogPost) => new BlogPostDTO(blogPost));
	}
}
