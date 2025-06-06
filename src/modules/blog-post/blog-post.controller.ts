import {
	Body,
	Param,
	Controller,
	Get,
	Inject,
	Post,
	UseGuards,
	Query,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

// GUARDS
import { JwtGuard } from '@/common/guards/jwt.guard';

// DECORATORS
import { CurrentUser } from '@/common/decorators/user.decorator';

// INTERFACES
import { UserRequestInterface } from '@/common/interfaces/user-request.interface';

// USE-CASES
import { ListBlogPostsUseCase } from './use-cases/list-blog-posts.use-case';
import { CreateBlogPostUseCase } from './use-cases/create-blog-post.use-case';
import { GetBlogPostByIdUseCase } from './use-cases/get-blog-post-by-id.use-case';

// DTOs
import { BlogPostDTO } from './dtos/output/blog-post.dto';
import { PaginationDTO } from '@/common/dtos/pagination.dto';
import { CreatePostParamsDTO } from './dtos/input/create-post-params.dto';

@ApiTags(`[BLOG]`)
@Controller('blog')
export class BlogController {
	@Inject(CreateBlogPostUseCase)
	private readonly createBlogPostUseCase: CreateBlogPostUseCase;
	@Inject(ListBlogPostsUseCase)
	private readonly listBlogPostsUseCase: ListBlogPostsUseCase;
	@Inject(GetBlogPostByIdUseCase)
	private readonly getBlogPostByIdUseCase: GetBlogPostByIdUseCase;

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Post('post')
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: BlogPostDTO,
	})
	public async createPost(
		@CurrentUser() user: UserRequestInterface,
		@Body() payload: CreatePostParamsDTO,
	) {
		return this.createBlogPostUseCase.execute(user.id, payload);
	}

	@Get('posts')
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: [BlogPostDTO],
	})
	public async getPosts(@Query() query: PaginationDTO) {
		return this.listBlogPostsUseCase.execute(query);
	}

	@Get('posts/:id')
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: BlogPostDTO,
	})
	public async getPost(@Param('id') postId: string) {
		return this.getBlogPostByIdUseCase.execute(postId);
	}
}
