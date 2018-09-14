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
import { AuthGuardService, AuthGuardAdminService, AuthGuardUserService } from './services/auth-guard.service';
import { RwService } from './services/rw.service';
import { RtService } from './services/rt.service';
import { AppRoutingModule } from './content/app-routing.module';
import { PageRoutingModule } from './pages/page-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MsitemService } from './services/msitem.service';
import { LogErrorHandleService } from './services/log-error-handle.service';
import { MsproductService } from './services/msproduct.service';
import { PricelevelService } from './services/pricelevel.service';
import { ProductItemMaterialService } from './services/product-item-material.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from './services/users.service';
import { GroupService } from './services/group.service';
import { MsactivityService } from './services/msactivity.service';
import { MsmarketingService } from './services/msmarketing.service';
import { MsoperatorService } from './services/msoperator.service';
import { MsdeliveryaddrService } from './services/msdeliveryaddr.service';
import { MscustomergroupService } from './services/mscustomergroup.service';
import { JobordersService } from './services/joborders.service';
import { FileUploaDService } from './services/file-uploa-d.service';
import { ReceiptingListService } from './services/receipting-list.service';
import { ReceiptJobOrdersService } from './services/receipt-job-orders.service';
import { MarkupreleasesService } from './services/markupreleases.service';
import { MarkupreleasejobordersService } from './services/markupreleasejoborders.service';
import { VendorService } from './services/vendor.service';
import { PurchItemService } from './services/purch-item.service';
import { CashbookService } from './services/cashbook.service';
import { PaymPurchListService } from './services/paym-purch-list.service';
import { DeliveryorderService } from './services/deliveryorder.service';
import { DocprefixService } from './services/docprefix.service';
import { MainformService } from './services/mainform.service';
import { ReceiptingViewComponent } from './content/receipting-view/receipting-view.component';
import { PaymentreceiptListComponent } from './content/paymentreceipt-list/paymentreceipt-list.component';
import { PaymentreceiptDetailComponent } from './content/paymentreceipt-detail/paymentreceipt-detail.component';
import { PaymentreceiptsService } from './services/paymentreceipts.service';
import { ReceiptunpaidComponent } from './content/receiptunpaid/receiptunpaid.component';


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
        FuseQuickPanelComponent,
        
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
        AuthGuardAdminService,
        AuthGuardUserService,
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
        DocprefixService,
        MainformService,
        PaymentreceiptsService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
    ],
})

export class FuseMainModule
{
}
