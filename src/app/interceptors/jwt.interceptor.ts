import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router){}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");

    if (token) {
      req = req.clone({
        setHeaders: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status == 401 || err.status == 403) {
        this.router.navigate(["/login"]);
      }
      return throwError(err);
    }));
  }
}
