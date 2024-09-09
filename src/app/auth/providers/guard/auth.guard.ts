import { Injectable, Type } from '@angular/core'
import { CanActivate } from '@angular/router'
import { AuthService } from '../auth/auth.service'

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(): boolean {
    const token: string | null = this.authService.token

    if (!token) {
      this.authService.logout()
      return false
    }

    if (this.authService.tokenExpired(token)) {
      let body = { Token: this.authService.token }
      this.authService.refreshToken(body).subscribe((res: any): boolean => {
        if (res.Valid) {
          this.authService.setToLocalStorage(res.access_token)
          this.authService.wantToRefresh = false
          return true
        }
        else return false
      },
        _ => {
          this.authService.wantToRefresh = false
          this.authService.logout().subscribe(_ => this.authService.logoutAfter(), _ => this.authService.logoutAfter())
        }
      )
    }

    return true
  }
}
