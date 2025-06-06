import { Test, TestingModule } from '@nestjs/testing';

import { BlogPostRepository } from '@/modules/blog-post/blog-post.repository';
import { ListBlogPostsUseCase } from '@/modules/blog-post/use-cases/list-blog-posts.use-case';

const dataMock = {
	query: {
		perPage: 10,
		page: 1,
	},
	blogPosts: [
		{
			id: '48412063-fc9d-42ad-8b66-e1f40c14e872',
			title: 'Teste',
			content: 'conteudo',
			ownerId: 'e8ef39a6-3526-4246-a5f9-c61f2953e473',
			createdAt: '2025-06-06T05:28:53.214Z',
			updatedAt: '2025-06-06T05:28:53.214Z',
		},
	],
};

const providersMock = {
	blogPostRepository: {
		find: jest.fn(),
	},
};

describe('CreateBlogPostUseCase', () => {
	let useCase: ListBlogPostsUseCase;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: BlogPostRepository,
					useValue: providersMock.blogPostRepository,
				},
				ListBlogPostsUseCase,
			],
		}).compile();

		useCase = module.get<ListBlogPostsUseCase>(ListBlogPostsUseCase);
	});

	test('should be defined', () => {
		expect(useCase).toBeDefined();
	});

	test('should return a new blog post', async () => {
		providersMock.blogPostRepository.find.mockResolvedValueOnce(
			dataMock.blogPosts,
		);

		const blogPost = await useCase.execute(dataMock.query);
		blogPost.map((post, idx) => {
			expect(post.id).toBe(dataMock.blogPosts[idx].id);
		});
	});
});
