import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Inject,
	Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

// USE-CASES
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { DoLoginUserUseCase } from './use-cases/do-login.use-case';

// DTOs
import { CreateUserDTO } from './dtos/input/create-user.dto';
import { DoLoginDTO } from './dtos/input/do-login.dto';
import { UserDTO } from './dtos/output/user.dto';

@ApiTags(`[AUTH]`)
@Controller('auth')
export class AuthController {
	@Inject(CreateUserUseCase)
	private readonly createUserUseCase: CreateUserUseCase;
	@Inject(DoLoginUserUseCase)
	private readonly doLoginUseCase: DoLoginUserUseCase;

	@Post('register')
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: UserDTO })
	public async register(@Body() body: CreateUserDTO) {
		return this.createUserUseCase.execute(body);
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: String })
	public async doLogin(@Body() body: DoLoginDTO) {
		return this.doLoginUseCase.execute(body);
	}
}
