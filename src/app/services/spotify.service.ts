import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, catchError, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

 private clientId = '';
  private clientSecret = '';
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private accessToken: string = '';
private apiUrl = 'https://api.spotify.com/v1';
  constructor(private http: HttpClient) {}

  private getAccessToken(): Observable<string> {
    if (this.accessToken) return of(this.accessToken);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
    });

    const body = new URLSearchParams({ grant_type: 'client_credentials' }).toString();

    return this.http.post<{ access_token: string }>(this.tokenUrl, body, { headers }).pipe(
      map(res => {
        this.accessToken = res.access_token;
        return this.accessToken;
      }),
      catchError(err => {
        console.error('Erro ao obter token', err);
        throw err;
      })
    );
  }


  searchArtist(artistName: string, offset: number = 0, limit: number = 10): Observable<any[]> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        const params = new HttpParams()
          .set('q', artistName)
          .set('type', 'artist')
          .set('limit', limit.toString())
          .set('offset', offset.toString());
        return this.http.get<any>('https://api.spotify.com/v1/search', { headers, params });
      }),
      map(res => res.artists.items)
    );
  }

   /** 3️⃣ Detalhes de um artista */
  getArtist(id: string): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        return this.http.get<any>(`${this.apiUrl}/artists/${id}`, { headers });
      })
    );
  }

  /** 4️⃣ Álbuns de um artista */
  getArtistAlbums(artistId: string, limit = 10, offset = 0): Observable<any> {
  return this.getAccessToken().pipe(
    switchMap(token => {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const params = new HttpParams()
        .set('limit', limit.toString())
        .set('offset', offset.toString());
      return this.http.get<any>(`${this.apiUrl}/artists/${artistId}/albums`, { headers, params });
    })
  );
}


  /** 5️⃣ Detalhes de um álbum */
  getAlbum(albumId: string): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        return this.http.get<any>(`${this.apiUrl}/albums/${albumId}`, { headers });
      })
    );
  }

  /** 6️⃣ Faixas de um álbum */
  getAlbumTracks(albumId: string): Observable<any[]> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        return this.http.get<any>(`${this.apiUrl}/albums/${albumId}/tracks`, { headers });
      }),
      map(res => res.items)
    );
  }

  /** 7️⃣ Novos lançamentos globais */
getNewReleases(limit = 10, offset = 0): Observable<any> {
  return this.getAccessToken().pipe(
    switchMap(token => {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const params = new HttpParams()
        .set('limit', limit.toString())
        .set('offset', offset.toString());
      return this.http.get<any>(`${this.apiUrl}/browse/new-releases`, { headers, params });
    }),
    map(res => res.albums)
  );
}


/** 8️⃣ Artistas populares (top 50 global) */
getTopArtists(limit = 10): Observable<any> {
  // O Spotify não tem endpoint direto para "top artistas global", mas podemos usar uma playlist global de top hits como referência
  const topHitsPlaylistId = '37i9dQZF1DXcBWIGoYBM5M';
  return this.getAccessToken().pipe(
    switchMap(token => {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      return this.http.get<any>(`${this.apiUrl}/playlists/${topHitsPlaylistId}`, { headers });
    }),
    map(res => {
      // Extrair artistas das faixas
      const artistsMap: any = {};
      res.tracks.items.forEach((item: any) => {
        item.track.artists.forEach((artist: any) => {
          if (!artistsMap[artist.id]) artistsMap[artist.id] = artist;
        });
      });
      return Object.values(artistsMap).slice(0, limit);
    })
  );
}

/** 9️⃣ Playlists do usuário */
getUserPlaylists(limit = 10, offset = 0): Observable<any> {
  // IMPORTANTE: Para acessar playlists do usuário você precisa do OAuth do usuário logado.
  // Com client_credentials não é possível acessar playlists privadas do usuário.
  // Aqui usamos playlists públicas (exemplo: sua própria conta de teste ou playlists gerais)
  return this.getAccessToken().pipe(
    switchMap(token => {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const params = new HttpParams()
        .set('limit', limit.toString())
        .set('offset', offset.toString());
      return this.http.get<any>(`${this.apiUrl}/me/playlists`, { headers, params });
    }),
    catchError(err => {
      console.warn('Não foi possível buscar playlists do usuário sem OAuth', err);
      return of([]); // retorna vazio
    })
  );
}


}
