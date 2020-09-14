import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OptionsService } from '../../services/service.index';
import { Privilegio, Usuario2 } from '../../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-actualizaoption',
  templateUrl: './actualizaoption.component.html',
  styles: []
})
export class ActualizaOptionComponent implements OnInit {

  forma: FormGroup;
  ido: string;
  option: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public _optionsservice: OptionsService,
    public router: Router
  ) { }


  ngOnInit() {

      this.ido = this.route.snapshot.paramMap.get('id');

      this.forma = new FormGroup({
        Name: new FormControl( null , Validators.required ),
        Descripcion: new FormControl( null , Validators.required )
      } );

      this._optionsservice.getOption( this.ido ).subscribe( resp => { this.option = resp; } );

  }


  actualizaOption() {

    // Obtener el elemento por el id
    const Nombre: any = document.getElementById('Nombre');
    const Descripcion: any = document.getElementById('Descripcion');
    const Grupo: any = document.getElementById('Grupo');
    const URL: any = document.getElementById('URL');
// Obtener el valor de la opción seleccionada

    const valorNombre = Nombre.value;
    const valorDescripcion = Descripcion.value;
    const valorGrupo = Grupo.value;
    const valorURL = URL.value;

    this._optionsservice.actualizaOption( this.ido, valorNombre, valorDescripcion, valorGrupo, valorURL).subscribe( () => {this.router.navigate(['/options']),
    Swal.fire(
      'Modificacion de Opcion',
      'Exitosa',
      'success'
   ); }, (err) => {
                            Swal.fire(
                              'Error al modificar Opcion',
                              'Error',
                              'error'
                           );
                        } );

  }


}
