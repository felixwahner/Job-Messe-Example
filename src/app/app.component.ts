import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	Signal,
} from '@angular/core';
import { ExhibitorsService } from './shared/services/exhibitors.service';
import { Observable } from 'rxjs';
import { Exhibitor } from './shared/models/exhibitor';
import { ExhibitorListComponent } from './exhibitor-list/exhibitor-list.component';
import { ExhibitorMapComponent } from './exhibitor-map/exhibitor-map.component';
import {
	IonIcon,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonRouterOutlet,
	IonApp,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mapOutline, listOutline } from 'ionicons/icons';
// needed because of https://github.com/ionic-team/ionic-framework/issues/28385
import { defineCustomElement as defineModal } from '@ionic/core/components/ion-modal.js';
import { defineCustomElement as defineLoading } from '@ionic/core/components/ion-loading.js';
import { defineCustomElement as defineToast } from '@ionic/core/components/ion-toast.js';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		ExhibitorListComponent,
		ExhibitorMapComponent,
		IonApp,
		IonIcon,
		IonTabs,
		IonTabBar,
		IonTabButton,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonRouterOutlet,
	],
})
export class AppComponent {
	public exhibitors: Signal<Array<Exhibitor>> = this.exhibitorsService.get;
	constructor(private exhibitorsService: ExhibitorsService) {
		addIcons({ 'map-outline': mapOutline, 'list-outline': listOutline });
		defineModal();
		defineLoading();
		defineToast();
	}
}
