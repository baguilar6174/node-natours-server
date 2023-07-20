import { ApiFeatures } from '../../../../core/types';
import { CreateUserDTO, User } from '../../domain/entities/user.entity';
import { UserUseCase } from '../../domain/ports/inputs/user.usecase';

export class UserService implements UserUseCase {
	private userUseCase: UserUseCase;

	constructor(userUseCase: UserUseCase) {
		this.userUseCase = userUseCase;
	}

	async update(id: string, data: Partial<Omit<User, '_id'>>): Promise<User | null> {
		const result = await this.userUseCase.update(id, data);
		return result;
	}

	async deleteOne(id: string): Promise<User | null> {
		const result = await this.userUseCase.deleteOne(id);
		return result;
	}

	async getAll(features: ApiFeatures): Promise<User[]> {
		const result = await this.userUseCase.getAll(features);
		return result;
	}

	async getOne(id: string): Promise<User | null> {
		const result = await this.userUseCase.getOne(id);
		return result;
	}

	async create(user: CreateUserDTO): Promise<User> {
		const result = await this.userUseCase.create(user);
		return result;
	}
}
