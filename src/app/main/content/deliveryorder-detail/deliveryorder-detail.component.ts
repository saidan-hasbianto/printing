import { Component, OnInit } from '@angular/core';
import { Deliveryorder, DeliveryorderDtls } from '../../models/deliveryorder';
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
    this.josvc.getRows().subscribe(res => this.joOption = res);
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

          this.form.setValue({
            id: this.DO.id,
            doNo: this.DO.doNo,
            doDate: this.DO.doDate
            });
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

    if (this.doDtls.length > 0)
    {
        item.deliveryOrderDetails = this.doDtls;
    }
    else
    {
      alert('Please Fill Delivery Order Detail');
    }
    if (this.form.valid) {
      if (item.id === 0) {
        this.loadingbar = false;

        // this.dosvc.add(item).subscribe(
        //   success => {
        //     this.goback();
        //   },
        //   error => {
        //     console.log(error.error);
        //     this.toastr.error(error.error.error_message, 'Error');
        //   }
        // );

      } else {
        this.dosvc.update(item).subscribe(
           success =>
           {
             this.goback();
           },
          error =>
          {
            console.log(error.error);
            this.toastr.error(error.error.error_message, 'Error');
          }
        );
      }
    }
  }

  onDividerChange(dividerVal: string) {
    this.divVal = true;

    this.josvc.getJO1(this.form.value.jobOrder).subscribe(res =>
      {

        this.joDtls = res['jobOrderDetails'];
        console.log(this.joDtls);
        let _doDtls: DeliveryorderDtls;
        let i;
        for (i = 0; i < this.joDtls.length; i++)
        {
          const _doDtls = new  DeliveryorderDtls;
          _doDtls.qty = 0;
          _doDtls.joDtl = this.joDtls[i].id.toString();
          this.DO.deliveryOrderDetails.push(_doDtls);

        }
        console.log(this.DO);
        console.log(this.doDtls);
      }
    );

  }
}
