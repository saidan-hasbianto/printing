import { Component, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { fuseAnimations } from '../../../../animations';
import { FuseConfigService } from '../../../../services/config.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector   : 'fuse-nav-horizontal-collapse',
    templateUrl: './nav-horizontal-collapse.component.html',
    styleUrls  : ['./nav-horizontal-collapse.component.scss'],
    animations : fuseAnimations
})
export class FuseNavHorizontalCollapseComponent implements OnDestroy
{
    onSettingsChanged: Subscription;
    fuseSettings: any;
    isOpen = false;
    public gr = '';

    @HostBinding('class') classes = 'nav-item nav-collapse';
    @Input() item: any;

    @HostListener('mouseenter')
    open()
    {
        this.isOpen = true;
    }

    @HostListener('mouseleave')
    close()
    {
        this.isOpen = false;
    }

    constructor(
        private fuseConfig: FuseConfigService
    )
    {
        this.onSettingsChanged =
            this.fuseConfig.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.fuseSettings = newSettings;
                    }
                );
        const abc = localStorage.getItem('groupname');
        if (abc.toLowerCase() === 'group admin')
        {
          this.gr = 'admin, user, operator';
        }
        else if (abc.toLowerCase() === 'group user')
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
        this.onSettingsChanged.unsubscribe();
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
