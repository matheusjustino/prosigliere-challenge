import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

// ENUMS
import { ConstantsEnum } from '@/common/consts.enum';

// REPOSITORIES
import { AuthRepository } from '@/modules/auth/auth.repository';

// USE-CASES
import { DoLoginUserUseCase } from '@/modules/auth/use-cases/do-login.use-case';

const dataMock = {
	payload: {
		email: 'matheusz_7@hotmail.com',
		password: '123',
	},
	user: {
		id: 'e8ef39a6-3526-4246-a5f9-c61f2953e473',
		email: 'matheusz_7@hotmail.com',
		password: 'hash',
		createdAt: '2025-06-06T05:27:46.574Z',
		updatedAt: '2025-06-06T05:27:46.574Z',
	},
	loginResponse: 'jwt-token',
};

const providersMock = {
	authRepository: {
		findByEmail: jest.fn(),
	},
	hashHelper: {
		compare: jest.fn(),
	},
	jwtHelper: {
		generateToken: jest.fn(),
	},
};

describe('DoLoginUseCase', () => {
	let useCase: DoLoginUserUseCase;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: AuthRepository,
					useValue: providersMock.authRepository,
				},
				{
					provide: ConstantsEnum.HASH_HELPER,
					useValue: providersMock.hashHelper,
				},
				{
					provide: ConstantsEnum.JWT_HELPER,
					useValue: providersMock.jwtHelper,
				},
				DoLoginUserUseCase,
			],
		}).compile();

		useCase = module.get<DoLoginUserUseCase>(DoLoginUserUseCase);
	});

	test('should be defined', () => {
		expect(useCase).toBeDefined();
	});

	test('should generate a jwt token', async () => {
		providersMock.authRepository.findByEmail.mockResolvedValueOnce(
			dataMock.user,
		);
		providersMock.hashHelper.compare.mockResolvedValueOnce(true);
		providersMock.jwtHelper.generateToken.mockResolvedValueOnce(
			dataMock.loginResponse,
		);

		const token = await useCase.execute(dataMock.payload);

		expect(token).toBe(dataMock.loginResponse);
	});

	test('should throw a error while finding the user', async () => {
		providersMock.authRepository.findByEmail.mockResolvedValueOnce(null);

		await expect(useCase.execute(dataMock.payload)).rejects.toThrow(
			new BadRequestException('Invalid credentials'),
		);
	});

	test('should throw a error while comparing passwords', async () => {
		providersMock.authRepository.findByEmail.mockResolvedValueOnce(
			dataMock.user,
		);
		providersMock.hashHelper.compare.mockResolvedValueOnce(false);

		await expect(useCase.execute(dataMock.payload)).rejects.toThrow(
			new BadRequestException('Invalid credentials'),
		);
	});
});
