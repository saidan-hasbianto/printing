import { Component, OnInit } from '@angular/core';
import { JobordersService } from '../../services/joborders.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Joborders2, JobOrderDtls } from '../../models/joborders';
import { Msdeliveryaddr } from '../../models/msdeliveryaddr';
import { Msoperator } from '../../models/msoperator';
import { ActivatedRoute } from '@angular/router';
import { group } from '@angular/animations';
import { Mscustomer } from '../../models/mscustomergroup';
import { MscustomergroupService } from '../../services/mscustomergroup.service';
import { MsoperatorService } from '../../services/msoperator.service';

@Component({
  selector: 'fuse-joborder-view',
  templateUrl: './joborder-view.component.html',
  styleUrls: ['./joborder-view.component.scss']
})
export class JoborderViewComponent implements OnInit {
  joform: FormGroup;
  joDtls: JobOrderDtls[];
  type: string;
  jo: Joborders2 = {id: null, jobOrderNo: null, customer: null, product: null, type: null, qty: null, price: null, markup: null, fileSource: null, fileName: null };
  jo2: Joborders2;
  sub: any;
  loadingbar = true;
  paramId: number;
  dlvaddr: Msdeliveryaddr;
  ops: Msoperator;
  statusOption = [
    {value: 'C', display_name: 'Create'},
    {value: 'W', display_name: 'Waiting'},
    {value: 'P', display_name: 'Pending'},
    {value: 'D', display_name: 'Done'}
  ];

  typesOption = [
    {value: 'BW', display_name: 'BW'},
    {value: 'S', display_name: 'Sparasi'}
  ];

  filesourceOption = [
    {value: 'C', display_name: 'CD / DVD'},
    {value: 'F', display_name: 'Flash Disk'},
    {value: 'E', display_name: 'Email'}
  ];
  custOption: Mscustomer[];
  rows: number[] = [1];

  constructor(
    private formBuilder: FormBuilder,
    private josvc: JobordersService,
    private custsvc: MscustomergroupService,
    private opsSvc: MsoperatorService,
    private _location: Location,
    private route: ActivatedRoute,
  ) {
    this.joform = formBuilder.group({
      jobOrderNo: [''],      refNo: [''], orderDate: [''], completionDate: [''],
      remarks: [''], status: [''], customer: [''], deliveryAddress: [''],
      operator: [''], price: ['']
    });
   }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.paramId = Number.parseInt(params['id']);
      if (this.paramId) {
        this.loadingbar = false;

        this.josvc.getJO2(this.paramId)
          .subscribe(res => {
           // console.log(res);
           this.jo2 = res;
           this.joDtls = this.jo2['jobOrderDetails'];
            console.log(this.jo2);
           if (this.jo2.status === 'C')
           {
             this.jo2.status = 'Create';
           }
           else if (this.jo2.status === 'W')
            {
              this.jo2.status = 'Working';
            }
            else if (this.jo2.status === 'P')
            {
              this.jo2.status = 'Pending';
            }
            else
            {
              this.jo2.status = 'Done';
            }
            const num = Number (this.jo2.operator);
            this.opsSvc.getItem(num).subscribe(result => this.jo2.operator = result.name);

            this.joform = this.formBuilder.group({
            // id : this.jo2.id,
            jobOrderNo : [this.jo2.jobOrderNo], refNo : this.jo2.refNo,
            orderDate : this.jo2.orderDate,    completionDate : this.jo2.completionDate,  remarks: this.jo2.remarks,
            status : this.jo2.status,
            customer : this.jo2['customerName'],
            deliveryAddress : this.jo2.deliveryAddress,
            operator : this.jo2['operatorName']
            });


          this.loadingbar = true;
      });
    }});

  }

}
