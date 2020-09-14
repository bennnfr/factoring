import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import swal2 from 'sweetalert2';

declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;
  recuperacont = false;
  auth2: any;
  usuarios: any[] = [];

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
  //  this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }

  }

  recuperarcont() {
    this.recuperacont = !this.recuperacont;
    console.log(this.recuperacont);
  }

   /* googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '442737206823-dilej5tevnrv61sovd7bocf5qeafmjs3.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }

   attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token )
              .subscribe( () => window.location.href = '#/dashboard'  );

    });

  } */


  ingresar( forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password );

    this._usuarioService.login( usuario, forma.value.recuerdame )
                  .subscribe( correcto => {this.router.navigate(['/dashboard']); console.log(correcto);

                }, (err) => {
                  swal2.fire(
                       'Error al Acceder',
                       'Revise su informacion',
                       'error'
                    );
                 }  );

    // this.router.navigate([ '/dashboard' ]);

  }

  enviacrecuperacion() {
    const email = (document.getElementById('emailrec') as HTMLInputElement).value;
    this._usuarioService.getResetPaswword(email).subscribe( resp => { this.recuperacont = !this.recuperacont;  console.log(resp);
                                                                      swal2.fire(
        'El correo de recuperacion de contraseña fue enviado a:',
        email,
        'success'
     );
    }, (err) => {
      console.log(err);
      swal2.fire(
           'Error',
           err.error.errors[0],
           'error'
        );
     } );

  }

}
