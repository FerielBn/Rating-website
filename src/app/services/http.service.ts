import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment.prod';
import { APIResponse, Movie } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getMovies(search: string) : any{
    let params = new HttpParams().set('search', search);

    if(search){
      let params = new HttpParams().set('search', search);
    }

    return this.http.get<any>('https://www.omdbapi.com/?s='+search+'&apikey=3b4857ea' , {
     params: params,
    } 
    );
  }

  getMovieDetails(title: string): any {
    const gameInfoRequest = this.http.get<any>('https://www.omdbapi.com/?s='+title+'&apikey=3b4857ea');

    return forkJoin({
      gameInfoRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
        };
      })
    );

  }


}
