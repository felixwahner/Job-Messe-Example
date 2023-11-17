import { ExhibitorsService } from './../shared/services/exhibitors.service';
import { Component, Input, OnInit } from '@angular/core';
import { Exhibitor } from '../shared/models/exhibitor';
import { FavoritesService } from '../shared/services/favorites.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {
	MatCheckboxChange,
	MatCheckboxModule,
} from '@angular/material/checkbox';
import { Observable, pairwise, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'exhibitor-filter',
	templateUrl: './exhibitor-filter.component.html',
	styleUrl: './exhibitor-filter.component.scss',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatCheckboxModule,
		CommonModule,
	],
})
export class ExhibitorFilterComponent implements OnInit {
	constructor(
		private favoritesService: FavoritesService,
		public exhibitorsService: ExhibitorsService
	) {}

	public filtersControl: FormControl = new FormControl();
	public favoritesControl: FormControl = new FormControl();

	public filters$: Observable<Array<string>> =
		this.exhibitorsService.allFilters$;

	public ngOnInit(): void {
		this.filtersControl.valueChanges
			.pipe(startWith(this.filtersControl.value), pairwise())
			.subscribe(([old, value]) => {
				this.exhibitorsService.removeFilter(old);
				this.exhibitorsService.addFilter(value);
			});
		this.favoritesControl.valueChanges
			.pipe(startWith(this.favoritesControl.value))
			.subscribe((value) => {
				value
					? this.exhibitorsService.addFilter('favorites')
					: this.exhibitorsService.removeFilter('favorites');
			});
	}
}
