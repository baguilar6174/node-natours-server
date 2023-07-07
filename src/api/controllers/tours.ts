import ToursData from '../.././dev-data/data/tours-simple.json';
import { Tour } from '../../db/models';
import { CreateTourDTO, UpdateTourDto } from '../dto';
import path from 'path';
import fs from 'fs';

export const getAll = (): Tour[] => {
	return ToursData;
};

export const getById = (id: number): Tour | undefined => {
	const tour = ToursData.find((tour): boolean => tour.id === Number(id));
	return tour;
};

export const create = (payload: CreateTourDTO): Promise<Tour> => {
	const id = ToursData[ToursData.length - 1].id + 1;
	const tour = Object.assign({ id }, payload);
	ToursData.push(tour);
	const dir = path.join(__dirname, '../../', 'dev-data/data/tours-simple.json');
	return new Promise<Tour>((resolve, reject) => {
		fs.writeFile(dir, JSON.stringify(ToursData), (error) => {
			if (error) {
				reject(error);
				return;
			}
			resolve(tour);
		});
	});
};

export const update = (id: number, payload: UpdateTourDto) => {
	return { id, ...payload };
};

export const deleteById = (id: number) => {
	return id;
};
