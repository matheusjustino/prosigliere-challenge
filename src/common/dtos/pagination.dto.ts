import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PaginationDTO {
	@ApiProperty({ type: Number, description: 'Items per page' })
	@IsNumber()
	@Min(0)
	@Transform(({ value }) => Number(value))
	public perPage: number;

	@ApiProperty({ type: Number, description: 'Current page' })
	@Min(1)
	@Transform(({ value }) => Number(value))
	public page: number;
}
