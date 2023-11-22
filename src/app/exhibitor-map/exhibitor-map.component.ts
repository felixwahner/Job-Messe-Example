import { Exhibitor } from './../shared/models/exhibitor';
import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Location } from '@angular/common';
import { ExhibitorsService } from '../shared/services/exhibitors.service';
import { IonContent } from '@ionic/angular/standalone';
import { AppHeaderComponent } from '../shared/components/app-header/app-header.component';
import { ActivatedRoute } from '@angular/router';

const mapIcon = L.divIcon({
	className: 'marker-icon',
	iconSize: [30, 30],
	iconAnchor: [15, 15],
});
const activeMapIcon = L.divIcon({
	className: 'marker-icon marker-icon-active',
	iconSize: [30, 30],
	iconAnchor: [15, 15],
});
@Component({
	selector: 'exhibitor-map',
	templateUrl: './exhibitor-map.component.html',
	standalone: true,
	imports: [LeafletModule, IonContent, AppHeaderComponent],
})
export class ExhibitorMapComponent {
	constructor(
		private location: Location,
		public exhibitorsService: ExhibitorsService
	) {
		effect(() => {
			if (this.exhibitorsService.get().length) {
				this.handleDataUpdate();
			}
		});
	}
	private isMapReady: boolean = false;
	private currentMarkers: Map<string, L.Marker> = new Map();
	public map: L.Map | null = null;

	public leafletOptions = {
		minZoom: 0,
		maxZoom: 3,
		center: L.latLng(320, 403.5),
		maxBoundsViscosity: 1,
		crs: L.CRS.Simple,
	};

	public ionViewWillEnter(): void {
		this.currentMarkers.forEach((marker, exhibitorId) => {
			this.removeMarkerFromMap(exhibitorId);
			marker.remove();
		});
		this.handleDataUpdate();
	}

	public ionViewDidLeave(): void {
		this.exhibitorsService.selectedExhibitor.set(null);
	}

	public onMapReady(map: L.Map): void {
		this.isMapReady = true;
		this.map = map;
		/*
			To get the correct scaling, we set the bounds
			to the inital zoom level:
			zoom 4 6456 * 5120 
			zoom 3 3228 * 2560 (original size)
			zoom 2 1614 * 1280
			zoom 1 807 * 640
			zoom 0 403.5 * 320
		*/
		const bounds: L.LatLngBounds = L.latLngBounds([
			[0, 0],
			[640, 807], // image size
		]);
		this.map
			.setMaxBounds(new L.LatLngBounds([-20, -20], [660, 827]))
			.setZoom(1)
			.fitBounds(bounds);
		const url: string = this.location
			.prepareExternalUrl('assets/images/backgrounds/eg.png')
			.replace('#', '');
		L.imageOverlay(url, bounds).addTo(this.map as L.Map);
		if (
			!this.currentMarkers.entries &&
			this.exhibitorsService.get().length
		) {
			this.handleDataUpdate();
		}
		const selectedExhibitor = this.exhibitorsService.selectedExhibitor();
		if (selectedExhibitor) {
			const exhibitor = this.exhibitorsService
				.get()
				.find((exhibitor) => exhibitor.id === selectedExhibitor.id);
			if (exhibitor) {
				this.map.panTo([
					exhibitor.coordinates.latitude,
					exhibitor.coordinates.longitude,
				]);
			}
		}
	}

	private handleDataUpdate(): void {
		if (!this.isMapReady) return;
		const newMarkers: Array<Exhibitor> = this.exhibitorsService.get();
		const markersToRemove: Array<string> = [];
		this.currentMarkers.forEach((_, id) => {
			const isIncludedInNewMarkers: boolean = newMarkers.some(
				(newMarker) => newMarker.id === id
			);
			if (!isIncludedInNewMarkers) {
				markersToRemove.push(id);
			}
		});
		markersToRemove.forEach((id) => this.removeMarkerFromMap(id));
		newMarkers.forEach((exhibitor) => this.addMarkerToMap(exhibitor));
	}

	private addMarkerToMap(exhibitor: Exhibitor): void {
		const existingMarker = this.currentMarkers.get(exhibitor.id);
		if (existingMarker !== undefined) return;
		const exhibitorPosition = new L.LatLng(
			exhibitor.coordinates.latitude,
			exhibitor.coordinates.longitude
		);
		const selectedExhibitor = this.exhibitorsService.selectedExhibitor();
		console.log('SELECTED ---->', selectedExhibitor);
		const marker = L.marker(exhibitorPosition, {
			icon:
				selectedExhibitor && selectedExhibitor.id === exhibitor.id
					? activeMapIcon
					: mapIcon,
		})
			.setLatLng(exhibitorPosition)
			.addTo(this.map as L.Map)
			.bindTooltip(exhibitor.name, {
				permanent: true,
				direction: 'right',
			})
			.openTooltip();
		this.currentMarkers.set(exhibitor.id, marker);
	}

	private removeMarkerFromMap(exhibitorId: string): void {
		const marker = this.currentMarkers.get(exhibitorId);
		if (!marker) return;
		marker.closeTooltip();
		if (this.map?.hasLayer(marker)) {
			this.map?.removeLayer(marker);
		}
		this.currentMarkers.delete(exhibitorId);
	}
}
