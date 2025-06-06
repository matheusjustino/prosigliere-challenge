import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtHelper {
	private readonly logger: Logger = new Logger(JwtHelper.name);

	@Inject(JwtService)
	private readonly jwtService: JwtService;

	public generateToken(payload: { id: string }): string {
		this.logger.log(`Generating JWT token...`);

		const tokenPayload = {
			id: payload.id,
		};

		return this.jwtService.sign(tokenPayload, {
			secret: process.env.JWT_SECRET,
			expiresIn: '12h',
		});
	}
}
