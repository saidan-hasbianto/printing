import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { JobordersService } from '../../services/joborders.service';
import { Joborders } from '../../models/joborders';
import { MscustomergroupService } from '../../services/mscustomergroup.service';
import { MsdeliveryaddrService } from '../../services/msdeliveryaddr.service';
import { MsoperatorService } from '../../services/msoperator.service';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Mscustomer } from '../../models/mscustomergroup';
import { Msoperator } from '../../models/msoperator';
import { Msdeliveryaddr } from '../../models/msdeliveryaddr';
import { Msproduct } from '../../models/msproduct';
import { Location } from '@angular/common';
import { MsdeliveryaddrDetailComponent } from '../msdeliveryaddr-detail/msdeliveryaddr-detail.component';
import { FileUploaDService } from '../../services/file-uploa-d.service';
import { MsproductService } from '../../services/msproduct.service';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule, MatNativeDateModule, DateAdapter } from '@angular/material';
import { FileUploadModule } from 'primeng/primeng';

@Component({
  selector: 'app-joborders-detail',
  templateUrl: './joborders-detail.component.html',
  styleUrls: ['./joborders-detail.component.scss']
})
export class JobordersDetailComponent implements OnInit {
  orderDate = new FormControl(new Date());
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  jo: Joborders = {id : 0, customerName : null,    addressOfDelivery : null,    operatorName : null, productName: null,
    jobOrderNo : null, refNo : null,    orderDate : null,    completionDate : null, remarks: null,
    status : null, qty : 0,    price : 0,    markup : 0, fileSource: null,
    fileName : null, customer : null,    deliveryAddress : null,    operator : null, product: null };

  custOption: Mscustomer[] = [];
  cust: Mscustomer = {id: 0 , customerCd: null,    name: null,    level: null,    marketing: null,     address: null,
    cp: null,    email: null,     telp: null,    fax: null,    mobile: null,    deliveryAddresses: null };

  opsOption: Msoperator[] = [];
  ops: Msoperator = {id: 0 , operatorCd: null, name: null };

  dlvaddrOption: Msdeliveryaddr[] = [];
  dlvaddr: Msdeliveryaddr = {id: 0,    name: null,    address: null,    cp: null,    contactNumber: null };

  prodOption: Msproduct[] = [];
  prod: Msproduct = {id: 0,    priceLevels: null,    productItems: null,    productCd: null,    name: null,    descs: null,    minQty: null };

  sub: any;
  loadingbar = true;
  divVal = true;
  fileToUpload: File = null;
  public someDate: Date;
  paramId: number;

  statusOption = [
    {value: 'C', display_name: 'Create'},
    {value: 'W', display_name: 'Waiting'},
    {value: 'P', display_name: 'Pending'},
    {value: 'D', display_name: 'Done'}
  ];

