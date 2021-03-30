import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private authService:AuthService
    ) {
    // redirigir a home si ya inició sesión
    if (this.authService.currentUserValue){
        this.router.navigate(['/']);
      }
    }
    
  ngOnInit(): void {
    this.createForm();
    // Obtener URL de retorno de los parámetros de ruta o por defecto a '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  createForm(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

   // Obtención de conveniencia para un fácil acceso a los campos de formulario
  get form() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;
    // para aqui si el formulario no es valido
    if( this.loginForm.invalid ){
      return;
    }

    this.loading = true;
    this.authService.login(this.form.username.value, this.form.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error.error.message;
          this.loading = false;
        }
      )
  }

}
