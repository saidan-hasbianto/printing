import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';

import { SharedModule } from '../../core/modules/shared.module';

import { FuseSampleComponent } from './sample/sample.component';
import { RwsComponent } from './rws/rws.component';
import { RwDetailComponent } from './rw-detail/rw-detail.component';
import { RtsComponent } from './rts/rts.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { RtDetailComponent } from './rt-detail/rt-detail.component';
import { MsitemComponent } from './msitem/msitem.component';
import { MsitemDetailComponent } from './msitem-detail/msitem-detail.component';
import { Msproduct } from '../models/msproduct';
import { MsproductDetailComponent } from './msproduct-detail/msproduct-detail.component';
import { MsproductComponent } from './msproduct/msproduct.component';
import { MsproductDetailItemformComponent } from './msproduct-detail-itemform/msproduct-detail-itemform.component';
import { Pricelevel } from '../models/pricelevel';
import { PricelevelDetailComponent } from './pricelevel-detail/pricelevel-detail.component';
import { UsersComponent } from './users/users.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { Groups } from '../models/groups';
import { GroupComponent } from './group/group.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { MsactivityComponent } from './msactivity/msactivity.component';
import { MsmarketingComponent } from './msmarketing/msmarketing.component';
import { MsoperatorComponent } from './msoperator/msoperator.component';
import { MsactivityDetailComponent } from './msactivity-detail/msactivity-detail.component';
import { MsmarketingDetailComponent } from './msmarketing-detail/msmarketing-detail.component';
import { MsoperatorDetailComponent } from './msoperator-detail/msoperator-detail.component';
import { MscustomergroupComponent } from './mscustomergroup/mscustomergroup.component';
import { MscustomergroupDetailComponent } from './mscustomergroup-detail/mscustomergroup-detail.component';
import { MsdeliveryaddrDetailComponent } from './msdeliveryaddr-detail/msdeliveryaddr-detail.component';
import { JobordersComponent } from './joborders/joborders.component';
import { JobordersDetailComponent } from './joborders-detail/joborders-detail.component';
import { ReceiptingListComponent } from './receipting-list/receipting-list.component';
import { ReceiptJobOrdersComponent } from './receipt-job-orders/receipt-job-orders.component';
import { MarkupreleasesComponent } from './markupreleases/markupreleases.component';
import { MarkupreleasejobordersComponent } from './markupreleasejoborders/markupreleasejoborders.component';
import { MarkupreleasesService } from '../services/markupreleases.service';
import { ReceiptingDetailComponent } from './receipting-detail/receipting-detail.component';
import { MarkupreleaseDetailComponent } from './markuprelease-detail/markuprelease-detail.component';
import { VendorComponent } from './vendor/vendor.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { PurchItemComponent } from './purch-item/purch-item.component';
import { PaymPurchListComponent } from './paym-purch-list/paym-purch-list.component';
import { CashbookComponent } from './cashbook/cashbook.component';
import { PurchItemDetailComponent } from './purch-item-detail/purch-item-detail.component';
import { PaymPurchListDetailComponent } from './paym-purch-list-detail/paym-purch-list-detail.component';
import { CashbookDetailComponent } from './cashbook-detail/cashbook-detail.component';
import { PurchItem } from '../models/purch-item';
import { PurchItemFormComponent } from './purch-item-form/purch-item-form.component';
import { PaymPurchFormComponent } from './paym-purch-form/paym-purch-form.component';
import { Deliveryorder } from '../models/deliveryorder';
import { DeliveryorderDetailComponent } from './deliveryorder-detail/deliveryorder-detail.component';
import { DeliveryorderComponent } from './deliveryorder/deliveryorder.component';

