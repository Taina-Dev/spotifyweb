import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeSpotComponent } from './app/componentes/home-spot/home-spot.component';
import { Routes } from '@angular/router';
import { AlbumDetailComponent } from './app/componentes/album-detail/album-detail.component';
import { ArtistDetailComponent } from './app/componentes/artist-detail/artist-detail.component';

const routes: Routes = [
  { path: '', component: HomeSpotComponent },
  { path: 'artist/:id', component: ArtistDetailComponent },
  { path: 'album/:id', component: AlbumDetailComponent },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, FormsModule)
  ]
}).catch(err => console.error(err));
