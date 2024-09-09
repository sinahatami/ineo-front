import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {

  readonly subUrl: string = environment.API_URL
  readonly controlerName: string = 'auth'

  url: string = `${this.subUrl}/${this.controlerName}`


  wantToRefresh: boolean = false
  routeToDashboard() {
    this.router.navigateByUrl('main/dashboard')
  }

  login(body: any) { return this.http.post(`${this.url}/login`, body) }

  tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  canCallRefreshService = false
  refreshToken(body: any) {
    let tok: any = this.token
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: tok,
    })
    headers = { headers: headers }
    this.wantToRefresh = false
    this.canCallRefreshService = true
    return this.http.post(`${environment.API_URL}Users/Token/Refresh`, body, headers)
  }

  setToLocalStorage(token: string) {
    localStorage.setItem('Token', token)
  }

  clearLocalStorage() {
    localStorage.clear()
  }

  logout() { return this.http.post(`${this.url}/logout`, null) }

  logoutAfter() {
    this.clearLocalStorage()
    this.router.navigateByUrl('/auth/login')
  }

  get token(): string | null { return localStorage.getItem('Token') }

  constructor(private router: Router, private http: HttpClient) { }
}
