import { UserService } from '../../application/services/user.service';
import { UserUseCaseImpl } from '../../application/usecases/user.usecase.impl';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repository.port';
import UserController from '../controllers/user.controller';
import { LocalUserRepository } from '../repositories/user.repository.local';

const userService = (userRepositoryPort: UserRepositoryPort): UserService => {
	const userUseCase = new UserUseCaseImpl(userRepositoryPort);
	return new UserService(userUseCase);
};

const userRepositoryPort = new LocalUserRepository();

export const userController = UserController(userService(userRepositoryPort));
