import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { FormsModule } from '@angular/forms';
import { AlbumDetailComponent } from '../album-detail/album-detail.component';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,AlbumDetailComponent],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.css'
})
export class ArtistDetailComponent {
  artist: any = null;
  albums: any[] = [];
  limit = 10;
  offset = 0;
  totalAlbums: number = 0;
 @Input() artistId!: string;

  selectedArtist: string | null = null;
  selectedAlbum: any = null;
  selectedAlbumId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.artistId = params.get('id')!;
      this.loadArtist();
      this.loadAlbums();
    });
  }

  loadArtist() {
    this.spotify.getArtist(this.artistId).subscribe({
      next: data => this.artist = data,
      error: err => console.error(err)
    });
  }

loadAlbums() {
  this.spotify.getArtistAlbums(this.artistId, this.limit, this.offset).subscribe({
    next: data => {
      this.albums = data.items; // items é o array de álbuns
      this.totalAlbums = data.total; // total de álbuns do artista
    },
    error: err => console.error(err)
  });
}

  ngOnChanges(changes: SimpleChanges) {
  if (changes['artistId'] && changes['artistId'].currentValue) {
    this.loadArtist();
    this.loadAlbums();
  }
}

 selectAlbum(albumId: string) {
    this.selectedAlbumId = albumId;
  }

  closeAlbum() {
    this.selectedAlbumId = null;
  }


}
