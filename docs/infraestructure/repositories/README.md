# 7

## infraestructure/repositories

We are going to create an implementation of the repository pattern. This repository is the one that will be in charge of connecting our data models with data sources such as databases. A repository module manages data operations and allows the use of multiple backends. In a typical real-world application, the repository implements the logic for deciding whether to fetch data from a network or to use cached results in a local database. With a repository, you can change implementation details, such as migrating to a different persistence library, without affecting calling code such as view models. This also helps make the code modular and testable. You can easily mock the repository and test the rest of the code.

**For example (Local repository):**

```typescript
// your imports here

export class LocalTourRepository implements TourRepositoryPort {

  async create(data: CreateTourDTO) {
		...
	}

  async delete(id: string): Promise<Tour | null> {
		...
	}

	async update(id: string, data: UpdateTourDTO) {
		...
	}

	async getOne(id: string): Promise<Tour | null> {
		...
	}

	async getAll(): Promise<Tour[]> {
		...
	}
}

```
