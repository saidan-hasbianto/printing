import { Component, OnInit } from '@angular/core';
import { MscustomergroupService } from '../../services/mscustomergroup.service';
import { Mscustomer } from '../../models/mscustomergroup';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  custOption: Mscustomer[] = [];
  statusOption = [
    {value: '0', display_name: 'Paid'},
    {value: '1', display_name: 'Unpaid'}
  ];
  
  constructor(
    private formBuilder: FormBuilder,
    private custsvc: MscustomergroupService,
  ) {
    this.formErrors = {
      customer : {},
      statusOption : {}
      }
   }

  ngOnInit() {
    this.custsvc.getRows().subscribe(res => this.custOption = res);

    this.form = this.formBuilder.group({
      customer : ['', Validators.required],
      statusOption : ['', Validators.required],
    })
  }

  NewOnSubmit() {
    
  }
}
