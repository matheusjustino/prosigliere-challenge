import {
	BadRequestException,
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';

// ENUMS
import { ConstantsEnum } from '@/common/consts.enum';

// HELPERS
import { HashHelper } from '@/common/helpers/hash.helper';

// REPOSITORIES
import { AuthRepository } from '../auth.repository';

// DTOs
import { CreateUserDTO } from '../dtos/input/create-user.dto';
import { UserDTO } from '../dtos/output/user.dto';

@Injectable()
export class CreateUserUseCase {
	private readonly logger: Logger = new Logger(CreateUserUseCase.name);

	@Inject(AuthRepository)
	private readonly repository: AuthRepository;
	@Inject(ConstantsEnum.HASH_HELPER)
	private readonly hashHelper: HashHelper;

	public async execute(payload: CreateUserDTO): Promise<UserDTO> {
		this.logger.log(
			`Executing... payload: ${JSON.stringify(payload, null, 4)}`,
		);

		try {
			payload.password = await this.hashHelper.hash(payload.password);

			const newUser = await this.repository.create(payload);
			return new UserDTO(newUser);
		} catch (e) {
			if (e?.code === 'P2002') {
				throw new BadRequestException(
					'A new user cannot be created with this email',
				);
			}

			throw new InternalServerErrorException('Internal server error');
		}
	}
}
