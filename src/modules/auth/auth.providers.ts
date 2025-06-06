import { Provider } from '@nestjs/common';

import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { DoLoginUserUseCase } from './use-cases/do-login.use-case';
import { AuthRepository } from './auth.repository';
import { JwtStrategy } from './jwt-strategy';

export const AuthProviders: Provider[] = [
	CreateUserUseCase,
	DoLoginUserUseCase,
	AuthRepository,
	JwtStrategy,
];
