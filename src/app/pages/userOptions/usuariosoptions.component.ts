import { Component, OnInit } from '@angular/core';
import { UsuarioService, PrivilegiosUsuariosService } from '../../services/service.index';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-usuariosoptions',
  templateUrl: './usuariosoptions.component.html',
  styles: []
})
export class UsuariosOptionsComponent implements OnInit {

  constructor( public _usuarioservice: UsuarioService,
               public _privilegiosusuarios: PrivilegiosUsuariosService,
               public http: HttpClient) { }

  token = localStorage.getItem('token');
  usuarios: any[] = [];
  cols: any[];
  selectedFac: any[];
  router: Router;

  ngOnInit() {

    this._usuarioservice.getUsuarios().subscribe(resp => {this.usuarios = resp; } );

    this.cols = [

      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'email', header: 'Correo' },
      { field: 'privilegios', header: 'Opciones' }

  ];

  }


}
