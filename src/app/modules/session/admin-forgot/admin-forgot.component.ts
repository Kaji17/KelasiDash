import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-forgot',
  templateUrl: './admin-forgot.component.html',
  styleUrls: ['./admin-forgot.component.scss'],
})
export class AdminForgotComponent implements OnInit {
  value!: string;
  value1!: string;
  loading: boolean = false;
  formResetPassword!: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: Router) {}

  ngOnInit(): void {
    this.buildForm();
  }

  // Construction du formulaire
  buildForm() {
    this.formResetPassword = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,100}$'),
        ],
      ],
    });
  }

  // Méthode permetant un chargement de 2s avant la validation du formulaire
  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.onSendOTP();
    }, 2000);
  }

  onSendOTP() {
    this.route.navigate(['session/reset-password']);
  }
}
