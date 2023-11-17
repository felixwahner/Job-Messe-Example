import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Exhibitor } from '../shared/models/exhibitor';
import { FavoritesService } from '../shared/services/favorites.service';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Location, LocationStrategy } from '@angular/common';

@Component({
	selector: 'exhibitor-map',
	templateUrl: './exhibitor-map.component.html',
	standalone: true,
	imports: [MatCardModule, MatButtonModule, MatIconModule, LeafletModule],
})
export class ExhibitorMapComponent implements OnChanges {
	constructor(private location: Location) {}
	public isMapReady: boolean = false;
	public map: L.Map | null = null;
	public markers: Map<string, L.Marker> = new Map();

	@Input() public exhibitors: Array<Exhibitor> | null = null;

	public leafletOptions = {
		minZoom: -5,
		center: L.latLng(5000, -5000),
		crs: L.CRS.Simple,
	};

	public ngOnChanges({ exhibitors }: SimpleChanges): void {
		if (
			exhibitors &&
			exhibitors.currentValue &&
			exhibitors.currentValue.length > 0
		) {
			this.removeMarkersFromMap();
			this.addMarkersToMap();
		}
	}
	public onMapReady(map: L.Map): void {
		this.isMapReady = true;
		this.map = map;
		const topLeft = L.latLng(0, 0);
		const bottomRight = L.latLng(10000, 10000);
		const bounds = L.latLngBounds(topLeft, bottomRight);
		const url = this.location.prepareExternalUrl(
			'assets/images/backgrounds/example.png'
		);
		var image = L.imageOverlay(url, bounds).addTo(this.map as L.Map);
		this.map.fitBounds(bounds);
		this.removeMarkersFromMap();
		this.addMarkersToMap();
	}
	private addMarkersToMap(): void {
		if (!this.isMapReady) return;
		(this.exhibitors as Array<Exhibitor>).forEach((exhibitor) => {
			if (this.markers.get(exhibitor.id) !== undefined) return;
			const exhibitorPosition = new L.LatLng(
				exhibitor.coordinates.latitude,
				exhibitor.coordinates.longitude
			);
			const marker = L.marker(exhibitorPosition)
				.setLatLng(exhibitorPosition)
				.addTo(this.map as L.Map)
				.bindPopup(
					`<p>${exhibitor.name}<br/><small>${exhibitor.jobTypes.join(
						','
					)}</small></p>`,
					{ autoClose: false, closeOnClick: false }
				)
				.openPopup();
			this.markers.set(exhibitor.id, marker);
		});
	}
	private removeMarkersFromMap(): void {
		this.markers.forEach((marker, id) => {
			this.map?.removeLayer(marker);
			this.markers.delete(id);
		});
	}
}
