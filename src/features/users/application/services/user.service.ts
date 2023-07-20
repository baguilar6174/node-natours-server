import { ApiFeatures } from '../../../../core/types';
import { CreateUserDTO, User } from '../../domain/entities/user.entity';
import {
	CreateUserUseCase,
	DeleteUserUseCase,
	GetAllUsersUseCase,
	GetOneUserUseCase,
	UpdateUserUseCase
} from '../../domain/ports/inputs';

export class UserService
	implements CreateUserUseCase, DeleteUserUseCase, GetAllUsersUseCase, GetOneUserUseCase, UpdateUserUseCase
{
	constructor(
		private createUserUseCase: CreateUserUseCase,
		private deleteUserUseCase: DeleteUserUseCase,
		private getAllUsersUseCase: GetAllUsersUseCase,
		private getOneUserUseCase: GetOneUserUseCase,
		private updateUserUseCase: UpdateUserUseCase
	) {
		this.createUserUseCase = createUserUseCase;
		this.deleteUserUseCase = deleteUserUseCase;
		this.getAllUsersUseCase = getAllUsersUseCase;
		this.getOneUserUseCase = getOneUserUseCase;
		this.updateUserUseCase = updateUserUseCase;
	}

	async update(id: string, data: Partial<Omit<User, '_id'>>): Promise<User | null> {
		const result = await this.updateUserUseCase.update(id, data);
		return result;
	}

	async deleteOne(id: string): Promise<User | null> {
		const result = await this.deleteUserUseCase.deleteOne(id);
		return result;
	}

	async getAll(features: ApiFeatures): Promise<User[]> {
		const result = await this.getAllUsersUseCase.getAll(features);
		return result;
	}

	async getOne(id: string): Promise<User | null> {
		const result = await this.getOneUserUseCase.getOne(id);
		return result;
	}

	async create(user: CreateUserDTO): Promise<User> {
		const result = await this.createUserUseCase.create(user);
		return result;
	}
}
