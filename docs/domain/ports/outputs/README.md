# 3

## domain/ports/outputs

In this folder you must create the definition of your repository expressed as an interface. The repository is the one that will interact with the database in the infrastructure layer.

**For example:**

```typescript
// your imports here

export interface TourRepositoryPort {
	create(data: CreateTourDTO): Promise<Tour>;
	delete(id: string): Promise<Tour | null>;
	update(id: string, data: UpdateTourDTO): Promise<Tour | null>;
	getAll(features: ApiFeatures): Promise<Tour[]>;
	getOne(id: string): Promise<Tour | null>;
	...
}
```
