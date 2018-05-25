import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';

import { FuseMainComponent } from './main.component';
import { FuseContentComponent } from './content/content.component';
import { FuseFooterComponent } from './footer/footer.component';
import { FuseNavbarVerticalComponent } from './navbar/vertical/navbar-vertical.component';
import { FuseToolbarComponent } from './toolbar/toolbar.component';
import { FuseNavigationModule } from '../core/components/navigation/navigation.module';
import { FuseNavbarVerticalToggleDirective } from './navbar/vertical/navbar-vertical-toggle.directive';
import { FuseNavbarHorizontalComponent } from './navbar/horizontal/navbar-horizontal.component';
import { FuseQuickPanelComponent } from './quick-panel/quick-panel.component';
import { FuseThemeOptionsComponent } from '../core/components/theme-options/theme-options.component';
import { FuseShortcutsModule } from '../core/components/shortcuts/shortcuts.module';
import { FuseSearchBarModule } from '../core/components/search-bar/search-bar.module';

import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RwService } from './services/rw.service';
import { RtService } from './services/rt.service';
import { AppRoutingModule } from './content/app-routing.module';
import { PageRoutingModule } from './pages/page-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MsitemComponent } from './content/msitem/msitem.component';
import { Msitem } from './models/msitem';
import { MsitemService } from './services/msitem.service';
import { MsitemDetailComponent } from './content/msitem-detail/msitem-detail.component';
import { LogErrorHandleService } from './services/log-error-handle.service';
import { MsproductComponent } from './content/msproduct/msproduct.component';
import { MsproductDetailComponent } from './content/msproduct-detail/msproduct-detail.component';
import { MsproductService } from './services/msproduct.service';
import { MsproductDetailItemformComponent } from './content/msproduct-detail-itemform/msproduct-detail-itemform.component';
import { PricelevelDetailComponent } from './content/pricelevel-detail/pricelevel-detail.component';
import { PricelevelService } from './services/pricelevel.service';
import { ProductItemMaterialService } from './services/product-item-material.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatButtonModule } from '@angular/material';
import { UsersComponent } from './content/users/users.component';
import { UsersDetailComponent } from './content/users-detail/users-detail.component';
import { UsersService } from './services/users.service';
import { GroupComponent } from './content/group/group.component';
import { GroupDetailComponent } from './content/group-detail/group-detail.component';
import { GroupService } from './services/group.service';
import { MsactivityComponent } from './content/msactivity/msactivity.component';
import { MsmarketingComponent } from './content/msmarketing/msmarketing.component';
import { MsoperatorComponent } from './content/msoperator/msoperator.component';
import { MsactivityService } from './services/msactivity.service';
import { MsmarketingService } from './services/msmarketing.service';
import { MsoperatorService } from './services/msoperator.service';
import { MsactivityDetailComponent } from './content/msactivity-detail/msactivity-detail.component';
import { MsmarketingDetailComponent } from './content/msmarketing-detail/msmarketing-detail.component';
import { MsoperatorDetailComponent } from './content/msoperator-detail/msoperator-detail.component';
import { MsdeliveryaddrService } from './services/msdeliveryaddr.service';
import { MscustomergroupService } from './services/mscustomergroup.service';
import { MsdeliveryaddrDetailComponent } from './content/msdeliveryaddr-detail/msdeliveryaddr-detail.component';
import { JobordersComponent } from './content/joborders/joborders.component';
import { JobordersService } from './services/joborders.service';
import { JobordersDetailComponent } from './content/joborders-detail/joborders-detail.component';
import { FileUploaDService } from './services/file-uploa-d.service';
import { ReceiptingListComponent } from './content/receipting-list/receipting-list.component';
import { ReceiptingListService } from './services/receipting-list.service';
import { ReceiptJobOrdersComponent } from './content/receipt-job-orders/receipt-job-orders.component';
import { MarkupreleasesComponent } from './content/markupreleases/markupreleases.component';
import { MarkupreleasejobordersComponent } from './content/markupreleasejoborders/markupreleasejoborders.component';
import { ReceiptJobOrdersService } from './services/receipt-job-orders.service';
import { MarkupreleasesService } from './services/markupreleases.service';
import { MarkupreleasejobordersService } from './services/markupreleasejoborders.service';
import { MarkupreleaseDetailComponent } from './content/markuprelease-detail/markuprelease-detail.component';
import { ReceiptingDetailComponent } from './content/receipting-detail/receipting-detail.component';
import { VendorComponent } from './content/vendor/vendor.component';
import { PurchItemComponent } from './content/purch-item/purch-item.component';
import { PurchItemDetailComponent } from './content/purch-item-detail/purch-item-detail.component';
import { VendorDetailComponent } from './content/vendor-detail/vendor-detail.component';
import { PaymPurchListComponent } from './content/paym-purch-list/paym-purch-list.component';
import { PaymPurchListDetailComponent } from './content/paym-purch-list-detail/paym-purch-list-detail.component';
import { CashbookComponent } from './content/cashbook/cashbook.component';
import { CashbookDetailComponent } from './content/cashbook-detail/cashbook-detail.component';
import { VendorService } from './services/vendor.service';
import { PurchItemService } from './services/purch-item.service';
import { CashbookService } from './services/cashbook.service';
import { PaymPurchListService } from './services/paym-purch-list.service';
import { PurchItemFormComponent } from './content/purch-item-form/purch-item-form.component';
import { PaymPurchFormComponent } from './content/paym-purch-form/paym-purch-form.component';
import { DeliveryorderComponent } from './content/deliveryorder/deliveryorder.component';
import { DeliveryorderDetailComponent } from './content/deliveryorder-detail/deliveryorder-detail.component';
import { DeliveryorderService } from './services/deliveryorder.service';
import { JoborderViewComponent } from './content/joborder-view/joborder-view.component';


@NgModule({
    declarations: [
        FuseContentComponent,
        FuseFooterComponent,
        FuseMainComponent,
        FuseNavbarVerticalComponent,
        FuseNavbarHorizontalComponent,
        FuseToolbarComponent,
        FuseNavbarVerticalToggleDirective,
        FuseThemeOptionsComponent,
        FuseQuickPanelComponent
    ],
    imports     : [
        SharedModule,
        RouterModule,
        FuseNavigationModule,
        FuseShortcutsModule,
        FuseSearchBarModule,
        AppRoutingModule,
        PageRoutingModule,
        NgxDatatableModule
    ],
    exports     : [
        FuseMainComponent
    ],
    providers: [
        RwService,
        RtService,
        AuthenticationService,
        AuthGuardService,
        MsitemService,
        LogErrorHandleService,
        MsproductService,
        PricelevelService,
        ProductItemMaterialService,
        UsersService,
        GroupService,
        MsactivityService,
        MsmarketingService,
        MsoperatorService,
        MsdeliveryaddrService,
        MscustomergroupService,
        JobordersService,
        FileUploaDService,
        ReceiptingListService,
        ReceiptJobOrdersService,
        MarkupreleasesService,
        MarkupreleasejobordersService,
        VendorService,
        PurchItemService,
        PaymPurchListService,
        CashbookService,
        DeliveryorderService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
    ],
})

export class FuseMainModule
{
}
