import { Component } from '@angular/core';
import { AuthService } from '../providers/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  constructor(private authService: AuthService) { }

  logout() { this.authService.logout().subscribe((res: any) => this.authService.logoutAfter()) }

  ngOnInit(): void {
    this.logout()
    localStorage.clear()
  }
}
