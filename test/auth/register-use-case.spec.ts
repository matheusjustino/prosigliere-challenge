import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { ConstantsEnum } from '@/common/consts.enum';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { CreateUserUseCase } from '@/modules/auth/use-cases/create-user.use-case';

const dataMock = {
	payload: {
		email: 'matheusz_7@hotmail.com',
		password: '123',
	},
	createdUser: {
		id: 'e8ef39a6-3526-4246-a5f9-c61f2953e473',
		email: 'matheusz_7@hotmail.com',
		createdAt: '2025-06-06T05:27:46.574Z',
		updatedAt: '2025-06-06T05:27:46.574Z',
	},
};

const providersMock = {
	authRepository: {
		create: jest.fn(),
	},
	hashHelper: {
		hash: jest.fn(),
	},
};

describe('CreateUserUseCase', () => {
	let useCase: CreateUserUseCase;

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
				CreateUserUseCase,
			],
		}).compile();

		useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
	});

	test('should be defined', () => {
		expect(useCase).toBeDefined();
	});

	test('Should create a new user', async () => {
		providersMock.authRepository.create.mockResolvedValueOnce(
			dataMock.createdUser,
		);

		const newUser = await useCase.execute(dataMock.payload);

		expect(newUser.id).toBe(dataMock.createdUser.id);
	});

	test('Should throw an error while creating a user', async () => {
		providersMock.authRepository.create.mockRejectedValueOnce({
			code: 'P2002',
		});

		await expect(useCase.execute(dataMock.payload)).rejects.toThrow(
			new BadRequestException(
				'A new user cannot be created with this email',
			),
		);
	});
});
