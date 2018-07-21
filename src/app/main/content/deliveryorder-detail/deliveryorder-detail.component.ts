import { Component, OnInit } from '@angular/core';
import { Deliveryorder, DeliveryorderDtls, DeliveryorderDtls2, Deliveryorder2 } from '../../models/deliveryorder';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeliveryorderService } from '../../services/deliveryorder.service';
import { ToastrService } from 'ngx-toastr';
import { LogErrorHandleService } from '../../services/log-error-handle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Joborders2, Joborders, JobOrderDtls } from '../../models/joborders';
import { JobordersService } from '../../services/joborders.service';

@Component({
  selector: 'fuse-deliveryorder-detail',
  templateUrl: './deliveryorder-detail.component.html',
  styleUrls: ['./deliveryorder-detail.component.scss']
})
export class DeliveryorderDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  DO: Deliveryorder;
  doDtls: DeliveryorderDtls[];
  joOption: Joborders[];
  jo: Joborders;
  joDtls: JobOrderDtls[];
  sub: any;
  loadingbar = true;
  divVal = true;
  editing = {};
  selected = [];
  selectedData: DeliveryorderDtls[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dosvc: DeliveryorderService,
    private _location: Location,
    private logErrorHandle: LogErrorHandleService,
    private toastr: ToastrService,
    private josvc: JobordersService
  ) {
    this.formErrors = {
      doNo : {},
      doDate : {},
      jobOrder : {}
    };
  }

  ngOnInit() {
    this.josvc.getJOUndlvrd().subscribe(res => this.joOption = res);
    this.form = this.formBuilder.group({
      id: [''],
      doNo : ['', Validators.required],
      doDate  : ['', Validators.required],
      jobOrder : ['', Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id)
      {
        this.loadingbar = false;

        this.dosvc.getDO(id)
        .subscribe(res => {
          this.DO = res;
          console.log(res);
          console.log(res.jobOrder);
          const joid = Number (res.jobOrder);
          this.form.setValue({
            id: this.DO.id,
            doNo: this.DO.doNo,
            doDate: this.DO.doDate,
            jobOrder: this.DO.jobOrder
            });
            this.josvc.getJO1(joid).subscribe(hasil =>
              {
                this.joDtls = hasil.OrderDetails;
              }
            );
        this.loadingbar = false;
        });
      }});
      this.form.valueChanges.subscribe(() => {
        this.onFormValuesChanged();
      });
  }

  onFormValuesChanged()
  {
      for ( const field in this.formErrors )
      {
          if ( !this.formErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.formErrors[field] = {};

          // Get the control
          const control = this.form.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.formErrors[field] = control.errors;
          }
      }
  }

  goback() {
    this._location.back();
  }

  onSubmit(item: Deliveryorder) {
    const datestring = item.doDate;
    const newDate = new Date(datestring);
    item.doDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

    if (this.selected.length > 0)
    {
      if (this.form.valid) {
        if (item.id === '') {
          console.log(item);
          this.loadingbar = false;
          const _do = new Deliveryorder2();
          _do.doNo = item.doNo;
          _do.doDate = item.doDate;
          _do.jobOrder = item.jobOrder;
          // _do.jobOrder_data.push(this.jo);
          _do.id = '0';
          console.log(_do);

          let _doDtls: DeliveryorderDtls2;
          let i;
          for (i = 0; i < this.selected.length; i++)
          {
            _doDtls = new DeliveryorderDtls2();
            _doDtls.qty = this.selected[i]['qtyDO'];
            _doDtls.joDtl = this.selected[i]['id'];
            console.log(_doDtls);
            _do.deliveryOrderDetails.push(_doDtls);

          }

          this.dosvc.add(_do).subscribe(
            success => {
              this.goback();
            },
            error => {
              console.log(error.error);
              this.toastr.error(error.error.error_message, 'Error');
            }
          );

        } else {
          // this.dosvc.update(item).subscribe(
          //    success =>
          //    {
          //      this.goback();
          //    },
          //   error =>
          //   {
          //     console.log(error.error);
          //     this.toastr.error(error.error.error_message, 'Error');
          //   }
          // );
        }
      }
    }
    else
    {
      alert('Please Fill Delivery Order Detail');
    }

  }

  onChooseJODtls(dividerVal: string) {
    this.divVal = true;

    this.josvc.getJO1(this.form.controls['jobOrder'].value).subscribe(res =>
      {

        this.jo = res;
        this.joDtls = res['jobOrderDetails'];
        let i;
        for (i = 0; i < this.joDtls.length; i++)
        {
          this.joDtls[i].qtyDO = 0;
        }
      }
    );

  }

  updateValue(event, cell, rowIndex) {
    // console.log('inline editing rowIndex', rowIndex);
    if (event.target.value > this.joDtls[rowIndex].qty)
    {
      this.joDtls[rowIndex][cell] = 0;
      alert('Qty Delivery tidak boleh melebihi Quantity');
    }
    else
    {
      this.editing[rowIndex + '-' + cell] = false;
      this.joDtls[rowIndex][cell] = event.target.value;
      this.joDtls = [...this.joDtls];
      // console.log('UPDATED!', this.joDtls[rowIndex][cell]);
      // console.log(this.joDtls);
    }
    if (event.target.value = "''")
    {
      this.joDtls[rowIndex][cell] = 0;
    }
  }

  onSelect({ selected }) {
    this.selectedData.push(selected);
  }
}
