import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FavoritesService } from './favorites.service';
import { Exhibitor } from '../models/exhibitor';
import { filter, map, take } from 'rxjs/operators';
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
				this.exhibitorsSrc.next(
					data.map((exhibitor) => {
						exhibitor.logoUrl = this.location.prepareExternalUrl(
							exhibitor.logoUrl
						);
						return exhibitor;
					})
				);
				this.allFiltersSrc.next(this.getAllFilters());
			});
	}
	private allFiltersSrc: BehaviorSubject<Array<string>> = new BehaviorSubject(
		[] as Array<string>
	);
	public allFilters$: Observable<Array<string>> =
		this.allFiltersSrc.asObservable();

	private activeFiltersSrc: BehaviorSubject<Array<string>> =
		new BehaviorSubject([] as Array<string>);
	public activeFilters$: Observable<Array<string>> =
		this.activeFiltersSrc.asObservable();

	private exhibitorsSrc: BehaviorSubject<Array<Exhibitor>> =
		new BehaviorSubject([] as Array<Exhibitor>);
	public exhibitors$: Observable<Array<Exhibitor>> =
		this.exhibitorsSrc.asObservable();

	// @TODO: Possibly allow multiple filters to be active at the same time.
	public addFilter(type: string) {
		this.activeFiltersSrc.next([type]);
	}
	public removeFilter(type: string) {
		this.activeFiltersSrc.next([
			...this.activeFiltersSrc
				.getValue()
				.filter((value) => value !== type),
		]);
	}
	public removeAllFilters() {
		this.activeFiltersSrc.next([]);
	}

	public getAllFilters() {
		return this.exhibitorsSrc
			.getValue()
			.reduce((accumulator, currentValue) => {
				const newFilters = currentValue.jobTypes.filter((jobType) => {
					return accumulator.includes(jobType) === false;
				});
				return [...accumulator, ...newFilters];
			}, [] as Array<string>);
	}

	private getJson(): Observable<Array<Exhibitor>> {
		const url = this.location.prepareExternalUrl(
			'assets/data/exhibitors.json'
		);
		return this.http.get<Array<Exhibitor>>(url);
	}
	public get(): Observable<Array<Exhibitor>> {
		return combineLatest(
			this.exhibitors$,
			this.favoritesService.currentFavorites$,
			this.activeFilters$
		).pipe(
			map(([exhibitors, favorites, filters]) =>
				exhibitors
					.map((exhibitor) =>
						(favorites as Array<string>).includes(exhibitor.id)
							? { ...exhibitor, isFavorite: true }
							: exhibitor
					)
					.filter((exhibitor) => {
						if (!filters.length) return exhibitor;
						return filters.every((filter) => {
							if (filter === 'favorites')
								return exhibitor.isFavorite;
							return exhibitor.jobTypes.includes(filter);
						});
					})
			)
		);
	}
}
