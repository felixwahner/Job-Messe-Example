import { bootstrapApplication } from '@angular/platform-browser';
import {
	RouteReuseStrategy,
	PreloadAllModules,
	provideRouter,
	withHashLocation,
	withPreloading,
} from '@angular/router';
import {
	provideIonicAngular,
	IonicRouteStrategy,
} from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';

import { APP_ROUTES } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		provideIonicAngular({ mode: 'md' }),
		provideAnimations(),
		provideHttpClient(),
		provideRouter(
			APP_ROUTES,
			withPreloading(PreloadAllModules),
			withHashLocation() // needed for gitlab pages :(
		),
	],
});
