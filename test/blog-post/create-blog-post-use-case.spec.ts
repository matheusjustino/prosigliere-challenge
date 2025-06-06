import { Test, TestingModule } from '@nestjs/testing';

import { BlogPostRepository } from '@/modules/blog-post/blog-post.repository';
import { CreateBlogPostUseCase } from '@/modules/blog-post/use-cases/create-blog-post.use-case';

const dataMock = {
	ownerId: 'e8ef39a6-3526-4246-a5f9-c61f2953e473',
	payload: {
		title: 'Teste',
		content: 'conteudo',
	},
	createdBlogPost: {
		id: '48412063-fc9d-42ad-8b66-e1f40c14e872',
		title: 'Teste',
		content: 'conteudo',
		ownerId: 'e8ef39a6-3526-4246-a5f9-c61f2953e473',
		createdAt: '2025-06-06T05:28:53.214Z',
		updatedAt: '2025-06-06T05:28:53.214Z',
	},
};

const providersMock = {
	blogPostRepository: {
		create: jest.fn(),
	},
};

describe('CreateBlogPostUseCase', () => {
	let useCase: CreateBlogPostUseCase;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: BlogPostRepository,
					useValue: providersMock.blogPostRepository,
				},
				CreateBlogPostUseCase,
			],
		}).compile();

		useCase = module.get<CreateBlogPostUseCase>(CreateBlogPostUseCase);
	});

	test('should be defined', () => {
		expect(useCase).toBeDefined();
	});

	test('should return a new blog post', async () => {
		providersMock.blogPostRepository.create.mockResolvedValueOnce(
			dataMock.createdBlogPost,
		);

		const blogPost = await useCase.execute(
			dataMock.ownerId,
			dataMock.payload,
		);

		expect(blogPost.id).toBe(dataMock.createdBlogPost.id);
		expect(blogPost.ownerId).toBe(dataMock.ownerId);
	});
});
