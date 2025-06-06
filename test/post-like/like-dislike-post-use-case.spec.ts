import { Test, TestingModule } from '@nestjs/testing';

import { PostLikeRepository } from '@/modules/post-like/post-like.repository';
import { LikeDislikePostUseCase } from '@/modules/post-like/use-cases/like-dislike-post.use-case';

const dataMock = {
	ownerId: 'e8ef39a6-3526-4246-a5f9-c61f2953e473',
	payload: {
		blogPostId: '48412063-fc9d-42ad-8b66-e1f40c14e872',
	},
	createdLikePost: {
		id: '81dbbc7e-fda3-435b-837f-22daa6180852',
		ownerId: 'e8ef39a6-3526-4246-a5f9-c61f2953e473',
		blogPostId: '48412063-fc9d-42ad-8b66-e1f40c14e872',
		createdAt: '2025-06-06T05:29:44.450Z',
		updatedAt: '2025-06-06T05:29:44.450Z',
	},
};

const providersMock = {
	postLikeRepository: {
		likeDislike: jest.fn(),
	},
};

describe('CreateBlogPostUseCase', () => {
	let useCase: LikeDislikePostUseCase;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: PostLikeRepository,
					useValue: providersMock.postLikeRepository,
				},
				LikeDislikePostUseCase,
			],
		}).compile();

		useCase = module.get<LikeDislikePostUseCase>(LikeDislikePostUseCase);
	});

	test('should be defined', () => {
		expect(useCase).toBeDefined();
	});

	test('should create a like for a post', async () => {
		providersMock.postLikeRepository.likeDislike.mockResolvedValueOnce(
			dataMock.createdLikePost,
		);

		const like = await useCase.execute(dataMock.ownerId, dataMock.payload);

		expect(like.id).toBe(dataMock.createdLikePost.id);
		expect(like.ownerId).toBe(dataMock.ownerId);
	});
});
