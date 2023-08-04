# 8

## infraestructure/controllers

We are going to implement the controller of our API Rest, this implementation will change depending on the technology you use. In this case the controller will allow me to define the different HTTP (GET, POST, PUT, PATCH, DELETE, etc) methods and relate them to our service (application layer).

**For example:**

```typescript
// your imports here

export default function TourController(service: TourService): Router {
	const router = Router();

	router.post(
		'/',
    <middlewares-here>,
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				const { body } = req;
				const tour = await service.create(body);
				res.statusCode = HttpCode.OK;
				res.json({ status: 'success', data: tour });
			} catch (err) {
				next(err);
			}
		}
	);

	...

	return router;
}

```
