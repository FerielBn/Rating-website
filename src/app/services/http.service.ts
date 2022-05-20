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

    return this.http.get<any>('https://streaming-availability.p.rapidapi.com/get/basic' , {
     params: params,
    }   
    );
  }

  getMovieDetails(title: string): any {
    const movieInfoRequest = this.http.get<any>('https://streaming-availability.p.rapidapi.com/'+title+'/basic');

    return forkJoin({
      movieInfoRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['movieInfoRequest'],
        };
      })
    );

  }


}
