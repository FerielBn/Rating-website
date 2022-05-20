import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpErrotsInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
                'X-RapidAPI-Key': '5b6d1a9344msh6a48c42859b1813p1bfbe1jsn8a01f6c03300'
                
              },
              setParams: {
                key: 'cb6c997e0bmsh1068b2afa5a110cp1a7e87jsn3c01e8dcf145',
              }
            
        });
        return next.handle(req);
    }
    
}