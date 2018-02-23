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
    PricelevelDetailComponent
  ],
  imports     : [
      SharedModule,
      RouterModule.forChild(routes)
  ],
  exports     : [
      FuseSampleComponent
  ],
  entryComponents: [
    MsproductDetailItemformComponent
  ]
})
export class AppRoutingModule { }
