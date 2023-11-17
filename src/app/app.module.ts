import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { AppComponent } from './app.component';
import { ExhibitorListComponent } from './exhibitor-list/exhibitor-list.component';
import { ExhibitorMapComponent } from './exhibitor-map/exhibitor-map.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		LayoutComponent,
		ExhibitorListComponent,
		ExhibitorMapComponent,
		MatSnackBarModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
