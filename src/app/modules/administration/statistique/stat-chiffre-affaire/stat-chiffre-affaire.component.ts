import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-chiffre-affaire',
  templateUrl: './stat-chiffre-affaire.component.html',
  styleUrls: ['./stat-chiffre-affaire.component.scss']
})
export class StatChiffreAffaireComponent implements OnInit{

  basicData: any;

  ngOnInit() {
    this.basicData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: "Chiffre d'affaire",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#42A5F5',
                tension: .4
            }
            
            
        ]
    };
  }


}
