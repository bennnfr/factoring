import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContribuyentesService } from '../../services/service.index';
import { Privilegio, Usuario2 } from '../../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Key } from 'readline';
import swal2 from 'sweetalert2';
declare function init_plugins();

@Component({
  selector: 'app-segmentoscadena',
  templateUrl: './segmentoscadena.component.html',
  styles: []
})
export class SegmentosCadenaComponent implements OnInit {

  forma: FormGroup;
  idl: string;
  cadena: any[] = [];
  idcadena = '';
  nombrenegocio = '';
  cols: any[];
  segmentos: any[] = [];

  selectedSegmentos: any[] = [];
  newCar: boolean;
  car = {id: '', company_id: '', key: '', name: '', start_date: '', end_date: '', rate: '', fee: '', capacity: '', limit_days: '', expiration_day: '', expiration_type: '', status: '', token: '', secret_key: ''};
  displayDialog: boolean;
  cars: any[] = [];
  selectedCar: [];
  displayDialognuevo: boolean;
  constructor(
    private route: ActivatedRoute,
    public _contribuyentesService: ContribuyentesService,
    public router: Router
  ) { }


  ngOnInit() {

      this.idcadena = this.route.snapshot.paramMap.get('id');
      this.nombrenegocio = this.route.snapshot.paramMap.get('nombre');
      this._contribuyentesService.getCompanySegments(this.idcadena).subscribe( resp => this.segmentos = resp );
      this.cols = [
            { field: 'key', header: 'Clave' },
            { field: 'name', header: 'Nombre' },
            { field: 'start_date', header: 'Fecha inicio' },
            { field: 'end_date', header: 'Fecha fin' },
            { field: 'rate', header: 'Rate' },
            { field: 'fee', header: 'Fee' },
            { field: 'capacity', header: 'Capacidad' },
            { field: 'limit_days', header: 'Limite dias' },
            { field: 'expiration_day', header: 'Dia expiracion' },
            { field: 'expiration_type', header: 'Tipo expiracion' },
            { field: 'status', header: 'Estatus' }
        ];
  }

  onRowSelect(event) {
    this.newCar = false;
    this.car = this.cloneCar(event.data);
    this.displayDialog = true;
}

cloneCar(c) {
  let car = {id: '', company_id: '', key: '', name: '', start_date: '', end_date: '', rate: '', fee: '', capacity: '', limit_days: '', expiration_day: '', expiration_type: '', status: '', token: '', secret_key: ''};
  // tslint:disable-next-line: forin
  for (const prop in c) {
      car[prop] = c[prop];
  }
  return car;
}

showDialogToAdd() {
  this.newCar = true;
  this.car = {id: '', company_id: '', key: '', name: '', start_date: '', end_date: '', rate: '', fee: '', capacity: '', limit_days: '', expiration_day: '', expiration_type: '', status: '', token: '', secret_key: ''};
  this.displayDialognuevo = true;
}
save() {
  let cars = [...this.cars];

  if (this.newCar) {

    const d = new Date((document.getElementById('start_daten')as HTMLInputElement).value);
    d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    const startdaten = [year, month, day].join('-');

    const e = new Date((document.getElementById('end_daten')as HTMLInputElement).value);
    e.setMinutes( e.getMinutes() + e.getTimezoneOffset() );
    let monthe = '' + (e.getMonth() + 1);
    let daye = '' + e.getDate();
    const yeare = e.getFullYear();

    if (monthe.length < 2) {
        monthe = '0' + monthe;
    }
    if (daye.length < 2) {
        daye = '0' + daye;
    }

    const enddaten = [yeare, monthe, daye].join('-');

    this.car = {company_id: this.idcadena, id: '',
       key: (document.getElementById('keyn') as HTMLInputElement).value,
       name: (document.getElementById('namen') as HTMLInputElement).value,
       start_date: startdaten,
       end_date: enddaten,
       rate: (document.getElementById('raten') as HTMLInputElement).value,
       fee: (document.getElementById('feen') as HTMLInputElement).value,
       capacity: (document.getElementById('capacityn') as HTMLInputElement).value,
       limit_days: (document.getElementById('limit_daysn') as HTMLInputElement).value,
       expiration_day: (document.getElementById('expiration_dayn') as HTMLInputElement).value,
       expiration_type: (document.getElementById('expiration_typen') as HTMLInputElement).value,
       status: (document.getElementById('statusn') as HTMLInputElement).value,
       token: '',
       secret_key: ''};
    this.newCar = false;
    this.displayDialognuevo = false;
    this._contribuyentesService.guardaSegmento( this.idcadena, this.car ).subscribe( resp => {
      swal2.fire({
        title: 'Los datos fueron guardados',
        text: 'Con exito',
        icon: 'success',
        showConfirmButton: true,
        showCancelButton: false,
        allowOutsideClick: false
      }). then ( res => {

        if ( res.value ) {
         // window.location.reload();
         this.ngOnInit();
        }

      } );
    }, (err) => {
      console.log(err);
      swal2.fire(
           'Error al guardar los datos',
           '',
           'error'
        );
     } );
  } else {
  this.car = {company_id: this.car.company_id, id: this.car.id,
       key: this.car.key,
       name: this.car.name,
       start_date: this.car.start_date,
       end_date: this.car.end_date,
       rate: this.car.rate,
       fee: this.car.fee,
       capacity: this.car.capacity,
       limit_days: this.car.limit_days,
       expiration_day: this.car.expiration_day,
       expiration_type: (document.getElementById('expiration_type') as HTMLInputElement).value,
       status: (document.getElementById('status') as HTMLInputElement).value,
       token: '',
       secret_key: ''};
  this._contribuyentesService.actualizaSegmento(this.idcadena, this.car.id, this.car).subscribe( resp => {
    swal2.fire({
      title: 'Los datos fueron actualizados',
      text: 'Con exito',
      icon: 'success',
      showConfirmButton: true,
      showCancelButton: false,
      allowOutsideClick: false
    }). then ( res => {

      if ( res.value ) {
       // window.location.reload();
       this.ngOnInit();
      }

    });
  }, (err) => {
    console.log(err);
    swal2.fire(
         'Error al actualizar los datos',
         '',
         'error'
      );
   } );
  }
  this.cars = cars;
  this.car = null;
  this.displayDialog = false;
}

delete() {

  this._contribuyentesService.borraSegmento(this.idcadena, this.car.id).subscribe(resp => {

    swal2.fire({
      title: 'Los datos fueron borrados',
      text: 'Con exito',
      icon: 'success',
      showConfirmButton: true,
      showCancelButton: false,
      allowOutsideClick: false
    }). then ( res => {

      if ( res.value ) {
       // window.location.reload();
       this.ngOnInit();
      }

    } );
  }, (err) => {
    console.log(err);
    swal2.fire(
         'Error al borrar los datos',
         err.error.errors[0],
         'error'
      );
   } );

  this.displayDialog = false;

}


}
