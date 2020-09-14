import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ɵConsole } from '@angular/core';
import { FacturasService } from '../../services/service.index';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-altafacturas',
  templateUrl: './altafacturas.component.html',
  styles: []
})
export class AltaFacturasComponent implements OnInit {

  currency: any[] = [];
  estatus: any[] = [];
  xmlData: string;
  datosxml: any[] = [];

  constructor( public _facturasservice: FacturasService,
               public http: HttpClient,
               public router: Router ) {}

  ngOnInit() {

    this._facturasservice.getInvoiceCurrency().subscribe( resp => this.currency = resp );
    this._facturasservice.getInvoiceStatus().subscribe( resp => this.estatus = resp );

  }

  formatoFecha( fecha: string ) {

    const a = new Date((document.getElementById(fecha)as HTMLInputElement).value);
    a.setMinutes( a.getMinutes() + a.getTimezoneOffset() );
    let montha = '' + (a.getMonth() + 1);
    let daya = '' + a.getDate();
    const yeara = a.getFullYear();

    if (montha.length < 2) {
        montha = '0' + montha;
    }
    if (daya.length < 2) {
        daya = '0' + daya;
    }

    const resul = [yeara, montha, daya].join('-');

    return resul;

  }

  xml(xmlData) {

    const XmlReader = require('xml-reader');
    const reader = XmlReader.create();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../../../assets/xml/1.xml');
    xhr.responseType = 'text';
    xhr.onload = function () {
      if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {


              const xml = xmlData; // xhr.response;
              reader.on('done', data => {console.log(data);});
              reader.parse(xml);
              console.log(reader.parse(xml));


          }
      }
  };

    xhr.send(null);

  } 

  readFile = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
   // this.xml(file)
    if (!file) {
      console.log('hola2');
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
        this.xmlData = (evt as any).target.result;
        this.xml(this.xmlData);
    };
    reader.readAsText(file);
}

  guardaFactura() {

    const moneda: any = document.getElementById('currency');
    const estatus: any = document.getElementById('status');

    const valormoneda = moneda.options[moneda.selectedIndex].value;
    const valorestatus = estatus.options[estatus.selectedIndex].value;

    const data = {
      token: '',
      secret_key: '',
      emitter_rfc: (document.getElementById('emitter_rfc') as HTMLInputElement).value,
      receiver_rfc: (document.getElementById('receiver_rfc') as HTMLInputElement).value,
      document_type: (document.getElementById('document_type') as HTMLInputElement).value,
      invoice_serie: (document.getElementById('invoice_serie') as HTMLInputElement).value,
      invoice_folio: (document.getElementById('invoice_folio') as HTMLInputElement).value,
      invoice_date: this.formatoFecha('invoice_date'),
      entry_date: this.formatoFecha('entry_date'),
     // used_date: this.formatoFecha('used_date'),
     // due_date: this.formatoFecha('due_date'),
      currency: valormoneda,
     // exchange_rate: (document.getElementById('exchange_rate') as HTMLInputElement).value,
      total: (document.getElementById('total') as HTMLInputElement).value,
     // total_used: (document.getElementById('total_used') as HTMLInputElement).value,
      status: valorestatus,
      xml: (document.getElementById('xml') as HTMLInputElement).value,
      pdf: (document.getElementById('pdf') as HTMLInputElement).value,
    //  payment_report_folio: (document.getElementById('payment_report_folio') as HTMLInputElement).value,
    //  charge_report_folio: (document.getElementById('charge_report_folio') as HTMLInputElement).value,
      uuid: (document.getElementById('uuid') as HTMLInputElement).value
     /* on_request: (document.getElementById('on_request') as HTMLInputElement).value,
      rug: (document.getElementById('rug') as HTMLInputElement).value,
      company_id: (document.getElementById('company_id') as HTMLInputElement).value,
      supplier_id: (document.getElementById('supplier_id') as HTMLInputElement).value,
      company_payment_id: (document.getElementById('company_payment_id') as HTMLInputElement).value,
      supplier_payment_id: (document.getElementById('supplier_payment_id') as HTMLInputElement).value,
      order_id: (document.getElementById('order_id') as HTMLInputElement).value */

  };

    this._facturasservice.guardaFactura(data).subscribe( () => {
    Swal.fire(
      'Alta de Factura',
      'Exitosa',
      'success'
   ); window.location.reload(); }, (err) => {
                            console.log(err);
                            Swal.fire(
                              'Error al dar de alta la Factura',
                              err.error.errors[0],
                              'error'
                           );
                        } );

  }

}







