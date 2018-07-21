import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { JobordersService } from '../../services/joborders.service';
import { Joborders, Joborders2, JobOrderDtls } from '../../models/joborders';
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
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'fuse-joborders-detail',
  templateUrl: './joborders-detail.component.html',
  styleUrls: ['./joborders-detail.component.scss']
})
export class JobordersDetailComponent implements OnInit {
  orderDate = new FormControl(new Date());
  today = new Date();
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  public isOperator = false;
  public isUser = false;
  public isAdmin = false;
  public selected: Number;
  isDisabled: boolean;
  

  jo: Joborders = {id : 0, jobOrderNo : '',  refNo : null,    orderDate : this.today,    completionDate : this.today, remarks: null,
    status : null, customer : null,    deliveryAddress : null,    operator : null, OrderDetails : []};
  jodtls: JobOrderDtls[];

  jo2: Joborders2 = {id : 0, jobOrderNo : '',  refNo : null,    orderDate : null,    completionDate : null, remarks: null,
    status : null, customer : null,    deliveryAddress : null,    operator : null, product : [],
    type : [], qty : [], price : [], markup : [], fileSource : [], fileUrl : [], fileName : []};

  custOption: Mscustomer[] = [];
  cust: Mscustomer = {id: 0 , customerCd: null,    name: null,    level: null,    marketing: null,     address: null,
    cp: null,    email: null,     telp: null,    fax: null,    mobile: null,    deliveryAddresses: [] };

  opsOption: Msoperator[] = [];
  ops: Msoperator = {id: 0 , operatorCd: null, name: null };

  dlvaddrOption: Msdeliveryaddr[] = [];
  dlvaddr: Msdeliveryaddr = {id: 0,    name: null,    address: null,    cp: null,    contactNumber: null };
  dlvaddr2: Msdeliveryaddr[] = [];

  prodOption: Msproduct[] = [];
  prod: Msproduct = {id: 0,    priceLevels: null,    productItems: null,    productCd: null,    name: null,    descs: null,    minQty: null };

  sub: any;
  loadingbar = true;
  divVal = true;
  fileToUpload: File = null;
  public someDate: Date;
  paramId: number;
  rows: number[] = [1];
  products: string[] = [];
  qties: number[] = [];
  types: string[] = [];
  prices: number[] = [];
  markups: number[] = [];
  fileSources: string[] = [];
  fileUrls: File[] = [];
  fileNames: string[] = [];
  orderItem: number;
  last: number;
  lengthidx: number;

  statusOption = [
    {value: 'C', display_name: 'Create'},
    {value: 'W', display_name: 'Waiting'},
    {value: 'P', display_name: 'Pending'},
    {value: 'D', display_name: 'Done'}
  ];

