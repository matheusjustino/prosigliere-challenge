import { Inject, Injectable } from '@nestjs/common';

// ENUMS
import { ConstantsEnum } from '@/common/consts.enum';

// INTERFACES
import { DatabaseConnectionInterface } from '@/infrastructure/database/database-connection.interface';

// ENTITIES
import { BlogPostEntity } from './entities/blog-post.entity';

// DTOs
import { PaginationDTO } from '@/common/dtos/pagination.dto';
import { CreatePostParamsDTO } from './dtos/input/create-post-params.dto';

@Injectable()
export class BlogPostRepository {
	@Inject(ConstantsEnum.DATABASE)
	private readonly database: DatabaseConnectionInterface;

	public async create(
		ownerId: string,
		payload: CreatePostParamsDTO,
	): Promise<BlogPostEntity> {
		return this.database.blogPost.create({
			data: {
				owner: {
					connect: {
						id: ownerId,
					},
				},
				...payload,
			},
		});
	}

	public async find(query: PaginationDTO): Promise<BlogPostEntity[]> {
		return this.database.blogPost.findMany({
			take: query?.perPage ?? 10,
			skip: ((query?.page || 1) - 1) * (query?.perPage ?? 10),
		});
	}

	public async findById(postId: string): Promise<BlogPostEntity> {
		return this.database.blogPost.findUnique({
			where: {
				id: postId,
			},
			select: {
				id: true,
				title: true,
				content: true,
				ownerId: true,
				createdAt: true,
				updatedAt: true,
				_count: {
					select: {
						comments: true,
						postLikes: true,
					},
				},
				comments: {
					select: {
						id: true,
						ownerId: true,
						blogPostId: true,
						content: true,
						owner: {
							select: {
								id: true,
								email: true,
							},
						},
						createdAt: true,
						updatedAt: true,
					},
				},
				postLikes: {
					select: {
						id: true,
						ownerId: true,
						blogPostId: true,
						createdAt: true,
						updatedAt: true,
					},
				},
			},
		});
	}
}
