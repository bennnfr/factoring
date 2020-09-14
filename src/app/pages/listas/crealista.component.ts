import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListasService } from '../../services/service.index';
import { Privilegio, Usuario2 } from '../../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-crealista',
  templateUrl: './crealista.component.html',
  styles: []
})
export class CreaListaComponent implements OnInit {

  forma: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public _listasservice: ListasService,
    public router: Router
  ) { }


  ngOnInit() {


      this.forma = new FormGroup({
        dominio: new FormControl( null , Validators.required ),
        key: new FormControl( null , Validators.required ),
        valor: new FormControl( null , Validators.required ),
        descripcion: new FormControl( null , Validators.required )

      } );

  }


  registrarLista() {

    const valorDominio = this.forma.value.dominio;
    const valorkey = this.forma.value.key;
    const valorValor = this.forma.value.valor;
    const valorDescripcion = this.forma.value.descripcion;



    // console.log(privilegio);
    this._listasservice.crearLista(valorDominio, valorkey, valorValor, valorDescripcion).subscribe( () => {this.router.navigate(['/listas']),
    Swal.fire(
      'Creacion de Lista',
      'Exitosa',
      'success'
   ); }, (err) => {
                            Swal.fire(
                              'Error al crear Lista',
                              'Error',
                              'error'
                           );
                        } );

  }


}
