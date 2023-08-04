# 5

## application/services

The service is a class that implements all our use cases and provides access from the infrastructure layer.

**For example:**

```typescript
// your imports here

export class TourService implements CreateTourUseCase, ... {
	constructor(
		private createTourUseCase: CreateTourUseCase,
    ...
	) {}

	async create(data: CreateTourDTO): Promise<Tour> {
		const result = await this.createTourUseCase.create(data);
		return result;
	}
	...
}
```
