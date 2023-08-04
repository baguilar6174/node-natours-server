# 9

## infraestructure/config

This implementation is personal, I have decided to call it config because it allows us to relate all our layers and create the instances of the classes we have created before.

The result will be a controller that we can easily use in the definition of routes of our express server (`app.route.ts`).

**For example:**

```typescript
// your imports here

const getService = (repositoryPort: TourRepositoryPort): TourService => {
	return new TourService(
		new CreateTourUseCaseImpl(repositoryPort),
    ...
	);
};

export const toursController = TourController(getService(new MongoTourRepository()));
```
