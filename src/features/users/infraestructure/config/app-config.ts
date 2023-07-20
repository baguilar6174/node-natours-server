import { UserService } from '../../application/services/user.service';
import { CreateUserUseCaseImpl } from '../../application/usecases/create-usecaseImpl';
import { DeleteUserUseCaseImpl } from '../../application/usecases/delete-usecaseImpl';
import { GetAllUsersUseCaseImpl } from '../../application/usecases/getAll-usecaseImpl';
import { GetOneUserUseCaseImpl } from '../../application/usecases/getOne-usecaseImpl';
import { UpdateUserUseCaseImpl } from '../../application/usecases/update-usecaseImpl';
import { UserRepositoryPort } from '../../domain/ports/outputs/user.repositoryPort';
import UserController from '../controllers/user-controller';
import { LocalUserRepositoryAdapter } from '../repositories/LocalUserRepositoryAdapter';

const userService = (userRepositoryPort: UserRepositoryPort): UserService => {
	return new UserService(
		new CreateUserUseCaseImpl(userRepositoryPort),
		new DeleteUserUseCaseImpl(userRepositoryPort),
		new GetAllUsersUseCaseImpl(userRepositoryPort),
		new GetOneUserUseCaseImpl(userRepositoryPort),
		new UpdateUserUseCaseImpl(userRepositoryPort)
	);
};

export const userController = UserController(userService(new LocalUserRepositoryAdapter()));
