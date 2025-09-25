import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArtistDetailComponent } from '../artist-detail/artist-detail.component';
import { AlbumDetailComponent } from '../album-detail/album-detail.component';

@Component({
  selector: 'app-home-spot',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterModule,ArtistDetailComponent,AlbumDetailComponent],
  templateUrl: './home-spot.component.html',
  styleUrl: './home-spot.component.css'
})
export class HomeSpotComponent implements OnInit{
  query: string = '';
  artists: any[] = [];
  albums: any[] = [];
  limit = 10;
  offset = 0;
  playlists: any[] = [];
  loading: boolean = true;
  error: string | null = null; // Para gerenciar erros

   // controle da tela
  selectedArtist: string | null = null;
  selectedAlbum: string | null = null;

  constructor(private spotify: SpotifyService) {}

  ngOnInit(): void {
      this.loadInitialData();
  }

  search() {
    if (!this.query) return;
    this.spotify.searchArtist(this.query, this.offset, this.limit).subscribe({
      next: res => this.artists = res,
      error: err => console.error(err)
    });
  }
    nextPage() {
      this.offset += this.limit;
      this.search();
    }

    prevPage() {
     if (this.offset >= this.limit) this.offset -= this.limit;
     this.search();
   }

   viewArtist(id: string) {
    this.selectedArtist = id;
    this.selectedAlbum = null;
   }

  viewAlbum(id: string) {
    this.selectedAlbum = id;
    this.selectedArtist = null;
  }

  refresh() {
  // Reseta o estado da tela
  this.query = '';
  this.artists = [];
  this.albums = [];
  this.playlists = [];
  this.offset = 0;
  this.selectedArtist = null;
  this.selectedAlbum = null;
  this.loading = true;
  this.error = null;
}

resetForm() {
  this.query = '';
  this.artists = []; // limpa a lista de artistas
  this.selectedArtist = null;
  this.selectedAlbum = null;
  this.albums;
  // qualquer outro campo/variável que precise resetar
}

onInputChange(value: string) {
  if (!value) {
    this.resetForm();
  }
}
  closeDetails() {
    this.selectedArtist = null;
    this.selectedAlbum = null;
  }

   loadInitialData() {
    this.loading = true;

    // Novos lançamentos
    this.spotify.getNewReleases(16).subscribe({
      next: res => this.albums = res.items,
      error: err => console.error(err)
    });

    // Artistas populares
    this.spotify.getTopArtists(16).subscribe({
      next: res => this.artists = res,
      error: err => console.error(err)
    });

    // Playlists públicas
    this.spotify.getUserPlaylists(16).subscribe({
      next: res => this.playlists = res.items || [],
      error: err => console.error(err),
      complete: () => this.loading = false
    });
  }

}
