import { CreateTourDTO, Tour } from '../../domain/entities/tour.entity';
import { CreateTourUseCase } from '../../domain/ports/inputs';
import { TourRepositoryPort } from '../../domain/ports/outputs/tour.repository.port';

export class CreateTourUseCaseImpl implements CreateTourUseCase {
	constructor(private repositoryPort: TourRepositoryPort) {}

	async create(data: CreateTourDTO): Promise<Tour> {
		const result = await this.repositoryPort.create(data);
		return result;
	}
}
