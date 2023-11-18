import { Component, Input, OnInit } from '@angular/core';
import {
	IonContent,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonSearchbar,
	IonSelect,
	IonSelectOption,
	IonIcon,
} from '@ionic/angular/standalone';
import { ExhibitorsService } from '../../services/exhibitors.service';
import { addIcons } from 'ionicons';
import { schoolOutline } from 'ionicons/icons';
@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrl: './app-header.component.scss',
	standalone: true,
	imports: [
		IonContent,
		IonList,
		IonLabel,
		IonItem,
		IonListHeader,
		IonHeader,
		IonTitle,
		IonToolbar,
		IonSearchbar,
		IonSelect,
		IonSelectOption,
		IonIcon,
	],
})
export class AppHeaderComponent {
	@Input() public title: string = '';
	constructor(private exhibitorsService: ExhibitorsService) {
		addIcons({
			'school-outline': schoolOutline,
		});
	}
	public jobTypes: Array<string> = this.exhibitorsService.getAllFilters();
	public handleChange($event: any): void {
		this.exhibitorsService.addFilter($event.detail.value);
	}
}
