import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
 
  routeSub: Subscription;
  movieSub: Subscription;
  movieID: string;
  movieRating=0;
  movie: Movie;

  constructor( private activatedRoute : ActivatedRoute,
    private httpService : HttpService ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.movieID = params['imdbID'];
      this.getMovieDetails(this.movieID);
    });
  }

  getMovieDetails(imdbID: string): void {
    this.movieSub = this.httpService.getMovieDetails(imdbID).subscribe((res: any) => {
        this.movie = res;

        setTimeout(() => {
          this.movieRating = Number(this.movie.Metascore);
        }, 1000);

      });
      
    }

    getColor(value: number): string {
      if (value > 75) {
        return '#5ee432';
      } else if (value > 50) {
        return '#fffa50';
      } else if (value > 30) {
        return '#f7aa38';
      } else {
        return '#ef4655';
      }
    }

    ngOnDestroy(): void {
      if (this.movieSub) {
        this.movieSub.unsubscribe();
      }
  
      if (this.routeSub) {
        this.routeSub.unsubscribe();
      }
    }

}
