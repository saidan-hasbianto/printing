import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FuseNavigationService } from './navigation.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector     : 'fuse-navigation',
    templateUrl  : './navigation.component.html',
    styleUrls    : ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseNavigationComponent implements OnDestroy
{
    navigationModel: any[];
    navigationModelChangeSubscription: Subscription;
    public gr = '';

    @Input('layout') layout = 'vertical';

    constructor(private fuseNavigationService: FuseNavigationService)
    {
        this.navigationModelChangeSubscription =
            this.fuseNavigationService.onNavigationModelChange
                .subscribe((navigationModel) => {
                    this.navigationModel = navigationModel;
                });
        const abc = localStorage.getItem('groupname');
        if (abc === 'Group Admin')
        {
          this.gr = 'admin, user, operator';
        }
        else if (abc === 'Group User')
        {
          this.gr = 'user, operator';
        }
        else
        {
          this.gr = 'operator';
        }


    }

    ngOnDestroy()
    {
        this.navigationModelChangeSubscription.unsubscribe();
    }

    isAuthorized(currentPriv: any): boolean {
      // console.log(this.gr);
      // console.log(currentPriv);
      // console.log(this.navigationModel);
      if (currentPriv === undefined) {
        return true;
      } else if (this.gr.toLowerCase().includes(currentPriv)) {
        return true;
      } else {
        return false;
      }

    }

}
