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

    request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${this.userService.idToken}`
        }
        });
        return (next.handle(request));
  }
}

