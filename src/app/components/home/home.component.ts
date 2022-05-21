import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sort: string;
  movies = [];
  private movieSub: Subscription;
  private routeSub: Subscription;

  homePageMovies = [
    {
      Title: 'Murder Mystery',
      imdbID: 'tt1618434',
      Poster: 'https://m.media-amazon.com/images/M/MV5BNTA2YTI5YjUtZWI4Zi00NWQ5LWFiYmEtOTBmNTUyNDAwNjllXkEyXkFqcGdeQXVyNjIzNzM4NzA@._V1_SX300.jpg'
    },
    {
      Title: 'Mystery Science Theater 3000: The Movie',
      imdbID: 'tt0117128',
      Poster: 'https://m.media-amazon.com/images/M/MV5BYzNmN2UzNTAtNmZkMS00MmI3LThhNzEtNjI1YjJlN2JiZjU0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
    },
    {
      Title: 'Batman',
      imdbID: 'tt0096895',
      Poster: 'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg'
    },
    {
      Title: 'Thrill Seekers',
      imdbID: 'tt0204686',
      Poster: 'https://m.media-amazon.com/images/M/MV5BMzI2NzcwMTM5Nl5BMl5BanBnXkFtZTcwNzgzNDMyMQ@@._V1_SX300.jpg'
    },
    {
      Title: 'Samurai Fiction',
      imdbID: 'tt0170544',
      Poster: 'https://m.media-amazon.com/images/M/MV5BMTI5MjU2MTg4NF5BMl5BanBnXkFtZTcwMjc1NzAwMQ@@._V1_SX300.jpg'
    },
    {
      Title: 'Friends',
      imdbID: 'tt0108778',
      Poster: 'https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg'
    },
    {
      Title: 'Mystery, Alaska',
      imdbID: 'tt0134618',
      Poster: 'https://m.media-amazon.com/images/M/MV5BZmE3OTRlOGEtNzExMi00YmI0LWIxMzYtNGU2NzU1ZTY0Y2JkXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg'
    },
    {
      Title: 'Fat Fiction',
      imdbID: 'tt11055922',
      Poster: 'https://m.media-amazon.com/images/M/MV5BNzgxMGNkNmMtNmFmNS00NWE3LTk1ZTctNjYxOTcwMTRmYWZkXkEyXkFqcGdeQXVyMzMwMjI2NA@@._V1_SX300.jpg'
    },
    {
      Title: 'Scooby-Doo! Mystery Incorporated',
      imdbID: 'tt1660055',
      Poster: 'https://m.media-amazon.com/images/M/MV5BYjEwMzE1ZGMtMmQzNS00ZGRkLWJmZTQtM2Q3Y2Q5ZTg4ZjQwXkEyXkFqcGdeQXVyNjIyNDgwMzM@._V1_SX300.jpg'
    },
    {
      Title: 'Pulp Fiction',
      imdbID: 'tt0110912',
      Poster: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
    },
    {
      Title: 'Uncharted',
      imdbID: 'tt1464335',
      Poster: 'https://m.media-amazon.com/images/M/MV5BMWEwNjhkYzYtNjgzYy00YTY2LThjYWYtYzViMGJkZTI4Y2MyXkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_SX300.jpg'
    },
    {
      Title: 'The Mask',
      imdbID: 'tt0110475',
      Poster: 'https://m.media-amazon.com/images/M/MV5BOWExYjI5MzktNTRhNi00Nzg2LThkZmQtYWVkYjRlYWI2MDQ4XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
    },

  ];

  constructor(private httpserv: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['movie-search']) {
        this.searchMovie(params['movie-search']);
        console.log("params : " + params['movie-search'])
      }
    })
  }

  searchMovie(search?: string) {
    this.movieSub = this.httpserv.getMoviesBySearch(search).subscribe((response: any) => {
      this.movies = response.Search;
      console.log("RESPONSE : " + response);
    })
  }

  SortMovie(sort?: string) {
    this.movieSub = this.httpserv.getMoviesBySort(sort).subscribe((response: any) => {
      this.movies = response.Search;
      console.log("RESPONSE : " + response);
    })
  }

  openMovieDetails(imdbID: string): void {
    console.log("on click : " + imdbID);
    this.router.navigate(['details', imdbID]);

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
