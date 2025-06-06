import { Inject, Injectable, Logger } from '@nestjs/common';

// REPOSITORIES
import { BlogPostRepository } from '../blog-post.repository';

// DTOs
import { CreatePostParamsDTO } from '../dtos/input/create-post-params.dto';
import { BlogPostDTO } from '../dtos/output/blog-post.dto';

@Injectable()
export class CreateBlogPostUseCase {
	private readonly logger: Logger = new Logger(CreateBlogPostUseCase.name);

	@Inject(BlogPostRepository)
	private readonly blogPostRepository: BlogPostRepository;

	public async execute(
		ownerId: string,
		payload: CreatePostParamsDTO,
	): Promise<BlogPostDTO> {
		this.logger.log(
			`Executing... payload: ${JSON.stringify({ ownerId, ...payload }, null, 4)}`,
		);

		const newBlog = await this.blogPostRepository.create(ownerId, payload);
		return new BlogPostDTO(newBlog);
	}
}
