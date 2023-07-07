import { Tour } from './interfaces/Tour';
import toursRepository from './tours.repository';
import { CreateTourDTO, UpdateTourDto } from './dto';

const getAll = (): Tour[] => {
	const tours = toursRepository.getAll();
	return tours;
};

const getById = (id: number): Tour | undefined => {
	const tour = toursRepository.getById(id);
	return tour;
};

const create = (payload: CreateTourDTO): Promise<Tour> => {
	const tour = toursRepository.create(payload);
	return tour;
};

const update = (id: number, payload: UpdateTourDto) => {
	const tour = toursRepository.update(id, payload);
	return tour;
};

const deleteById = (id: number) => {
	const tourId = toursRepository.deleteById(id);
	return tourId;
};

export default { getAll, getById, create, update, deleteById };
