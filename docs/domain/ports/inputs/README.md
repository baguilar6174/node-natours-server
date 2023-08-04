# 2

## domain/ports/inputs

In this folder you must create your use cases expressed as interfaces. Each use case is usually created in a separate file, but you can group them all in a single file if you wish.

**For example:**

```typescript
// your imports here

export interface CreateTourUseCase {
	create(data: CreateTourDTO): Promise<Tour>;
}
```