  filesourceOption = [
    {value: 'C', display_name: 'CD / DVD'},
    {value: 'F', display_name: 'Flash Disk'},
    {value: 'E', display_name: 'Email'}
  ];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private josvc: JobordersService,
    private custsvc: MscustomergroupService,
    private dlvaddrsvc: MsdeliveryaddrService,
    private opssvc: MsoperatorService,
    private prodsvc: MsproductService,
    private _location: Location,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private fileUploadService: FileUploaDService,
    private dateAdapter:DateAdapter<Date>
  ) {
    this.formErrors = {
      jobOrderNo : {},
      refNo : {},
      orderDate : {},
      completionDate : {},
      status : {},
      qty : {},
      price : {},
      markup : {},
      fileSource : {},
      customer : {},
      deliveryAddress : {},
      operator : {},
      product : {},
       fileName : {}
      };
   }

  ngOnInit() {
    this.custsvc.getRows().subscribe(res => this.custOption = res);
    this.prodsvc.getRows().subscribe(res => this.prodOption = res);
    this.dlvaddrsvc.getRows().subscribe(res => this.dlvaddrOption = res);
    this.opssvc.getRows().subscribe(res => this.opsOption = res);

    this.form = this.formBuilder.group({
    id : [this.jo.id],
    addressOfDelivery : [this.jo.addressOfDelivery],
    operatorName : [this.jo.operatorName], productName: [this.jo.productName],
    jobOrderNo : [this.jo.jobOrderNo, Validators.required], refNo : [this.jo.refNo, Validators.required],
    orderDate : [this.jo.orderDate, Validators.required],
    completionDate : [this.jo.completionDate, Validators.required],
    remarks: [this.jo.remarks],
    status : [this.jo.status, Validators.required], qty : [this.jo.qty, Validators.required],    price : [this.jo.price, Validators.required],
    markup : [this.jo.markup, Validators.required],
    fileSource: [this.jo.fileSource, Validators.required],  fileName : [this.jo.fileName],
    customer : [this.jo.customer, Validators.required],
    deliveryAddress : [this.jo.deliveryAddress, Validators.required],
     operator : [this.jo.operator, Validators.required],
     product: [this.jo.product, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      this.paramId = Number.parseInt(params['id']);
      if (this.paramId) {
        this.loadingbar = false;
        // this.josvc.getJO(id)
        // .subscribe(res => {
        //   this.jo = res;
        this.josvc.getJO(this.paramId)
          .subscribe(res => {
            this.jo = res;
          this.form.setValue({
            id : this.jo.id,
            // customerName : this.jo.customerName,
            addressOfDelivery : this.jo.addressOfDelivery,
            operatorName : this.jo.operatorName, productName: this.jo.productName,
            jobOrderNo : this.jo.jobOrderNo, refNo : this.jo.refNo,
            orderDate : this.jo.orderDate,    completionDate : this.jo.completionDate,  remarks: this.jo.remarks,
            status : this.jo.status, qty : this.jo.qty, price : this.jo.price,
            markup : this.jo.markup,
            fileSource: this.jo.fileSource,
            // fileName : this.jo.fileName,
            customer : this.jo.customer,
            deliveryAddress : this.jo.deliveryAddress,
            operator : this.jo.operator,
            product: this.jo.product
          });

          // this.cust = res.customer;
          // this.form.controls['customer'].disable();
          this.dlvaddr = res.deliveryAddress;
          this.ops = res.operator;
          this.prod = res.product;



          // this.regroupDetail();
          this.loadingbar = true;
      });
    }});

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
    this.loadingbar = false;
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

  onDividerChange(dividerVal: string) {
    this.divVal = true;
    if (dividerVal === 'C') {
      this.jo.status = 'Create';
    }
    else if (dividerVal === 'W')
    {
      this.jo.status = 'Working';
    }
    else if (dividerVal === 'P')
    {
      this.jo.status = 'Pending';
    }
    else
    {
      this.jo.status = 'Done';
    }
  }

  onSubmit(item: Joborders) {

    let datestring = item.orderDate;
    let newDate = new Date(datestring);
    item.orderDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

    let completion = new Date(item.completionDate);
    item.completionDate = completion.getFullYear() + '-' + (completion.getMonth() + 1) + '-' + completion.getDate();

    // const formModel = this.prepareSave();
    console.log(item);
    console.log(this.form.get('fileName').value);
    if (this.form.valid)
    {
      this.loadingbar = false;
      if (item.id === 0)
        {
          /*
          this.josvc.add(item).subscribe(
            success => {
              this.goback();
            },
            error => {
              this.toastr.error(error.error.error_message, 'Error');
            }
          );
          */
          this.josvc.postFile(item, this.form.get('fileName').value).subscribe(
            success => {
              this.goback();
            },
            error => {
              this.toastr.error(error.error.error_message, 'Error');
            }
          );
        }
        else
        {

          this.josvc.update(item).subscribe(
           success => {
              this.goback();
            },
           error => {
              console.log(error.error);
              this.toastr.error(error.error.error_message, 'Error');
            }
          );
        }
    }
  }

  addAddr() {
    const dialogRef = this.dialog.open(MsdeliveryaddrDetailComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.dlvaddrsvc.add(result);
      this.dlvaddrOption.push(result);
    });
  }

  // handleFileInput(files: FileList) {
  //   this.fileToUpload = files.item[0];
  //   // this.jo.fileName = files.item[0];
  // }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.form.get('fileName').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by looping through `this.form.controls`, but we'll keep it as simple as possible here

    input.append('file', this.form.get('file').value);
    return input;
  }

// regroupDetail() {
//   this.cust = this.jo.customer.filter(x => x.customerCd === 'N');
//   // this.ovtDtlWeekend = this.ovt.overtimeDtls.filter(x => x.type === 'H');
// }

// uploadFileToActivity() {
//   this.josvc.postFile(this.fileToUpload).subscribe(data => {
//     // do something, if upload success
//     }, error => {
//       console.log(error);
//       this.toastr.error(error.error.error_message, 'Error');
//     });
// }
}
