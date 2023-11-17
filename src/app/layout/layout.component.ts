import { MediaMatcher } from '@angular/cdk/layout';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { APPLICATION_MODE } from '../app.component';
import { ExhibitorFilterComponent } from '../exhibtor-filter/exhibitor-filter.component';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	standalone: true,
	styleUrls: ['./layout.component.scss'],
	imports: [
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatSidenavModule,
		MatListModule,
		MatButtonToggleModule,
		MatGridListModule,
		ExhibitorFilterComponent,
	],
})
export class LayoutComponent {
	@Output() modeSwitch = new EventEmitter<APPLICATION_MODE>();

	public selectedMode: APPLICATION_MODE = 'list';

	public switch(map: APPLICATION_MODE) {
		this.modeSwitch.emit(map);
	}
}
