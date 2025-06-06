import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ConstantsEnum } from './consts.enum';

import { HashHelper } from './helpers/hash.helper';
import { JwtHelper } from './helpers/jwt.helper';
import { JwtGuard } from './guards/jwt.guard';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

export const CommonProviders: Provider[] = [
	{
		provide: ConstantsEnum.HASH_HELPER,
		useClass: HashHelper,
	},
	{
		provide: ConstantsEnum.JWT_HELPER,
		useClass: JwtHelper,
	},
	{
		provide: ConstantsEnum.AUTH_GUARD,
		useClass: JwtGuard,
	},
	JwtService,
	AllExceptionsFilter,
	LoggingInterceptor,
	ResponseInterceptor,
];
