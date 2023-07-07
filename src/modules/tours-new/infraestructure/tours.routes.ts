import { Request, Response, Router } from 'express';
import { GetAllToursUseCase } from '../domain/interfaces/use-cases';

export default function ToursRouter(getAllToursUseCase: GetAllToursUseCase) {
	const router = Router();

	router.get('/', async (_: Request, res: Response) => {
		try {
			const contacts = await getAllToursUseCase.execute();
			res.send(contacts);
		} catch (err) {
			res.status(500).send({ message: 'Error fetching data' });
		}
	});

	return router;
}
