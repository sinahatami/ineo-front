import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from '../Interfaces/IMenu';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }


  menuList: IMenu[] = [
    { name: 'Dashboard', icon: 'fa-solid fa-house', routeUrl: 'main/dashboard' },
    { name: 'Board', icon: 'fa-solid fa-list-check', routeUrl: 'main/board' },
    { name: 'Users', icon: 'fa-solid fa-user', routeUrl: 'main/users' }
  ]

  isSidebarActive: boolean = false;
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  activeItem: IMenu
  itemClicked(item: IMenu) {
    this.activeItem = item
    this.router.navigateByUrl(this.activeItem.routeUrl)
  }

  goToDashboard() {
    this.router.navigateByUrl('main/dashboard')
  }

  logout() { this.router.navigateByUrl('auth/logout') }

  ngOnInit(): void {
    this.activeItem = this.menuList[0]
  }

}