  typesOption = [
    {value: 'B', display_name: 'BW'},
    {value: 'S', display_name: 'Sparasi'}
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
    private authenticationService: AuthenticationService,
    private dateAdapter: DateAdapter<Date>
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
      fileUrl : {}
      },
      this.isOperator = authenticationService.isOperator();
      this.isUser = authenticationService.isUser();
      this.isAdmin = authenticationService.isAdmin();
      
   }

  ngOnInit() {
    
    this.custsvc.getRows().subscribe(res => this.custOption = res);
    this.prodsvc.getRows().subscribe(res => this.prodOption = res);
    this.dlvaddrsvc.getRows().subscribe(res => this.dlvaddrOption = res);
    this.opssvc.getRows().subscribe(res => this.opsOption = res);
    this.form = this.formBuilder.group({
      id : 0,
      jobOrderNo : ['-', Validators.required], refNo : ['', Validators.required],
      orderDate : ['', Validators.required],
      completionDate : ['', Validators.required],
      remarks: [''],
      status : ['', Validators.required],
      customer : ['', Validators.required],
      deliveryAddress : ['', Validators.required],
      operator : ['', Validators.required],
      // products : ['', Validators.required],
      // types : ['', Validators.required],
      // qty : ['', Validators.required],
      // price : [0, Validators.required],
      // markup : [0, Validators.required],
      // fileSource : ['', Validators.required]
      // fileUrl : ['']
    });


    this.sub = this.route.params.subscribe(params => {
      this.paramId = Number.parseInt(params['id']);
      if (this.paramId) {
        this.loadingbar = false;
        this.josvc.getJOb(this.paramId)
          .subscribe(hasil => {
            console.log(hasil["status"]);
            this.jo = hasil;
            console.log(this.jo);
            
            this.selected = parseInt(hasil.deliveryAddress);
            this.jo.OrderDetails = this.jo['jobOrderDetails'];

            if (hasil["status"] == "'D'")
            {
              this.isDisabled = true;
              
            }
            
          this.form.setValue({
            id : this.jo.id,
            jobOrderNo : this.jo.jobOrderNo, refNo : this.jo.refNo,
            orderDate : this.jo.orderDate,    completionDate : this.jo.completionDate,  remarks: this.jo.remarks,
            status : this.jo.status,
            customer : this.jo.customer,
            deliveryAddress : this.jo.deliveryAddress,
            operator : this.jo.operator,
            // products : this.jo['jobOrderDetails'][0]['product'],
            // type : this.jo['jobOrderDetails'][0]['type'],
            // qty : this.jo['jobOrderDetails'][0]['qty'],
            // price : this.jo['jobOrderDetails'][0]['price'],
            // markup : this.jo['jobOrderDetails'][0]['markup'],
            // fileSource : this.jo['jobOrderDetails'][0]['fileSource']
            // fileName : this.jo['jobOrderDetails'][0]['fileName']
          });
          


          let i;
          if (this.jo.OrderDetails.length > 0)
          {
            for (i = 0; i < this.jo.OrderDetails.length; i++)
            {
              this.products.push(this.jo.OrderDetails[i].product);
              this.types.push(this.jo.OrderDetails[i].type);
              this.qties.push(this.jo.OrderDetails[i].qty);
              this.prices.push(this.jo.OrderDetails[i].price);
              this.markups.push(this.jo.OrderDetails[i].markup);
              this.fileSources.push(this.jo.OrderDetails[i].fileSource);
              this.fileNames.push(this.jo.OrderDetails[i].fileName);
              // console.log(this.fileNames);
              if (this.rows.length !== this.jo.OrderDetails.length)
              {
                this.rows.push(this.rows.length + 1);
              }

            }
            
          }


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
    // this._location.back();
    this.router.navigate(['/joborders']);
  }

  onDividerChange(dividerVal: string) {
    /*
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
    */
  }

  onSubmit(item: Joborders) {

    // const datestring = item.orderDate;
    // const newDate = new Date(datestring);
    // item.orderDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

    // const completion = new Date(item.completionDate);
    // item.completionDate = completion.getFullYear() + '-' + (completion.getMonth() + 1) + '-' + completion.getDate();

    // // const formModel = this.prepareSave();
    // console.log(item);
    // console.log(this.form.get('fileName').value);
    // if (this.form.valid)
    // {
    //   this.loadingbar = false;
    //   if (item.id === 0)
    //     {
    //       /*
    //       this.josvc.add(item).subscribe(
    //         success => {
    //           this.goback();
    //         },
    //         error => {
    //           this.toastr.error(error.error.error_message, 'Error');
    //         }
    //       );
    //       */
    //       this.josvc.postFile(item, this.form.get('fileName').value).subscribe(
    //         success => {
    //           this.goback();
    //         },
    //         error => {
    //           this.toastr.error(error.error.error_message, 'Error');
    //         }
    //       );
    //     }
    //     else
    //     {

    //       this.josvc.update(item).subscribe(
    //        success => {
    //           this.goback();
    //         },
    //        error => {
    //           console.log(error.error);
    //           this.toastr.error(error.error.error_message, 'Error');
    //         }
    //       );
    //     }
    // }
  }

  addAddr() {
    
    const dialogRef = this.dialog.open(MsdeliveryaddrDetailComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.dlvaddr = result;
      this.dlvaddr.customer = this.cust.id.toString();      
      this.cust.deliveryAddresses.push(this.dlvaddr);
      
      this.custsvc.update(this.cust).subscribe(
        success => {          
          this.lengthidx = success.deliveryAddresses.length - 1;          
          this.dlvaddrOption.push(success.deliveryAddresses[this.lengthidx]);                 
          this.selected = success.deliveryAddresses[this.lengthidx].id;
          this.jo.deliveryAddress = this.selected.toString();
        }
      )

      // this.dlvaddrsvc.add(this.dlvaddr).subscribe(
      //   success => {
      //     console.log(success);
      //     this.toastr.success('Add address success')
      //     this.cust.deliveryAddresses.push(success);
      //     this.dlvaddrOption.push(success);                 
      //     this.selected = success.id;
      //     this.jo.deliveryAddress = this.selected.toString();
          
      //     // this.jo.deliveryAddress = success.id.toString();
      //   },
      //   error => {
      //     console.log(error.error);
      //     this.toastr.error(error.error.error_message, 'Error');
      //   }
      // ) 
    });
  }

  addOrderItem() {
    this.rows.push(this.rows.length + 1);
    console.log(this.rows);
  }

  delOrderItem(no: number) {    
    console.log(this.rows);
    console.log(no);
    this.rows.splice(no, 1);
    this.products.splice(no, 1);
    this.qties.splice(no, 1);
    this.types.splice(no, 1);
    this.prices.splice(no, 1);
    this.markups.splice(no, 1);
    this.fileSources.splice(no, 1);
    this.fileNames.splice(no, 1);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.form.get('fileUrl').setValue(file);
    }
  }

  handleFileInput(fileInput: FileList, i) {
    const file = fileInput[0];
    if ((i + 1) < this.fileUrls.length) {
      this.fileUrls[i] = file;
    }else {
      this.fileUrls.push(file);
    }
  }

  onChooseCust(event) {
    this.dlvaddrsvc.getRowsForJO(event.value).subscribe(res =>
       this.dlvaddrOption = res
    );
      this.custsvc.getProd(event.value).subscribe(result =>
        {
          this.cust.id = result.id;
          this.cust.address = result.address;
          this.cust.deliveryAddresses = result.deliveryAddresses;
          this.cust.cp = result.cp;
          this.cust.customerCd = result.customerCd;
          this.cust.email = result.email;
          this.cust.fax = result.fax;
          this.cust.level = result.level;
          this.cust.marketing = result.marketing;
          this.cust.mobile = result.mobile;
          this.cust.name = result.name;
          this.cust.telp = result.telp;
        }
    );
  }

  onChooseAddr(event) {
    // console.log(event.value);
    this.jo.deliveryAddress = event.value;

  }

NewOnSubmit() {
  console.log(this.jo);
  // console.log(this.jo2);
  if (this.jo.id === 0) // new
  {
    if (this.jo.orderDate > this.jo.completionDate)
    {
      this.jo.completionDate = this.jo.orderDate;
    }
    const datestring = this.jo.orderDate;
    const newDate = new Date(datestring);
    
    this.jo2.orderDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

    const completion = new Date(this.jo.completionDate);
    this.jo2.completionDate = completion.getFullYear() + '-' + (completion.getMonth() + 1) + '-' + completion.getDate();

    if (this.products.length > 0)
    {
      this.jo2.product = this.products;
      this.jo2.qty = this.qties;
      this.jo2.type = this.types;
      this.jo2.price = this.prices;
      this.jo2.markup = this.markups;
      this.jo2.fileSource = this.fileSources;
      this.jo2.fileUrl = this.fileUrls;
      this.jo2.fileName = this.fileNames;
      this.jo2.status = this.jo.status;
      this.jo2.customer = this.jo.customer;
      this.jo2.refNo = this.jo.refNo;
      this.jo2.deliveryAddress = this.jo.deliveryAddress;
      this.jo2.remarks = this.jo.remarks;
      this.jo2.operator = '1';//this.jo.operator;

      // console.log(this.jo);
      this.josvc.postFile(this.jo2).subscribe(
        // console.log(data));
          success => {
            this.toastr.success('Success');
            console.log(success);
            this.getFile(success.id);
            this.goback();
          },
          error => {
            // console.log(error.error);
            this.toastr.error(error.error.error_message, 'Error');
          });
    }
    else
    {
      alert('Please fill Order Item');
    }
  }
  else // update
  {
    if (this.jo.orderDate > this.jo.completionDate)
    {
      this.jo.completionDate = this.jo.orderDate;
    }
    const datestring = this.jo.orderDate;
    const newDate = new Date(datestring);
    this.jo2.orderDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

    const completion = new Date(this.jo.completionDate);
    this.jo2.completionDate = completion.getFullYear() + '-' + (completion.getMonth() + 1) + '-' + completion.getDate();

    if (this.products.length > 0)
    {
      let i;
      for (i = 0; i < this.rows.length; i++)
      {
        this.jo.OrderDetails[i].price = this.prices[i];
        this.jo.OrderDetails[i].markup = this.markups[i];
      }
      this.jo2.id = this.jo.id;
      this.jo2.product = this.products;
      this.jo2.qty = this.qties;
      this.jo2.type = this.types;
      this.jo2.price = this.prices;
      this.jo2.markup = this.markups;
      this.jo2.fileSource = this.fileSources;
      this.jo2.fileUrl = this.fileUrls;
      this.jo2.fileName = this.fileNames;
      this.jo2['jobOrderDetails'] = this.jo['jobOrderDetails'];
      this.jo2['jobOrderNo'] = this.jo['jobOrderNo'];
      this.jo2['refNo'] = this.jo['refNo'];
      this.jo2['status'] = this.jo['status'];
      this.jo2['customer'] = this.jo['customer'];
      this.jo2['deliveryAddress'] = this.jo['deliveryAddress'];
      this.jo2['operator'] = this.jo['operator'];
      this.jo2['remarks'] = this.jo['remarks'];

      // console.log(this.jo);
      this.josvc.updateForUser(this.jo2).subscribe(
        // console.log(data));
          success => {
            this.nextstatus();
            this.toastr.success('Success');
            console.log(success);
            this.getFile(success.id);
            this.goback();
          },
          error => {
            console.log(error);
            this.toastr.error(error.error.error_message, 'Error');
          });
    }
    else
    {
      alert('Please fill Order Item');
    }
  }

  
}

nextstatus()
{
  this.jo2.id = this.jo.id;
  this.josvc.updateForAdmin(this.jo2).subscribe(
    success => {
      this.toastr.success('Success');
      this.goback();
    },
    error => {
      this.toastr.error(error.error.error_message, 'Error');
    }
  )
}

getFile(id: number): void {
  this.josvc.getFile(id)
  .subscribe((res) => {
    const fileURL = URL.createObjectURL(res);
    console.log(fileURL);
    window.open(fileURL);
  },
  error => {
    console.log(error);
  });
}

isCreated() {
  5
}

}
