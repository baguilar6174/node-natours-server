import { Entities, HttpCode } from '../../../../core/constants';
import { ApiFeatures } from '../../../../core/types';
import { apiFeatures, connectMongoDB, disconnectMongoDB } from '../../../../core/utils';
import { AppError } from '../../../../core/error/app-error';
import { ReviewRepositoryPort } from '../../domain/ports';
import { CreateReviewDTO, Review, UpdateReviewDTO } from '../../domain/entities/review.entity';
import { ReviewModel } from '../models/review.model';

export class MongoReviewRepository implements ReviewRepositoryPort {
	async create(data: CreateReviewDTO): Promise<Review> {
		await connectMongoDB();
		// TODO: validate if tour exist before create review
		const result = await ReviewModel.create(data);
		await disconnectMongoDB();
		return result;
	}

	async delete(id: string): Promise<Review | null> {
		await connectMongoDB();
		const result = await ReviewModel.findByIdAndDelete(id);
		if (!result) {
			throw new AppError({
				message: `No ${Entities.REVIEW} with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		await disconnectMongoDB();
		return result;
	}

	async update(id: string, data: UpdateReviewDTO): Promise<Review | null> {
		await connectMongoDB();
		const result = await ReviewModel.findByIdAndUpdate(id, { ...data }, { runValidators: true, new: true });
		if (!result) {
			throw new AppError({
				message: `No ${Entities.REVIEW} with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		await disconnectMongoDB();
		return result;
	}

	async getAll(features: ApiFeatures): Promise<Review[]> {
		await connectMongoDB();
		const results = await apiFeatures(ReviewModel, features);
		await disconnectMongoDB();
		return results;
	}

	async getOne(id: string): Promise<Review | null> {
		await connectMongoDB();
		const result = await ReviewModel.findById(id);
		if (!result) {
			throw new AppError({
				message: `No ${Entities.REVIEW} with this ${id}`,
				statusCode: HttpCode.BAD_REQUEST
			});
		}
		await disconnectMongoDB();
		return result;
	}
}
