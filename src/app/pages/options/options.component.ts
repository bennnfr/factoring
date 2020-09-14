import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../../services/service.index';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal2 from 'sweetalert2';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styles: []
})
export class OptionsComponent implements OnInit {

  constructor(
               public _optionsservice: OptionsService,
               public http: HttpClient ) { }

  token = localStorage.getItem('token');
  options: any[] = [];
  cols: any[];
  selectedFac: any[];
  router: Router;

  ngOnInit() {

    this._optionsservice.getOptions().subscribe( resp => { this.options = resp; } );

    this.cols = [

      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'description', header: 'Descripcion' },
      { field: 'group', header: 'Grupo' },
      { field: 'url', header: 'URL' },
      { field: 'herramientas', header: 'Herramientas' }

  ];

  }

  borraOption( id: string ) {

    swal2.fire({
      title: 'Desea Eliminar la opcion',
      text: 'Seleccionada',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false
    }). then ( resp => {
      if ( resp.value) {

        this._optionsservice.borrarOption( id ).subscribe( () => {

          swal2.fire({
            title: 'La opcion',
            text: 'fue eliminada con exito',
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
