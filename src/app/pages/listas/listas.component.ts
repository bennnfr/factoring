import { Component, OnInit } from '@angular/core';
import { ListasService } from '../../services/service.index';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal2 from 'sweetalert2';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styles: []
})
export class ListasComponent implements OnInit {

  constructor(
               public _listasService: ListasService,
               public http: HttpClient) { }

  token = localStorage.getItem('token');
  listas: any[] = [];
  cols: any[];
  selectedFac: any[];
  router: Router;

  ngOnInit() {

    this._listasService.getListas().subscribe( resp => { this.listas = resp; } );

    this.cols = [

      { field: 'id', header: 'ID' },
      { field: 'domain', header: 'Dominio' },
      { field: 'key', header: 'Key' },
      { field: 'value', header: 'Valor' },
      { field: 'description', header: 'Descripcion' },
      { field: 'herramientas', header: 'Herramientas' }

  ];

  }

  borraLista( id: string ) {

    swal2.fire({
      title: 'Desea Eliminar la Lista',
      text: 'Seleccionada',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false
    }). then ( resp => {
      if ( resp.value) {

        this._listasService.borrarLista( id ).subscribe( () => {

          swal2.fire({
            title: 'La Lista',
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
