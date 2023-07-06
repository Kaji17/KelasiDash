import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { NavConstants } from 'src/app/constants/nav.const';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  items!: MenuItem[];
  icons: string = 'pi pi-bars';
  admin: string;
  navItem : any[]

  dispas: boolean = false;
  constructor(private route: Router) {}
  ngOnInit(): void {
    this.admin = 'Kelasi';
    this.navItem = NavConstants
    this.items = [
      {
        label: 'Aller sur profil',
        icon: 'pi pi-user',
        routerLink: ['/administration/profil'],
      },
      { separator: true },
      {
        label: 'Se déconnecter',
        icon: 'pi pi-sign-out',
        command: () => {
          // localStorage.removeItem('user-info')
          this.route.navigate(['/session']);
        },
      },
    ];
  }

  show(): boolean {
    console.log(this.dispas);
    if (this.dispas) {
      this.dispas = false;
      this.icons = 'pi pi-bars';
    } else {
      this.dispas = true;
      this.icons = 'pi pi-times';
    }

    return this.dispas;
  }

  onNav(url: string) {
    this.route.navigate([url]);
    this.dispas = true;
  }

  onViewProfile() {}

  logOut() {}
}
