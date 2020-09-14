import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ContribuyentesService, MantenimientoContribuyentesService } from '../../services/service.index';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $;

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  title = 'angularpopup';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  constructor() { }
  show(){
    this.showModal = true; // Show-Hide Modal Check
  }
  hide() {
    this.showModal = false;
  }
  ngOnInit() {

}

guardaDireccion() {
  const d = new Date((document.getElementById('dppd_date')as HTMLInputElement).value);
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

  const fechaesc = [year, month, day].join('-');

  const params = {

    document_type: (document.getElementById('dpdocument_type')as HTMLInputElement).value,
    description: (document.getElementById('dpdescription')as HTMLInputElement).value,
    pd_number: (document.getElementById('dppd_number')as HTMLInputElement).value,
    pd_book: (document.getElementById('dppd_book')as HTMLInputElement).value,
    pd_date: fechaesc,
    rug: (document.getElementById('dprug')as HTMLInputElement).value,
    document: (document.getElementById('dpdocument')as HTMLInputElement).value,
    token: '',
    secret_key: ''

    };

  console.log(params);
  this.ngOnInit();
}

  }







