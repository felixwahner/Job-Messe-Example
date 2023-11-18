import {
	Injectable,
	Signal,
	WritableSignal,
	computed,
	signal,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FavoritesService } from './favorites.service';
import { Exhibitor } from '../models/exhibitor';
import { map, take } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable({
	providedIn: 'root',
})
export class ExhibitorsService {
	constructor(
		private http: HttpClient,
		private favoritesService: FavoritesService,
		private location: Location
	) {
		this.getJson()
			.pipe(take(1))
			.subscribe((data) => {
				this.exhibitors.set(
					data.map((exhibitor) => {
						exhibitor.logoUrl = this.location
							.prepareExternalUrl(exhibitor.logoUrl)
							.replace('#', '');
						return exhibitor;
					})
				);
			});
	}

	private exhibitors: WritableSignal<Array<Exhibitor>> = signal([]);
	public activeFilters: WritableSignal<Array<string>> = signal([]);
	public allFilters: Signal<Array<string>> = computed(() =>
		this.exhibitors().reduce((accumulator, currentValue) => {
			const newFilters = currentValue.jobTypes.filter((jobType) => {
				return accumulator.includes(jobType) === false;
			});
			return [...accumulator, ...newFilters];
		}, [] as Array<string>)
	);
	public get: Signal<Array<Exhibitor>> = computed(() => {
		return this.exhibitors()
			.map((exhibitor) =>
				this.favoritesService.favorites().includes(exhibitor.id)
					? { ...exhibitor, isFavorite: true }
					: exhibitor
			)
			.filter((exhibitor) => {
				if (!this.activeFilters().length) return exhibitor;
				return this.activeFilters().some((filter) => {
					if (filter === 'favorites') return exhibitor.isFavorite;
					return exhibitor.jobTypes.includes(filter);
				});
			});
	});

	public addFilter(types: Array<string>) {
		this.activeFilters.set([...types]);
	}
	public removeFilter(type: string) {
		this.activeFilters.update((value) => [
			...value.filter((value) => value !== type),
		]);
	}
	public removeAllFilters() {
		this.activeFilters.set([]);
	}

	private getJson(): Observable<Array<Exhibitor>> {
		const url = this.location
			.prepareExternalUrl('assets/data/exhibitors.json')
			.replace('#', '');
		return this.http.get<Array<Exhibitor>>(url);
	}
}
