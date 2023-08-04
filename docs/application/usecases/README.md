# 4

## application/usecases

In this folder you must create the implementations of each of the use cases that you have defined in the `domain/ports/inputs` layer. Remember that in this implementation it is necessary to have a constructor that receives an instance of the output ports `domain/ports/outputs`

**For example:**

```typescript
// your imports here

export class CreateTourUseCaseImpl implements CreateTourUseCase {
	constructor(private repositoryPort: TourRepositoryPort) {}

	async create(data: CreateTourDTO): Promise<Tour> {
		const result = await this.repositoryPort.create(data);
		return result;
	}
}
```
