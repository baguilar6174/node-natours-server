export interface SeedToursUseCase {
	seed(): Promise<string | void>;
}
