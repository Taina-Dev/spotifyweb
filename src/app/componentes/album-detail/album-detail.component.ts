import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule ],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css'
})
export class AlbumDetailComponent {
  album: any = null;
  tracks: any[] = [];
  @Input() albumId!: string;

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.albumId = params.get('id')!;
      this.loadAlbum();
      this.loadTracks();
    });
  }

  loadAlbum() {
    this.spotify.getAlbum(this.albumId).subscribe({
      next: data => this.album = data,
      error: err => console.error(err)
    });
  }

  loadTracks() {
    this.spotify.getAlbumTracks(this.albumId).subscribe({
      next: data => this.tracks = data,
      error: err => console.error(err)
    });
  }

   ngOnChanges(changes: SimpleChanges) {
    if (changes['albumId'] && this.albumId) {
      this.loadAlbum();
      this.loadTracks();
    }
  }

  

}
