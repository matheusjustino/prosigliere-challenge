import { Test, TestingModule } from '@nestjs/testing';

// REPOSITORIES
import { PostCommentRepository } from '@/modules/post-comment/post-comment.repository';

// USE-CASES
import { CreatePostCommentUseCase } from '@/modules/post-comment/use-cases/create-post-comment.use-case';

const dataMock = {
	ownerId: 'e8ef39a6-3526-4246-a5f9-c61f2953e473',
	payload: {
		blogPostId: '48412063-fc9d-42ad-8b66-e1f40c14e872',
		content: 'comentario 2',
	},
	createdPostComment: {
		id: 'a352155f-4ab6-4a14-a87c-c1ebe6f0b35c',
		content: 'comentario 2',
		ownerId: 'e8ef39a6-3526-4246-a5f9-c61f2953e473',
		blogPostId: '48412063-fc9d-42ad-8b66-e1f40c14e872',
		createdAt: '2025-06-06T05:29:39.704Z',
		updatedAt: '2025-06-06T05:29:39.704Z',
	},
};

const providersMock = {
	postCommentRepository: {
		create: jest.fn(),
	},
};

describe('CreatePostCommentUseCase', () => {
	let useCase: CreatePostCommentUseCase;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: PostCommentRepository,
					useValue: providersMock.postCommentRepository,
				},
				CreatePostCommentUseCase,
			],
		}).compile();

		useCase = module.get<CreatePostCommentUseCase>(
			CreatePostCommentUseCase,
		);
	});

	test('should be defined', () => {
		expect(useCase).toBeDefined();
	});

	test('should create a new comment', async () => {
		providersMock.postCommentRepository.create.mockResolvedValueOnce(
			dataMock.createdPostComment,
		);

		const comment = await useCase.execute(
			dataMock.ownerId,
			dataMock.payload,
		);

		expect(comment.id).toBe(dataMock.createdPostComment.id);
		expect(comment.ownerId).toBe(dataMock.ownerId);
	});
});
