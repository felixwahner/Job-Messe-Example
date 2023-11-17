import { MatIconModule } from '@angular/material/icon';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Exhibitor } from '../shared/models/exhibitor';
import { FavoritesService } from '../shared/services/favorites.service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
	selector: 'exhibitor-list',
	templateUrl: './exhibitor-list.component.html',
	styleUrl: './exhibitor-list.component.scss',
	standalone: true,
	imports: [MatExpansionModule, MatButtonModule, MatIconModule],
})
export class ExhibitorListComponent {
	constructor(private favoritesService: FavoritesService) {}
	@Input() public exhibitors: Array<Exhibitor> | null = null;
	public toggleFavorite(exhibitor: Exhibitor) {
		if (exhibitor.isFavorite) {
			this.favoritesService.removeFavorite(exhibitor.id);
		} else {
			this.favoritesService.addFavorite(exhibitor.id);
		}
	}
}
