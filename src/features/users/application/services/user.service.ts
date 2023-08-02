import { ApiFeatures } from '../../../../core/types';
import { User } from '../../domain/entities';
import { GetUsersUseCase } from '../../domain/ports/inputs';

export class UserService implements GetUsersUseCase {
	constructor(private getUsersUseCase: GetUsersUseCase) {}

	async getAll(features: ApiFeatures): Promise<User[]> {
		const result = await this.getUsersUseCase.getAll(features);
		return result;
	}

	async getOne(id: string): Promise<User | null> {
		const result = await this.getUsersUseCase.getOne(id);
		return result;
	}
}
