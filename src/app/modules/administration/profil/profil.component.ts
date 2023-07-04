import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  oldP:string
  formSignUp!: FormGroup;
  change():void{

  }
}
