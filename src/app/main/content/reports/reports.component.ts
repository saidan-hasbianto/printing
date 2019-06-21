import { Component, OnInit } from '@angular/core';
import { MscustomergroupService } from '../../services/mscustomergroup.service';
import { Mscustomer } from '../../models/mscustomergroup';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';
import { ToastrService } from 'ngx-toastr';

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
    {id: '0', display_name: 'Paid'},
    {id: '1', display_name: 'Unpaid'}
  ];
  customerSelected : number;
  statusSelected : number;
  
  constructor(
    private formBuilder: FormBuilder,
    private custsvc: MscustomergroupService,
    private reportsvc: ReportsService,
    private toastr: ToastrService,
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
      statusOption : [''],
    })
  }

  NewOnSubmit() {
    this.reportsvc.getReports(this.customerSelected,this.statusSelected).subscribe(
      success => {
        console.log(success);
        if(success) {
          this.toastr.success('Success');
            this.reportsvc.getFile(this.customerSelected);
        }
        
      }
    )
  }
  
  onChooseStatus(statusId) {
    console.log(statusId);
    
    this.statusSelected = statusId;
  }

  onChooseCust(custId) {
    this.customerSelected = custId; 
  }
}
