import {
	BadRequestException,
	Inject,
	Injectable,
	Logger,
} from '@nestjs/common';

// REPOSITORIES
import { AuthRepository } from '../auth.repository';

// DTOs
import { DoLoginDTO } from '../dtos/input/do-login.dto';

// ENUMS
import { ConstantsEnum } from '@/common/consts.enum';

// HELPERS
import { HashHelper } from '@/common/helpers/hash.helper';
import { JwtHelper } from '@/common/helpers/jwt.helper';

@Injectable()
export class DoLoginUserUseCase {
	private readonly logger: Logger = new Logger(DoLoginUserUseCase.name);

	@Inject(AuthRepository)
	private readonly repository: AuthRepository;
	@Inject(ConstantsEnum.HASH_HELPER)
	private readonly hashHelper: HashHelper;
	@Inject(ConstantsEnum.JWT_HELPER)
	private readonly jwtHelper: JwtHelper;

	public async execute(payload: DoLoginDTO): Promise<string> {
		this.logger.log(
			`Executing... payload: ${JSON.stringify(payload, null, 4)}`,
		);

		const user = await this.repository.findByEmail(payload.email);
		if (!user) {
			throw new BadRequestException('Invalid credentials');
		}

		if (!(await this.hashHelper.compare(payload.password, user.password))) {
			throw new BadRequestException('Invalid credentials');
		}

		return this.jwtHelper.generateToken({ id: user.id });
	}
}
