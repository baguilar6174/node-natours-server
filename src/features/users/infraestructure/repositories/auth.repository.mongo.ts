import mongoose from 'mongoose';
import { DEV_ENVIRONMENT, EMPTY_STRING, ONE, ZERO } from '../../../../core/constants';
import { UserModel } from '../models/user.model';
import { CreateUserDTO, User } from '../../domain/entities/user.entity';
import { AuthRepositoryPort } from '../../domain/ports/outputs';

export class MongoAuthRepository implements AuthRepositoryPort {
	async signup(data: CreateUserDTO): Promise<User> {
		await connect();
		const tour = await UserModel.create(data);
		await disconnect();
		return tour;
	}
}

/** 0 disconnected | 1 connected | 2 connecting | 3 disconnecting */

const mongoConnection = { isConnected: 0 };

const connect = async (): Promise<void> => {
	if (mongoConnection.isConnected) return;
	if (mongoose.connections.length > ZERO) {
		mongoConnection.isConnected = mongoose.connections[ZERO].readyState;
		if (mongoConnection.isConnected === ONE) return;
		await mongoose.disconnect();
	}
	await mongoose.connect(process.env.MONGO_URL || EMPTY_STRING);
	mongoConnection.isConnected = 1;
	console.log('Connected with MongoBD', process.env.MONGO_URL);
};

const disconnect = async (): Promise<void> => {
	if (process.env.NODE_ENV === DEV_ENVIRONMENT) return;
	if (mongoConnection.isConnected === ZERO) return;
	await mongoose.disconnect();
	mongoConnection.isConnected = 0;
	console.log('Diconnected from MongoBD');
};
