import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  value!: string;
  value1!: string;
  loading: boolean = false;
  formSignUp!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router
    ) {}

  ngOnInit(): void {
    this.buildForm()
  }

  // Construction du formulaire
  buildForm(){
    this.formSignUp = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,100}$')]],
      password: ['', [Validators.required]]
    })
  }

  // Méthode permetant un chargement de 2s avant la validation du formulaire
  load() {
    this.loading = true;
    
    setTimeout(() => {
      this.loading = false;
      this.login()
    }, 2000);
  }

  login(){
    this.route.navigate(['administration'])
  }
}
