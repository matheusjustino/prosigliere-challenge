import { Injectable, Logger } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcryptjs';

@Injectable()
export class HashHelper {
	private readonly logger: Logger = new Logger(HashHelper.name);

	public async hash(data: string, salt = 12): Promise<string> {
		this.logger.log('Hashing data...');

		const generatedSalt = await genSalt(salt);
		return hash(data, generatedSalt);
	}

	public async compare(password: string, hash: string): Promise<boolean> {
		this.logger.log('Comparing hash and data...');
		return compare(password, hash);
	}
}
