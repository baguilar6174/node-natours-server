import { AuthService } from '../../application/services/auth.service';
import { UserService } from '../../application/services/user.service';
import {
	AuthUseCaseImpl,
	CreateUserUseCaseImpl,
	DeleteUserUseCaseImpl,
	GetUsersUseCaseImpl,
	UpdateUserUseCaseImpl
} from '../../application/usecases';
import { AuthRepositoryPort, UserRepositoryPort } from '../../domain/ports/outputs';
import { EmailServiceAdapter } from '../adapters/emailService.adapter';
import AuthController from '../controllers/auth.controller';
import UserController from '../controllers/user.controller';
import { MongoAuthRepository } from '../repositories/auth.repository.mongo';
import { MongoUserRepository } from '../repositories/user.repository.mongo';

const getUserService = (repositoryPort: UserRepositoryPort): UserService => {
	return new UserService(
		new CreateUserUseCaseImpl(repositoryPort),
		new DeleteUserUseCaseImpl(repositoryPort),
		new GetUsersUseCaseImpl(repositoryPort),
		new UpdateUserUseCaseImpl(repositoryPort)
	);
};

const getAuthService = (repositoryPort: AuthRepositoryPort): AuthService => {
	return new AuthService(new AuthUseCaseImpl(repositoryPort));
};

export const authController = AuthController(getAuthService(new MongoAuthRepository(new EmailServiceAdapter())));
export const userController = UserController(getUserService(new MongoUserRepository()));
