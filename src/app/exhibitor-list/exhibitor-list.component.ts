import { Component, OnInit } from '@angular/core';
import { Exhibitor } from '../shared/models/exhibitor';
import { FavoritesService } from '../shared/services/favorites.service';
import { ExhibitorsService } from '../shared/services/exhibitors.service';
import { Observable, filter, map, switchMap } from 'rxjs';
import {
	IonContent,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonHeader,
	IonTitle,
	IonIcon,
	IonToolbar,
	IonImg,
	IonToast,
	IonButton,
	IonToggle,
	IonText,
} from '@ionic/angular/standalone';
import { AppHeaderComponent } from '../shared/components/app-header/app-header.component';

import { addIcons } from 'ionicons';
import { heartOutline, listOutline, heart, bugOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'exhibitor-list',
	templateUrl: './exhibitor-list.component.html',
	styleUrl: './exhibitor-list.component.scss',
	standalone: true,
	imports: [
		IonContent,
		IonList,
		IonLabel,
		IonItem,
		IonListHeader,
		IonHeader,
		IonTitle,
		IonIcon,
		IonToolbar,
		AppHeaderComponent,
		IonImg,
		IonToast,
		IonButton,
		IonToggle,
		IonText,
		CommonModule,
	],
})
export class ExhibitorListComponent implements OnInit {
	constructor(
		private favoritesService: FavoritesService,
		private exhibitorsService: ExhibitorsService
	) {
		addIcons({
			'heart-outline': heartOutline,
			heart: heart,
			'list-outline': listOutline,
			'bug-outline': bugOutline,
		});
	}

	public exhibitors$: Observable<Array<Exhibitor>> =
		this.exhibitorsService.get();

	public exhibitors: Array<Exhibitor> = [];

	public isFavoriteFilterActive: Observable<boolean> =
		this.exhibitorsService.activeFilters$.pipe(
			map(
				(filterNames) =>
					!!filterNames.filter(
						(filterName) => filterName === 'favorites'
					)
			)
		);

	public ngOnInit(): void {
		this.exhibitors$.subscribe(
			(exhibitors) => (this.exhibitors = exhibitors)
		);
	}

	public toggleFavorite(exhibitor: Exhibitor) {
		if (exhibitor.isFavorite) {
			this.favoritesService.removeFavorite(exhibitor.id);
		} else {
			this.favoritesService.addFavorite(exhibitor.id);
		}
	}
	public handleChange($event: any): void {
		if ($event.detail.checked) {
			this.exhibitorsService.addFilter(['favorites']);
		} else {
			this.exhibitorsService.removeFilter('favorites');
		}
	}
}
