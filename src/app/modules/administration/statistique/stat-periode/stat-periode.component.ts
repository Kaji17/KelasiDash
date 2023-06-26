import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stat-periode',
  templateUrl: './stat-periode.component.html',
  styleUrls: ['./stat-periode.component.scss'],
})
export class StatPeriodeComponent implements OnInit, OnChanges {
 
  @Input()data:any
  cities: any[];
  selectedCity: any;
  periodes:any=[{fr:'jour',eng:'day'},{fr:'semaine',eng:'week'},{fr:'mois',eng:'month'},{fr:'annee',eng:'year'}];

  selectedPeriode:any={fr:'jour',eng:'day'}
  
  ngOnInit(): void {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                type: 'line',
                label: 'Moyenne',
                borderColor: '#42A5F5',
                borderWidth: 2,
                fill: false,
                data: [
                    50,
                    25,
                    12,
                    48,
                    56,
                    76,
                    42
                ]
            }, {
                type: 'bar',
                label: 'Succes',
                backgroundColor: '#39A74B',
                data: [
                    21,
                    84,
                    24,
                    75,
                    37,
                    65,
                    34
                ],
                borderColor: 'white',
                borderWidth: 2
            }, {
                type: 'bar',
                label: 'Echec',
                backgroundColor: '#EE6060',
                data: [
                    41,
                    52,
                    24,
                    74,
                    23,
                    21,
                    32
                ]
            }]
          }
  }

  ngOnChanges(): void {

  }

  handleChange(event:any,mode:any,obj?:any){
    console.log(event)
    if(mode=='litliv'){
      // this.getTauxLitigeLivreur(event.value.livreurid)
    }
    if(mode=='chiffre'){
      // this.getChiffreAffaire(event.value.eng)
    }
  }

  


}
