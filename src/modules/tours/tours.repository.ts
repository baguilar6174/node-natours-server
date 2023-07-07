import { Tour } from './interfaces/Tour';
import ToursData from '../../dev-data/data/tours-simple.json';
import { CreateTourDTO, UpdateTourDto } from './dto';
import path from 'path';
import fs from 'fs';

const getAll = (): Tour[] => {
	const tours = ToursData;
	return tours;
};

const getById = (id: number): Tour | undefined => {
	const tour = ToursData.find((tour): boolean => tour.id === Number(id));
	return tour;
};

const create = (payload: CreateTourDTO): Promise<Tour> => {
	const id = ToursData[ToursData.length - 1].id + 1;
	const tour = Object.assign({ id }, payload);
	ToursData.push(tour);
	const dir = path.join(__dirname, '../../', 'dev-data/data/tours-simple.json');
	return new Promise<Tour>((resolve, reject) => {
		fs.writeFile(dir, JSON.stringify(ToursData), (error): void => {
			if (error) {
				reject(error);
				return;
			}
			resolve(tour);
		});
	});
};

const update = (id: number, payload: UpdateTourDto) => {
	return { id, ...payload };
};

const deleteById = (id: number) => {
	return id;
};

export default { getAll, getById, create, update, deleteById };
