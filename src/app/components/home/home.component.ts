import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sort: String;
  movies = [];

  constructor(private httpserv : HttpService,
     private activatedRoute : ActivatedRoute,
     private router: Router,) { }

  ngOnInit(): void {
    //fetch('https://streaming-availability.p.rapidapi.com/get/basic')
     //.then(res => res.json())
     // .then(res => this.movies = res)
     // .then(res => console.log("on init : "+res));
      

   this.activatedRoute.params.subscribe((params: Params) => {
     if (params['movie-search']) {
       this.searchMovie(params['movie-search']);
       console.log("params : "+ params['movie-search'])
     }
   })
  }

  searchMovie(search?: string){
    this.httpserv.getMovies(search).subscribe((response: any) => {
      this.movies = response.Search;
      console.log("search movie : "+response);
    })
    
   // fetch('https://www.omdbapi.com/?s='+search+'&apikey=3b4857ea')
  //  .then(res => res.json())
   // .then(res => this.movies = res.Search);
  
  }

  openMovieDetails(title: string): void {
    this.router.navigate(['details', title]);
   
  }

  blurEffect(movie: any){
    let selectedItem = movie.title;
  }
  

}
