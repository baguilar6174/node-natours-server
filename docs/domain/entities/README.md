# 1

## domain/entities

In this folder you must create the domain entities of your application. These must be defined as interfaces that represent contracts.

**For example:**

```typescript

export interface Tour {
	_id: string;
	name: string;
	slug?: string;
	duration: number;
	price: number;
	summary: string;
	description: string;
	...
}
```
