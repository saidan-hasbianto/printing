import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Msitem } from '../../models/msitem';
import { ActivatedRoute, Router } from '@angular/router';
import { MsitemService } from '../../services/msitem.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-msitem-detail',
  templateUrl: './msitem-detail.component.html',
  styleUrls: ['./msitem-detail.component.scss']
})
export class MsitemDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  item: Msitem = { id: 0, itemCd : '', name : '', descs : '', minQty : 0 };
  sub: any;
  loadingbar = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itemservice: MsitemService,
    private _location: Location
  ) {
    this.formErrors = {
      itemCd : {},
        name : {},
        descs : {},
        minQty : {}
    };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.item.id],
      itemCd : [this.item.itemCd, Validators.required],
      name  : [this.item.name, Validators.required],
      descs  : [this.item.descs, Validators.required],
      minQty  : [this.item.minQty, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      if (id)
      {
        this.loadingbar = false;

        this.itemservice.getItem(id)
        .subscribe(res => {
          this.item = res;

        this.form.setValue({
          id: this.item.id,
          itemCd: this.item.itemCd,
          name: this.item.name,
          descs: this.item.descs,
          minQty: this.item.minQty
      });
    this.loadingbar = false;
  });
}});

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }

  onSubmit(item: Msitem) {
    if (this.form.valid) {
      if (item.id === 0) {
        this.loadingbar = false;
        this.itemservice.add(item).subscribe(res => { this.loadingbar = false; });
        this.goback();
      } else {
        this.itemservice.update(item).subscribe(res => { this.loadingbar = false; });
        this.goback();
      }
    }
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
    this._location.back();
  }
}
