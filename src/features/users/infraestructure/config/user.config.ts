import { UserService } from '../../application/services/user.service';
import {
	CreateUserUseCaseImpl,
	DeleteUserUseCaseImpl,
	GetAllUsersUseCaseImpl,
	GetOneUserUseCaseImpl,
	UpdateUserUseCaseImpl
} from '../../application/usecases';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repository.port';
import UserController from '../controllers/user.controller';
import { LocalUserRepository } from '../repositories/user.repository.local';

const userService = (userRepositoryPort: UserRepositoryPort): UserService => {
	return new UserService(
		new CreateUserUseCaseImpl(userRepositoryPort),
		new DeleteUserUseCaseImpl(userRepositoryPort),
		new GetAllUsersUseCaseImpl(userRepositoryPort),
		new GetOneUserUseCaseImpl(userRepositoryPort),
		new UpdateUserUseCaseImpl(userRepositoryPort)
	);
};

const userRepositoryPort = new LocalUserRepository();

export const userController = UserController(userService(userRepositoryPort));
