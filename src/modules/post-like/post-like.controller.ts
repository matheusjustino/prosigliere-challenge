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

// DECORTORS
import { CurrentUser } from '@/common/decorators/user.decorator';

// USE-CASES
import { LikeDislikePostUseCase } from './use-cases/like-dislike-post.use-case';

// INTERFACES
import { UserRequestInterface } from '@/common/interfaces/user-request.interface';

// DTOs
import { PostLikeDTO } from './dtos/output/post-like.dto';
import { CreatePostLikeParamsDTO } from './dtos/input/create-post-like-params.dto';

@ApiTags(`[POST-LIKE]`)
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('post-like')
export class PostLikeController {
	@Inject(LikeDislikePostUseCase)
	private readonly likeDislikePostUseCase: LikeDislikePostUseCase;

	@Post()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: PostLikeDTO })
	public async likeDislikePost(
		@CurrentUser() user: UserRequestInterface,
		@Body() body: CreatePostLikeParamsDTO,
	) {
		return this.likeDislikePostUseCase.execute(user.id, body);
	}
}
