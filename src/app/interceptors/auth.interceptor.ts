import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);

  const token = authService.isAuthenticated() ? localStorage.getItem('token') : null;

  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(clonedReq);
  }
  return next(req);
}

// export const AuthInterceptorProvider = [
//   {
//     provide: HTTP_INTERCEPTORS,
//     useClass: authInterceptor,
//     multi: true
//   }
// ]