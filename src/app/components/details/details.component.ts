import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  movieTitle: string;
  routeSub: Subscription;
  movieSub: Subscription;
  movie: any;

  constructor( private activatedRoute : ActivatedRoute,
    private httpService : HttpService ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.movieTitle = params['title']
      this.getMovieDetails(this.movieTitle);
    });
  }

  getMovieDetails(title: string): void {
    this.movieSub = this.httpService
      .getMovieDetails(title)
      .subscribe((res: any) => {
        this.movie = res;
        console.log(this.movie)
      });

      
    }

}
;