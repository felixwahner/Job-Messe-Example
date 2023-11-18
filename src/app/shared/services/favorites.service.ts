import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';
const storageName: string = 'FAVORITES';
@Injectable({
	providedIn: 'root',
})
export class FavoritesService {
	private currentFavoritesSrc: BehaviorSubject<Array<string>> =
		new BehaviorSubject<Array<string>>([]);
	public currentFavorites$: Observable<Array<string>> =
		this.currentFavoritesSrc.asObservable();
	constructor(private toastController: ToastController) {
		this.currentFavoritesSrc.next(this.getFavorites());
	}
	private getFavorites(): Array<string> {
		const storedItems = localStorage.getItem(storageName);
		return storedItems ? storedItems.split(',') : [];
	}
	private store(items: Array<string>): void {
		localStorage.setItem(storageName, items.join(','));
	}
	public async addFavorite(id: string): Promise<void> {
		const currentFavorites = [...this.currentFavoritesSrc.getValue()];
		if (currentFavorites.includes(id)) return;
		currentFavorites.push(id);
		this.store(currentFavorites);
		this.currentFavoritesSrc.next(currentFavorites);
		const toast = await this.toastController.create({
			message: 'Favorit hinzugefügt',
			duration: 1500,
			position: 'bottom',
			icon: 'heart',
		});
		await toast.present();
	}
	public async removeFavorite(id: string): Promise<void> {
		const currentFavorites = [...this.currentFavoritesSrc.getValue()];
		const favoritePosition = currentFavorites.indexOf(id);
		if (favoritePosition < 0) return;
		currentFavorites.splice(favoritePosition, 1);
		this.store(currentFavorites);
		this.currentFavoritesSrc.next(currentFavorites);
		const toast = await this.toastController.create({
			message: 'Favorit gelöscht',
			duration: 1500,
			position: 'bottom',
			icon: 'heart-outline',
		});
		await toast.present();
	}
}
