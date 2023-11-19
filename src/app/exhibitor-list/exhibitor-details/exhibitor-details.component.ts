import { Exhibitor } from './../../shared/models/exhibitor';
import { ExhibitorsService } from './../../shared/services/exhibitors.service';
import { FavoritesService } from './../../shared/services/favorites.service';
import { Component, Input, Signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import {
	IonModal,
	IonContent,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCardContent,
	IonToolbar,
	IonButton,
	IonHeader,
	IonTitle,
	IonText,
	IonButtons,
	IonIcon,
	ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
	closeCircleOutline,
	heart,
	heartOutline,
	mapOutline,
} from 'ionicons/icons';

@Component({
	selector: 'exhibitor-details',
	standalone: true,
	templateUrl: './exhibitor-details.component.html',
	styleUrl: './exhibitor-details.component.scss',
	imports: [
		IonModal,
		IonContent,
		IonCard,
		IonCardHeader,
		IonCardSubtitle,
		IonCardTitle,
		IonCardContent,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonButton,
		IonText,
		IonButtons,
		IonIcon,
	],
})
export class ExhibitorDetailsComponent {
	constructor(
		private modalCtrl: ModalController,
		private favoritesService: FavoritesService,
		private exhibitorsService: ExhibitorsService,
		private router: Router
	) {
		addIcons({
			closeCircleOutline,
			heart,
			heartOutline,
			mapOutline,
		});
		effect(() => {
			if (this.exhibitorsService.get().length) {
				this.exhibitor = this.exhibitorsService
					.get()
					.find((exhibitor) => exhibitor.id === this.exhibitorId);
			}
		});
	}
	@Input() public exhibitorId: string = '';

	public exhibitor: Exhibitor | undefined;

	public cancel(): void {
		this.modalCtrl.dismiss(null, 'cancel');
	}
	public toggleFavorite() {
		if (this.exhibitor?.isFavorite) {
			this.favoritesService.removeFavorite(this.exhibitor?.id);
		} else {
			this.favoritesService.addFavorite(this.exhibitor?.id as string);
		}
	}
	public showOnMap() {
		this.router.navigate(['map', this.exhibitor?.id]);
		this.modalCtrl.dismiss(null, 'cancel');
	}
}
