import { AuthService } from './auth/auth.service'
import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
import { LoaderService } from '../../loader/loader.service'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs-compat'

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private loaderService: LoaderService, private authService: AuthService, private toastr: ToastrService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.loaderService.requests.indexOf(req.url)
    if (i >= 0) {
      this.loaderService.requests.splice(i, 1)
    }
    this.loaderService.isLoading.next(this.loaderService.requests.length > 0)
  }

  addRequest(req: HttpRequest<any>) {
    this.loaderService.requests.push(req.url)
    this.loaderService.isLoading.next(true)
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let isTokenExpired: boolean = false

    if ((request.method == 'POST')) null
    else this.addRequest(request)

    const token: string | null = this.authService.token
    if (token) {
      request = request.clone({ setHeaders: { authorization: token, 'Content-Type': 'application/json' } })
      // isTokenExpired = this.authService.isTokenExpired()
    }
    //&& !this.authService.canCallRefreshService
    // if (token && isTokenExpired) this.authService.wantToRefresh = true


    //    if (token && isTokenExpired && this.authService.wantToRefresh) {
    // this.authService.wantToRefresh = true
    // this.authService.canCallRefreshService = true
    //this.authService.logoutAfter()
    //  }

    let IsSuccess: boolean
    return next.handle(request).timeout(1800000).pipe(map((event: HttpEvent<any>): any => {
      if (event instanceof HttpResponse) {
        if (event?.status == 200 || event?.status == 201) {
          IsSuccess = true;
        }
        if (IsSuccess && event.body.message &&
          (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') && !(request.url.includes('auth/login'))) {
          this.toastr.success(event.body.message.split(' |').join(','), 'success');
        }
        this.removeRequest(request);
        if (!IsSuccess) return Observable.throw(this.toastr.error(event.body.message, 'error'))
        let data = event.body.data
        let copyEvent: any = event
        copyEvent.body = data
        return copyEvent;
      }
    }),
    ).catch(error => this.handleError(error, request))
  }

  handleError(err: HttpErrorResponse, request: HttpRequest<any>): Observable<any> {
    err.status === 500 || err.status === 400 || err.status === 401 ? err.error.message ? this.toastr.error(err.error.message, 'error') : null : null
    this.removeRequest(request)
    return Observable.throw(err)
  }

}
