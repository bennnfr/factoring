import { Component, OnInit } from '@angular/core';
import { TarifasService } from '../../services/service.index';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal2 from 'sweetalert2';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styles: []
})
export class TarifasComponent implements OnInit {

  constructor(
               public _tarifasservice: TarifasService,
               public http: HttpClient) { }

  token = localStorage.getItem('token');
  tarifas: any[] = [];
  cols: any[];
  selectedFac: any[];
  router: Router;

  ngOnInit() {

    this._tarifasservice.getTarifas().subscribe( resp => { this.tarifas = resp; } );

    this.cols = [

      { field: 'key', header: 'Key' },
      { field: 'start_date', header: 'Fecha Inicio' },
      { field: 'end_date', header: 'Fecha Fin' },
      { field: 'value', header: 'Valor' },
      { field: 'rate_type', header: 'Tipo' },
      { field: 'description', header: 'Descripcion' },
      { field: 'herramientas', header: 'Herramientas' }

  ];

  }

  borraTarifa( id: string ) {

    swal2.fire({
      title: 'Desea Eliminar la Tarifa',
      text: 'Seleccionada',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false
    }). then ( resp => {
      if ( resp.value) {

        this._tarifasservice.borraTarifa( id ).subscribe( () => {

          swal2.fire({
            title: 'La Tarifa',
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
