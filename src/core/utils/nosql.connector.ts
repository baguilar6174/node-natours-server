/** 0 disconnected | 1 connected | 2 connecting | 3 disconnecting */

import { connect, connections, disconnect } from 'mongoose';
import { DEV_ENVIRONMENT, EMPTY_STRING, ONE, ZERO } from '../constants';
import EnvConfig from '../env.config';

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
