import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ExhibitorsService } from './shared/services/exhibitors.service';
import { Observable } from 'rxjs';
import { Exhibitor } from './shared/models/exhibitor';

export type APPLICATION_MODE = 'map' | 'list';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	public exhibitors$: Observable<Array<Exhibitor>>;
	public applicationMode: APPLICATION_MODE = 'list';
	constructor(private exhibitorsService: ExhibitorsService) {
		this.exhibitors$ = this.exhibitorsService.get();
	}
	public ngOnInit(): void {}
	public switchView(mode: APPLICATION_MODE) {
		this.applicationMode = mode;
	}
}
