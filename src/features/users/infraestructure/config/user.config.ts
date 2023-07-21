import { UserService } from '../../application/services/user.service';
import {
	CreateUserUseCaseImpl,
	DeleteUserUseCaseImpl,
	GetUsersUseCaseImpl,
	UpdateUserUseCaseImpl
} from '../../application/usecases';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repository.port';
import UserController from '../controllers/user.controller';
import { LocalUserRepository } from '../repositories/user.repository.local';

const getService = (repositoryPort: UserRepositoryPort): UserService => {
	return new UserService(
		new CreateUserUseCaseImpl(repositoryPort),
		new DeleteUserUseCaseImpl(repositoryPort),
		new GetUsersUseCaseImpl(repositoryPort),
		new UpdateUserUseCaseImpl(repositoryPort)
	);
};

export const userController = UserController(getService(new LocalUserRepository()));
