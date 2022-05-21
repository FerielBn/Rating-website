export interface Movie {
    "Title": string,
    "Year": Date,
    "Rated": string,
    "Released": Date,
    "Runtime": string,
    "Genre": string,
    "Director": string,
    "Writer": string,
    "Actors": string,
    "Plot": string,
    "Language": string,
    "Country": string,
    "Awards": string,
    "Poster": string,
    "Ratings":[],
    "Metascore": string,
    "imdbRating": string,
    "imdbVotes": string,
    "imdbID": string,
    "Type": string,
    "DVD": string,
    "BoxOffice": string,
    "Production": string,
    "Website": string,
    "Response": boolean,
}

export interface APIResponse<T> {
    results: Array<T>;
}