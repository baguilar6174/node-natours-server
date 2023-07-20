/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiFeatures } from '../../../../core/types';
import { CreateUserDTO, User } from '../../domain/models/user.model';
import { CreateUserUseCase } from '../../domain/ports/inputs/create-usecase';
import { DeleteUserUseCase } from '../../domain/ports/inputs/delete-usecase';
import { GetAllUsersUseCase } from '../../domain/ports/inputs/getAll-usecase';
import { GetOneUserUseCase } from '../../domain/ports/inputs/getOne-usecase';
import { UpdateUserUseCase } from '../../domain/ports/inputs/update-usecase';

export class UserService
	implements CreateUserUseCase, DeleteUserUseCase, GetAllUsersUseCase, GetOneUserUseCase, UpdateUserUseCase
{
	constructor(
		public createUserUseCase: CreateUserUseCase,
		public deleteUserUseCase: DeleteUserUseCase,
		public getAllUsersUseCase: GetAllUsersUseCase,
		public getOneUserUseCase: GetOneUserUseCase,
		public updateUserUseCase: UpdateUserUseCase
	) {}
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
