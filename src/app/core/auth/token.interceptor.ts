import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this.userService.user ? this.userService.user.idToken : null;
    console.log(idToken);
    request = request.clone({
        // setHeaders: {
        //     Authorization: `Bearer ${idToken}`
        // }
        });
        return (next.handle(request));
  }
}

