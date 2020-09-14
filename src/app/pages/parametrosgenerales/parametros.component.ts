import { Component, OnInit } from '@angular/core';
import { ParametrosGeneralesService } from '../../services/service.index';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal2 from 'sweetalert2';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styles: []
})
export class ParametrosComponent implements OnInit {

  constructor(
               public _parametrosService: ParametrosGeneralesService,
               public http: HttpClient ) { }

  token = localStorage.getItem('token');
  parametros: any[] = [];
  cols: any[];
  selectedFac: any[];
  router: Router;

  ngOnInit() {

    this._parametrosService.getParametros().subscribe( resp => { this.parametros = resp; } );

    this.cols = [

      { field: 'id', header: 'ID' },
      { field: 'table', header: 'Table' },
      { field: 'id_table', header: 'Id_Table' },
      { field: 'key', header: 'Key' },
      { field: 'description', header: 'Descripcion' },
      { field: 'used_values', header: 'Used_Values' },
      { field: 'value', header: 'Valor' },
      { field: 'documentation', header: 'Documentacion' },
      { field: 'herramientas', header: 'Herramientas' }

  ];

  }

  borraParametro( id: string ) {

    swal2.fire({
      title: 'Desea Eliminar el Parametro',
      text: 'Seleccionado',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false
    }). then ( resp => {
      if ( resp.value) {

        this._parametrosService.borrarParametro( id ).subscribe( () => {

          swal2.fire({
            title: 'El Parametro',
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
