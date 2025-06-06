import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthProviders } from './auth.providers';

@Module({
	controllers: [AuthController],
	providers: AuthProviders,
})
export class AuthModule {}
