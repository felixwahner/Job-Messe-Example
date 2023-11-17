import { Coordinate } from './coordinate';

export interface Exhibitor {
	id: string;
	name: string;
	coordinates: Coordinate;
	jobTypes: Array<string>;
	isFavorite: boolean;
	text: string;
	logoUrl: string;
}
