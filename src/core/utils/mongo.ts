import { Model, connect, connections, disconnect } from 'mongoose';
import { DEV_ENVIRONMENT, EMPTY_STRING, HttpCode, ONE, ONE_HUNDRED, ZERO } from '../constants';
import EnvConfig from '../env.config';
import { ApiFeatures } from '../types';
import { parseQuery } from './parse-query';
import { AppError } from '../error/app-error';

/** 0 disconnected | 1 connected | 2 connecting | 3 disconnecting */

const mongoConnection = { isConnected: 0 };

export const connectMongoDB = async (): Promise<void> => {
	if (mongoConnection.isConnected) return;
	if (connections.length > ZERO) {
		mongoConnection.isConnected = connections[ZERO].readyState;
		if (mongoConnection.isConnected === ONE) return;
		await disconnect();
	}
	await connect(EnvConfig.MONGO_URL || EMPTY_STRING);
	mongoConnection.isConnected = 1;
	console.log('Connected with MongoBD', EnvConfig.MONGO_URL);
};

export const disconnectMongoDB = async (): Promise<void> => {
	if (EnvConfig.NODE_ENV === DEV_ENVIRONMENT) return;
	if (mongoConnection.isConnected === ZERO) return;
	await disconnect();
	mongoConnection.isConnected = 0;
	console.log('Diconnected from MongoBD');
};

export const apiFeatures = async <T extends Document>(model: Model<T>, features: ApiFeatures) => {
	const { query = {}, pagination, sort, fields = EMPTY_STRING } = features;

	const filteringQuery = parseQuery(query);

	const page = Number(pagination?.page) || ONE;
	const limit = Number(pagination?.limit) || ONE_HUNDRED;
	const skip = (page - ONE) * limit;

	if (pagination?.page || pagination?.limit) {
		const numTours = await model.countDocuments();
		if (skip >= numTours)
			throw new AppError({
				message: 'This page does not exist',
				statusCode: HttpCode.BAD_REQUEST
			});
	}

	const result = await model
		.find({ ...filteringQuery })
		.sort(typeof sort === 'string' ? sort.split(',').join(EMPTY_STRING) : sort)
		.sort('-createdAt')
		.select(fields.split(',').join(EMPTY_STRING))
		.limit(limit)
		.skip(skip)
		.exec();

	return result;
};
