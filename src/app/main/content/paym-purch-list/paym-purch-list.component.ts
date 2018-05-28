import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vendor } from '../../models/vendor';
import { MatDialog } from '@angular/material';
import { LogErrorHandleService } from '../../services/log-error-handle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { PaymPurchListService } from '../../services/paym-purch-list.service';
import { VendorService } from '../../services/vendor.service';
import { Msactivity } from '../../models/msactivity';
import { MsactivityService } from '../../services/msactivity.service';
import { PaymPurchList, PaymPurchDtls } from '../../models/paym-purch-list';
import { PurchItem } from '../../models/purch-item';
import { PaymPurchFormComponent } from '../paym-purch-form/paym-purch-form.component';
import { PurchItemDetail } from '../../models/purch-item-detail';
import { PurchItemService } from '../../services/purch-item.service';

@Component({
  selector: 'fuse-paym-purch-list',
  templateUrl: './paym-purch-list.component.html',
  styleUrls: ['./paym-purch-list.component.scss']
})
export class PaymPurchListComponent implements OnInit {
  _PaymPurchList: PaymPurchList[];
  loadingIndicator = true;
  constructor(
    private paympurchsvc: PaymPurchListService,
    private toastrSvc: ToastrService
  ) {  }

  ngOnInit() {
    this.getRows();
  }

  getRows(): void {
    this.paympurchsvc.getRows()
      .subscribe(rows => {
        this._PaymPurchList = rows;
        this.loadingIndicator = false;
      });
  }

  deleteRow(msprod: PaymPurchList): void {
    if (confirm('Are you sure want to delete?')) {
      this.paympurchsvc.delete(msprod).subscribe(res => {
        this._PaymPurchList.splice(this._PaymPurchList.indexOf(msprod), 1);
      });
    }
  }

  refresh(): void {
    window.location.reload();
  }
}
