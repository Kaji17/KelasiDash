import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  items!: MenuItem[];

  dispas: boolean= false
  constructor(private route: Router) {}
  ngOnInit(): void {
    this.items = [
      {
        label: 'Aller sur profil',
        icon: 'pi pi-user', 
        routerLink: ['/administration/configurations/parametres/profil'],
      },
      {separator: true},
      {label: 'Se déconnecter', icon: 'pi pi-sign-out', command: () => {
          // localStorage.removeItem('user-info')
          this.route.navigate(['/session'])
      }},  
  ];
  }

  show(): boolean{
    console.log(this.dispas=!this.dispas)
    return this.dispas!=this.dispas
  }

  onNav(url: string) {
    this.route.navigate([url]);
  }

  onViewProfile(){

  }

  logOut(){

  }
}
