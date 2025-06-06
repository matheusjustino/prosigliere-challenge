import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Inject,
	Post,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

// GUARDS
import { JwtGuard } from '@/common/guards/jwt.guard';

// DECORATORS
import { CurrentUser } from '@/common/decorators/user.decorator';

// INTERFACES
import { UserRequestInterface } from '@/common/interfaces/user-request.interface';

// USE-CASES
import { CreatePostCommentUseCase } from './use-cases/create-post-comment.use-case';

// DTOs
import { CreatePostCommentParamsDTO } from './dtos/input/create-post-comment-params.dto';
import { PostCommentDTO } from './dtos/output/post-comment.dto';

@ApiTags(`[POST-COMMENT]`)
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('post-comment')
export class PostCommentController {
	@Inject(CreatePostCommentUseCase)
	private readonly createPostCommentUseCase: CreatePostCommentUseCase;

	@Post()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: PostCommentDTO,
	})
	public async createPostComment(
		@CurrentUser() user: UserRequestInterface,
		@Body() body: CreatePostCommentParamsDTO,
	) {
		return this.createPostCommentUseCase.execute(user.id, body);
	}
}
