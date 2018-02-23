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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
        ProductItemMaterialService
        // { provide: MatDialogRef, useValue: {} },
        // { provide: MAT_DIALOG_DATA, useValue: [] },
    ],
})

export class FuseMainModule
{
}
