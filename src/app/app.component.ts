import {
	ChangeDetectionStrategy,
	Component,
	EnvironmentInjector,
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
export class AppComponent implements OnInit {
	public exhibitors: Signal<Array<Exhibitor>> = this.exhibitorsService.get;
	constructor(private exhibitorsService: ExhibitorsService) {
		addIcons({ 'map-outline': mapOutline, 'list-outline': listOutline });
	}
	public ngOnInit(): void {}
}
