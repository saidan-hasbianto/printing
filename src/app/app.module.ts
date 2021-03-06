import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2Webstorage } from 'ngx-webstorage';
import { MyHttpInterceptor } from './httpinterceptor';
// import { MatNativeDateModule } from '@angular/material';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { MatDatepickerModule, MatNativeDateModule, DateAdapter } from '@angular/material';
import { CurrencyPipe, DatePipe } from '@angular/common';
// import { DateFormat } from './date-format';


const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'mainform'
    }
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        TranslateModule.forRoot(),
        FuseMainModule,
        ToastrModule.forRoot(),
        Ng2Webstorage,
        MatNativeDateModule,
        DateValueAccessorModule
        , MatDatepickerModule

    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyHttpInterceptor,
            multi: true
        },
        CurrencyPipe,DatePipe,
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{

}
