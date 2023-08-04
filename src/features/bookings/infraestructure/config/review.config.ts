import { BookingService, CreateBookingUseCaseImpl, GetBookingsUseCaseImpl } from '../../application';
import { BookingRepositoryPort } from '../../domain';
import BookingController from '../controllers/booking.controller';
import { MongoBookingRepository } from '../repositories';

const getService = (repositoryPort: BookingRepositoryPort): BookingService => {
	return new BookingService(new CreateBookingUseCaseImpl(repositoryPort), new GetBookingsUseCaseImpl(repositoryPort));
};

export const bookingsController = BookingController(getService(new MongoBookingRepository()));
