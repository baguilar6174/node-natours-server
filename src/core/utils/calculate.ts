import { DISTANCE_MULTIPLIER, EARTH_RADIOUS } from '../constants';

/**
 * Calculate earth radious with a distance and unit
 * @param distance
 * @param unit 'mi' | 'km'
 * @returns radious
 */
export const getEarthRadious = (distance: number, unit: string): number => {
	const radious = unit === 'mi' ? distance / EARTH_RADIOUS.MI : distance / EARTH_RADIOUS.KM;
	return radious;
};

export const getDistanceMultiplier = (unit: string): number => {
	return unit === 'mi' ? DISTANCE_MULTIPLIER.MI : DISTANCE_MULTIPLIER.KM;
};