const routes = [
  {
    path     : 'sample',
    component: FuseSampleComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'rws',
    component: RwsComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'rw-detail',
    component: RwDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'rts',
    component: RtsComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'rt-detail',
    component: RtDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'msitem',
    component: MsitemComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'msitem-detail',
    component: MsitemDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'msproduct',
    component: MsproductComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'msproduct-detail',
    component: MsproductDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'msproduct-detail/:id',
    component: MsproductDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'msitem-detail/:id',
    component: MsitemDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'pricelevel',
    component: PricelevelDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'users-detail',
    component: UsersDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'group',
    component: GroupComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'group-detail',
    component: GroupDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'msactivity',
    component: MsactivityComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'msactivity-detail/:id',
    component: MsactivityDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'msmarketing',
    component: MsmarketingComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'msmarketing-detail',
    component: MsmarketingDetailComponent,
    canActivate: [AuthGuard]
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'msmarketing-detail/:id',
    component: MsmarketingDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'msoperator',
    component: MsoperatorComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'msoperator-detail',
    component: MsoperatorDetailComponent,
    canActivate: [AuthGuard]
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'msoperator-detail/:id',
    component: MsoperatorDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'mscustomer',
    component: MscustomergroupComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'mscustomer-detail',
    component: MscustomergroupDetailComponent,
    canActivate: [AuthGuard]
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'mscustomergroup-detail/:id',
    component: MscustomergroupDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'msdeliveryaddr-detail',
    component: MsdeliveryaddrDetailComponent,
    canActivate: [AuthGuard],
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'msdeliveryaddr-detail/:id',
    component: MsdeliveryaddrDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'joborders',
    component: JobordersComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'joborders-detail',
    component: JobordersDetailComponent,
    canActivate: [AuthGuard],
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'joborders-detail/:id',
    component: JobordersDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'receipts',
    component: ReceiptingListComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'receipts-detail',
    component: ReceiptingDetailComponent,
    canActivate: [AuthGuard],
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'receipts-detail/:id',
    component: ReceiptingDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'receiptjoborders',
    component: ReceiptJobOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'markupreleases',
    component: MarkupreleasesComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'markupreleases-detail',
    component: MarkupreleaseDetailComponent,
    canActivate: [AuthGuard],
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'markupreleases-detail/:id',
    component: MarkupreleaseDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'markupreleasejoborders',
    component: MarkupreleasejobordersComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'vendor',
    component: VendorComponent,
    canActivate: [AuthGuard],
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'vendor-detail',
    component: VendorDetailComponent,
    canActivate: [AuthGuard]
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'vendor-detail/:id',
    component: VendorDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'purch-item',
    component: PurchItemComponent,
    canActivate: [AuthGuard],
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'purch-item-detail',
    component: PurchItemDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path     : 'purch-item-detail/:id',
    component: PurchItemDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'paym-purch-list',
    component: PaymPurchListComponent,
    canActivate: [AuthGuard]
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'paym-purch-list-detail',
    component: PaymPurchListDetailComponent,
    canActivate: [AuthGuard]
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'paym-purch-list-detail/:id',
    component: PaymPurchListDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'paym-purch-form',
    component: PaymPurchFormComponent,
    canActivate: [AuthGuard]
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'cashbook',
    component: CashbookComponent,
    canActivate: [AuthGuard],
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'cashbook-detail/:id',
    component: CashbookDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'cashbook-detail/',
    component: CashbookDetailComponent,
    canActivate: [AuthGuard],
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'deliveryorder',
    component: DeliveryorderComponent,
    canActivate: [AuthGuard],
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'deliveryorder-detail/:id',
    component: DeliveryorderDetailComponent,
    canActivate: [AuthGuard],
    data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'deliveryorder-detail/',
    component: DeliveryorderDetailComponent,
    canActivate: [AuthGuard],
    // data: {data: this.selectedData, type: 'edit'}
  },
  {
    path     : 'purch-item-form',
    component: PurchItemFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    FuseSampleComponent,
    RwsComponent,
    RwDetailComponent,
    RtsComponent,
    RtDetailComponent,
    MsitemComponent,
    MsitemDetailComponent,
    MsproductComponent,
    MsproductDetailComponent,
    MsproductDetailItemformComponent,
    PricelevelDetailComponent,
    UsersComponent,
    UsersDetailComponent,
    GroupComponent,
    GroupDetailComponent,
    MsactivityComponent,
    MsactivityDetailComponent,
    MsmarketingComponent,
    MsmarketingDetailComponent,
    MsoperatorComponent,
    MsoperatorDetailComponent,
    MscustomergroupComponent,
    MscustomergroupDetailComponent,
    MsdeliveryaddrDetailComponent,
    JobordersComponent,
    JobordersDetailComponent,
    ReceiptingListComponent,
    ReceiptingDetailComponent,
    ReceiptJobOrdersComponent,
    MarkupreleasesComponent,
    MarkupreleaseDetailComponent,
    MarkupreleasejobordersComponent,
    VendorComponent,
    VendorDetailComponent,
    PurchItemComponent,
    PurchItemDetailComponent,
    PaymPurchListComponent,
    PaymPurchListDetailComponent,
    CashbookComponent,
    CashbookDetailComponent,
    PurchItemFormComponent,
    PaymPurchFormComponent,
    DeliveryorderComponent,
    DeliveryorderDetailComponent
  ],
  imports     : [
      SharedModule,
      RouterModule.forChild(routes)
  ],
  exports     : [
      FuseSampleComponent
  ],
  entryComponents: [
    MsproductDetailItemformComponent,
    MsmarketingDetailComponent
  ]
})
export class AppRoutingModule { }
