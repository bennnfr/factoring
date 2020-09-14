import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/service.index';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal2 from 'sweetalert2';

@Component({
  selector: 'app-rolesoptions',
  templateUrl: './rolesoptions.component.html',
  styles: []
})
export class RolesOptionsComponent implements OnInit {

  constructor(
               public _roleService: RolesService,
               public http: HttpClient) { }

  token = localStorage.getItem('token');
  roles: any[] = [];
  cols: any[];
  selectedFac: any[];
  router: Router;
  prueba: any[] = [];

  ngOnInit() {

    this._roleService.getRoles().subscribe( resp => { this.roles = resp; } );

   // this._roleService.prueba().subscribe( resp => { this.prueba = resp; console.log(this.prueba) } )

    this.cols = [

      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'description', header: 'Descripcion' },
      { field: 'herramientas', header: 'Opciones' }

  ];

  }

  borraRol( id: string ) {

    swal2.fire({
      title: 'Desea Eliminar el Rol',
      text: 'Seleccionado',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false
    }). then ( resp => {
      if ( resp.value) {

        this._roleService.borrarRol( id ).subscribe( () => {

          swal2.fire({
            title: 'El Rol',
            text: 'fue eliminado con exito',
            icon: 'success',
            showConfirmButton: true,
            showCancelButton: false,
            allowOutsideClick: false
          }). then ( res => {

            if ( res.value ) {
              this.ngOnInit();
            }

          } );

        } );

      }
    });

  }


}
