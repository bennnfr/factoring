import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PagosService, ReportesService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import swal2 from 'sweetalert2';
import { Car, Facturas } from 'src/app/models/usuario.model';
import { FacturaSimulacion, Invoices } from 'src/app/models/facturas.model';
declare var $;

@Component({
  selector: 'app-decadena',
  templateUrl: './decadena.component.html',
  styles: []
})
export class DeCadenaComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              public _reportesservice: ReportesService,
              public _pagosservice: PagosService) {}

  cols: any[];
  a = new Date();
  fecha: string;
  cadenas: any[];
  cadenaso: any[] = [];
  correo: string;
  facturas: any[] = [];
  selectedFac: any[];
  idp: string;
  idcontribuyente: string;
  idcontfinan: string;
  pago: any[] = [];
  supplierpaymentid = '';
  totalFac = 0;
  totalFacs = '0';
  totalFacsFormateado = '0';


  ngOnInit() {

    this.a = new Date();

    (document.getElementById('npago') as HTMLInputElement).value = '';

    (document.getElementById('voucher') as HTMLInputElement).value = '';

    (document.getElementById('notas') as HTMLInputElement).value = '';

    this.totalFacs = '0';

    this.totalFacsFormateado = '0';

    this.cadenaso = [];

    this.cadenas = [];

    this.selectedFac = [];

    this.facturas = [];

    this.correo = '';

    this.idp = '';

    this.totalFac = 0;

    this._pagosservice.getCadenas().subscribe( resp => {this.cadenas = resp;
                                                            // tslint:disable-next-line: forin
                                                        for ( const prop in this.cadenas ) {
                                                             this.cadenaso.push( this.cadenas[prop].nombre_cadena);
                                                           }
                                                        this.cadenaso.sort();
    } );

    this.a.setMinutes( this.a.getMinutes() + this.a.getTimezoneOffset() );
    let montha = '' + (this.a.getMonth() + 1);
    let daya = '' + this.a.getDate();
    const yeara = this.a.getFullYear();

    if (montha.length < 2) {
        montha = '0' + montha;
    }
    if (daya.length < 2) {
        daya = '0' + daya;
    }

    this.fecha = [yeara, montha, daya].join('-');

    this.cols = [
      { field: 'folio_reporte', header: 'Folio Reporte' },
      { field: 'folio_factura', header: 'Folio Factura' },
      { field: 'uuid', header: 'UUID' },
      { field: 'monto_total', header: 'Monto Total' },
      { field: 'porcentaje_operado', header: 'Porcentaje Operado' },
      { field: 'emisor', header: 'Emisor' },
      { field: 'receptor', header: 'Receptor' },
      { field: 'moneda', header: 'Moneda' },
      { field: 'fecha_operacion', header: 'Fecha Operacion' },
      { field: 'fecha_vencimiento', header: 'Fecha Vencimiento' },
      { field: 'fecha_emision', header: 'Fecha Emision' },
      { field: 'fecha_carga', header: 'Fecha Carga' },
      { field: 'estatus', header: 'Estatus' }
    ];

  }

  getcorreo() {

    const cadena: any = document.getElementById('cadena');

    const valorcadena = cadena.options[cadena.selectedIndex].value;

    for ( const prop in this.cadenas ) {

      if ( this.cadenas[prop].nombre_cadena === valorcadena ) {
        this.idp = this.cadenas[prop].id_cadena;
        this.correo = this.cadenas[prop].email_contribuyente;
        this.idcontribuyente = this.cadenas[prop].id_contribuyente;
        this.idcontfinan = this.cadenas[prop].id_cont_finan;
        break;

      }

    }

  }

  getTotal() {

    this.totalFac = 0;
   // this.totalFacs = '0';
    let tp = 0;

    if ( this.selectedFac.length === 0 ) {

      this.totalFac = 0;

    } else {

      // tslint:disable-next-line: forin
      for ( const prop in this.selectedFac ) {

       // this.totalFac = this.totalFac + parseFloat(this.selectedFac[prop].monto_total);
       tp = tp + parseFloat(this.selectedFac[prop].monto_total.replace(/,/g, ''));

      }
    }
     // this.totalFacs = this.totalFac.toFixed(2);
    this.totalFacs = tp.toFixed(2);
    this.totalFacsFormateado = tp.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    

  }

  muestraFacturas() {

    const moneda: any = document.getElementById('moneda');

    const valormoneda = moneda.options[moneda.selectedIndex].value;

    swal2.fire({
      title: 'Cargando',
      allowOutsideClick: false
 });
    swal2.showLoading();

    this._pagosservice.getFacturasPagoCadena( this.idp, valormoneda ).subscribe( resp => {
                                                                                           swal2.close();
                                                                                           this.facturas = resp;
                                                                                           if ( this.facturas.length === 0 ) {
                                                                                              swal2.fire(
                                                                                                'No se encontraron Datos',
                                                                                                '',
                                                                                                'error'
                                                                                              );
                                                                                            }
    } , (err) => {
      swal2.close();
      swal2.fire(
           'Ocurrio un error',
           '',
           'error'
        );
      this.ngOnInit();
     } );

  }

  guardar() {

    if (this.selectedFac.length === 0) {

      swal2.fire(
        'Debe seleccionar al menos una Factura',
        '',
        'error'
      );

    } else {

      const tpago: any = document.getElementById('tdpago');
      const moneda: any = document.getElementById('moneda');

      const valortpago = tpago.options[tpago.selectedIndex].value;
      const valormoneda = moneda.options[moneda.selectedIndex].value;

      const params = {
        token: '',
        secret_key: '',
        payment_source: 'CADENA',
        invoices: [],
        payment: { payment_date: (document.getElementById('fecha') as HTMLInputElement).value,
                   payment_number: (document.getElementById('npago') as HTMLInputElement).value,
                   payment_type: valortpago,
                   currency: valormoneda,
                   amount: this.totalFacs,
                   email_cfdi: (document.getElementById('correo') as HTMLInputElement).value,
                   notes: (document.getElementById('notas') as HTMLInputElement).value,
                   voucher: (document.getElementById('voucher') as HTMLInputElement).value,
                   contributor_from_id: this.idcontribuyente,
                   contributor_to_id: this.idcontfinan
      }
      };
      // tslint:disable-next-line: forin
      for (const prop in this.selectedFac) {
        params.invoices[prop] = {id: this.selectedFac[prop].id_factura.toString() };
      }
      swal2.fire({
        title: 'Cargando',
        allowOutsideClick: false
   });
      swal2.showLoading();
      this._pagosservice.aplicarPagoRAWproveedor(params).subscribe( resp => {
        swal2.close();
        swal2.fire(
          'La informacion se registro con exito',
          '',
          'success'
        );
        this.ngOnInit();
      }, (err) => {
        swal2.close();
        console.log(err);
        swal2.fire(
             'Ocurrio un error',
             err.error.errors[0],
             'error'
          );
        this.ngOnInit();
       } );

  /*    swal2.fire({
        title: 'Cargando',
        allowOutsideClick: false
   });
      swal2.showLoading();

      this._pagosservice.aplicarPago(params).subscribe( resp => {
                                                                  swal2.close();

                                                                  // tslint:disable-next-line: forin
                                                                  for (const prop in this.selectedFac) {

                                                                  this._pagosservice.patchFacturascadena(this.selectedFac[prop].id_factura, resp).subscribe();


                                                                  }

                                                                  swal2.fire(
                                                                    'La informacion se registro con exito',
                                                                    '',
                                                                    'success'
                                                                  );
                                                                  this.ngOnInit();
      } , (err) => {
        swal2.close();
        console.log(err);
        swal2.fire(
             'Ocurrio un error',
             '',
             'error'
          );
        this.ngOnInit();
       } ); */

    }


  }

}







