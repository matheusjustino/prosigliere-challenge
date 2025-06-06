import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

// REPOSITORIES
import { BlogPostRepository } from '../blog-post.repository';

// DTOs
import { BlogPostDTO } from '../dtos/output/blog-post.dto';

@Injectable()
export class GetBlogPostByIdUseCase {
	private readonly logger: Logger = new Logger(GetBlogPostByIdUseCase.name);

	@Inject(BlogPostRepository)
	private readonly blogPostRepository: BlogPostRepository;

	public async execute(blogPostId: string): Promise<BlogPostDTO> {
		this.logger.log(`Executing... blogPostId: ${blogPostId}`);

		const blogPost = await this.blogPostRepository.findById(blogPostId);
		if (!blogPost) {
			throw new NotFoundException('Post not found');
		}

		return new BlogPostDTO(blogPost);
	}
}
