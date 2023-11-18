import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const APP_ROUTES: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'list',
			},
			{
				path: 'list',
				loadComponent: () =>
					import('./exhibitor-list/exhibitor-list.component').then(
						(m) => m.ExhibitorListComponent
					),
			},
			{
				path: 'map',
				loadComponent: () =>
					import('./exhibitor-map/exhibitor-map.component').then(
						(m) => m.ExhibitorMapComponent
					),
			},
		],
	},
];
