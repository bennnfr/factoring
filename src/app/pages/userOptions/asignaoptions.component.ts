import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserOptionsService, UsuarioService } from '../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Idd } from '../../models/usuario.model';
declare var $;

@Component({
  selector: 'app-asignaoptions',
  templateUrl: './asignaoptions.component.html',
  styles: []
})
export class AsignaOptionsComponent implements OnInit {

  optionsfiltradas: any[] = [];
  options: any[] = [];
  datosTabla: Observable<any[]> = new Observable();
  sourceCars: any[];
  usuarioOptions: any[] = [];
  cols: any[];
  selectedColumns: any[];
  seleccion: Idd;
  selecciona: Idd;
  colso: any[];
  resul: any[] = [];
  agregar = false;
  seleccionOptions: any[] = [];
  idu: string;
  nombreUsuaOp: string;
  subscription: Subscription;

  constructor( public _optionsservice: UserOptionsService,
               public _usuariosservice: UsuarioService,
               public router: Router,
               public http: HttpClient,
               private route: ActivatedRoute ) {

                }

  ngOnInit() {

    this.usuarioOptions = [];
    this.options = [];
    this.seleccionOptions = [];

    this.idu = this.route.snapshot.paramMap.get('id');

    this._optionsservice.getUsuario(this.idu).subscribe( (resp: string) =>  this.nombreUsuaOp = resp  );

    this.subscription = this._optionsservice.getOptions()
    .subscribe( resp => { this.options = resp; // console.log(this.options);
                          this._usuariosservice.getUsuarioOptions(this.idu)
                          .subscribe( resp2 => {this.usuarioOptions = resp2; // console.log(this.usuarioOptions);
                                                if (this.usuarioOptions.length === 0) {
                                                  this.seleccionOptions = this.options;
                                                } else {
                                                // tslint:disable-next-line: forin
                                                for (const i in this.options) {
                                                  // tslint:disable-next-line: forin
                                                for (const j in this.usuarioOptions) {

                                                  if ( parseInt(this.options[i].id, 10) === parseInt(this.usuarioOptions[j].option_id, 10) ) {
                                                    this.agregar = false;
                                                    break;
                                                  } else {
                                                    this.agregar = true;

                                                  }
                                                                                     }
                                                if (this.agregar) {
                                                  this.seleccionOptions.push(this.options[i]);
                                                  this.agregar = false;
                                                }
                                                                                }
                                                        }
                                                      //  console.log(this.usuarioOptions);
                                                    });

                          } ); 

  //  this._optionsservice.getOptions().subscribe( resp => { console.log(resp) } );
  //  this._usuariosservice.getUsuarioOptions(this.idu).subscribe(resp => { console.log(resp) } );

    this.cols = [

      { field: 'name', header: 'Opciones Disponibles' }
  ];

    this.colso = [

    { field: 'name', header: 'Opciones Asignadas al Usuario' }
];

  }

  regreso() {
    this._optionsservice.getOptions().subscribe( resp => { this.options = resp; return this} );
  }

  agregaOption( ido: string ) {
    this._optionsservice.agregaOption( this.idu, ido ).subscribe();
    setTimeout(() => {
      this.refresh();
    }, 100);


  }

  quitarOption( idq: string ) {
    this._optionsservice.quitarOption(idq).subscribe();

    setTimeout(() => {
      this.refresh();
    }, 100);

  }

  refresh() {

    this.ngOnInit();
  // window.location.reload();
  }

}







