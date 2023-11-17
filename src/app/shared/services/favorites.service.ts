import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
	MatSnackBar,
	MatSnackBarAction,
	MatSnackBarActions,
	MatSnackBarLabel,
	MatSnackBarRef,
} from '@angular/material/snack-bar';
const storageName: string = 'FAVORITES';
@Injectable({
	providedIn: 'root',
})
export class FavoritesService {
	private currentFavoritesSrc: BehaviorSubject<Array<string>> =
		new BehaviorSubject<Array<string>>([]);
	public currentFavorites$: Observable<Array<string>> =
		this.currentFavoritesSrc.asObservable();
	constructor(private snackBar: MatSnackBar) {
		this.currentFavoritesSrc.next(this.getFavorites());
	}
	private getFavorites(): Array<string> {
		const storedItems = localStorage.getItem(storageName);
		return storedItems ? storedItems.split(',') : [];
	}
	private store(items: Array<string>): void {
		localStorage.setItem(storageName, items.join(','));
	}
	public addFavorite(id: string): void {
		const currentFavorites = [...this.currentFavoritesSrc.getValue()];
		if (currentFavorites.includes(id)) return;
		currentFavorites.push(id);
		this.store(currentFavorites);
		this.currentFavoritesSrc.next(currentFavorites);
		this.snackBar.open('Favorit hinzugefügt', 'Schließen', {
			duration: 1000,
		});
	}
	public removeFavorite(id: string): void {
		const currentFavorites = [...this.currentFavoritesSrc.getValue()];
		const favoritePosition = currentFavorites.indexOf(id);
		if (favoritePosition < 0) return;
		currentFavorites.splice(favoritePosition, 1);
		this.store(currentFavorites);
		this.currentFavoritesSrc.next(currentFavorites);
		// @TODO: Message
		this.snackBar.open('Favorit gelöscht', 'Schließen', {
			duration: 1000,
		});
	}
}
