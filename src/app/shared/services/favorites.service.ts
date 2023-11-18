import { Injectable, WritableSignal, signal, effect } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';
const storageName: string = 'FAVORITES';
@Injectable({
	providedIn: 'root',
})
export class FavoritesService {
	constructor(private toastController: ToastController) {
		this.favorites.set(this.getFavoritesFromLocalstorage());
		effect(() => {
			localStorage.setItem(storageName, this.favorites().join(','));
		});
	}
	public favorites: WritableSignal<Array<string>> = signal([]);

	private getFavoritesFromLocalstorage(): Array<string> {
		const storedItems = localStorage.getItem(storageName);
		return storedItems ? storedItems.split(',') : [];
	}
	public async addFavorite(id: string): Promise<void> {
		if (this.favorites().includes(id)) return;
		this.favorites.update((value) => [...value, id]);
		const toast = await this.toastController.create({
			message: 'Favorit hinzugefügt',
			duration: 1500,
			position: 'bottom',
			icon: 'heart',
		});
		await toast.present();
	}
	public async removeFavorite(id: string): Promise<void> {
		const favoritePosition = this.favorites().indexOf(id);
		if (favoritePosition < 0) return;
		this.favorites.update((favorites) =>
			favorites.filter((valItem) => valItem !== id)
		);
		const toast = await this.toastController.create({
			message: 'Favorit gelöscht',
			duration: 1500,
			position: 'bottom',
			icon: 'heart-outline',
		});
		await toast.present();
	}
}
