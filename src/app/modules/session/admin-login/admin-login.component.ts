import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { UtilisService } from 'src/app/shared/services/utilis.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  providers: [MessageService]

})
export class AdminLoginComponent implements OnInit {
  value!: string;
  value1!: string;
  loading: boolean = false;
  formSignUp!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private adminService: AdminService,
    private utilis: UtilisService,
    private messageService: MessageService,

    ) {}

  ngOnInit(): void {
    this.buildForm()
  }

  // Construction du formulaire
  buildForm(){
    this.formSignUp = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  // Méthode permetant un chargement de 2s avant la validation du formulaire
  handleOk() {
    let res= this.formSignUp.value
    this.login(res)
    // setTimeout(() => {
      
    // }, 2000);
  }

  login(obj:any){
    this.loading = true;
    this.adminService.login(obj).subscribe({
      next: data=>{
        this.utilis.response(data, (d:any)=>{
          this.loading = false
          console.log(d)
          if(data.status==204){
            this.loading=false
            this.messageService.add({
              severity: 'error',
              summary: 'Attention',
              detail: 'Mettez les bons identifiants',
            })
          }
          else{
            localStorage.setItem('user_info',JSON.stringify(d))
            this.route.navigate(['administration'])
          }
         
        })
      },
      error: (error) => {
        this.utilis.response(error,(d:any)=>{
          this.loading=false
          this.messageService.add({
            severity: 'error',
            summary: 'Attention',
            detail: 'Mettez les bons identifiants',
          })
        })
      }
    })
  }
}
