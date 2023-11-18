import { Component, Input } from '@angular/core';
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
import { Exhibitor } from 'src/app/shared/models/exhibitor';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';

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
	constructor(private modalCtrl: ModalController) {
		addIcons({
			closeCircleOutline,
		});
	}
	@Input() public exhibitor: Exhibitor | null = null;
	public cancel(): void {
		this.modalCtrl.dismiss(null, 'cancel');
	}
}
