import { Exhibitor } from './../shared/models/exhibitor';
import { Component, OnInit, Signal } from '@angular/core';
import { FavoritesService } from '../shared/services/favorites.service';
import { ExhibitorsService } from '../shared/services/exhibitors.service';
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
	IonModal,
	ModalController,
} from '@ionic/angular/standalone';
import { AppHeaderComponent } from '../shared/components/app-header/app-header.component';
import { addIcons } from 'ionicons';
import { heartOutline, listOutline, heart, bugOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ExhibitorDetailsComponent } from './exhibitor-details/exhibitor-details.component';

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
		ExhibitorDetailsComponent,
	],
})
export class ExhibitorListComponent implements OnInit {
	constructor(
		private favoritesService: FavoritesService,
		private exhibitorsService: ExhibitorsService,
		private modalCtrl: ModalController
	) {
		addIcons({
			'heart-outline': heartOutline,
			heart: heart,
			'list-outline': listOutline,
			'bug-outline': bugOutline,
		});
	}

	public exhibitors: Signal<Array<Exhibitor>> = this.exhibitorsService.get;

	public isFavoriteFilterActive: Signal<Array<string>> =
		this.exhibitorsService.activeFilters;

	public ngOnInit(): void {}

	public toggleFavorite(exhibitor: Exhibitor) {
		if (exhibitor.isFavorite) {
			this.favoritesService.removeFavorite(exhibitor.id);
		} else {
			this.favoritesService.addFavorite(exhibitor.id);
		}
	}
	public handleOnlyFavorites($event: any): void {
		if ($event.detail.checked) {
			this.exhibitorsService.addFilter(['favorites']);
		} else {
			this.exhibitorsService.removeFilter('favorites');
		}
	}

	async openModal(exhibitor: Exhibitor) {
		const modal = await this.modalCtrl.create({
			component: ExhibitorDetailsComponent,
			componentProps: {
				exhibitor: exhibitor,
			},
		});
		modal.present();
	}
}
