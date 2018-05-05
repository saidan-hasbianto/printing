import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pricelevel } from '../../models/pricelevel';
import { ActivatedRoute, Router } from '@angular/router';
import { PricelevelService } from '../../services/pricelevel.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pricelevel-detail',
  templateUrl: './pricelevel-detail.component.html',
  styleUrls: ['./pricelevel-detail.component.scss']
})
export class PricelevelDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  price: Pricelevel = { id: 0, levelDescs: '', level: 0, lowerPrice: 0, topPrice: 0};
  sub: any;
  divVal = true;
  loadingbar = false;

  levelOption = [
    {value: '1', display_name: 'Level 1'},
    {value: '2', display_name: 'Level 2'},
    {value: '3', display_name: 'Level 3'},
    {value: '4', display_name: 'Level 4'},
    {value: '5', display_name: 'Level 5'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pricelevelsvc: PricelevelService,
    private dialogRef: MatDialogRef<PricelevelDetailComponent>,
@Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formErrors = {
      topPrice : {},
      levelDescs : {},
      level : {},
      lowerPrice : {}
      };

      if (data) {
        this.price = data;
      }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.price.id],
      level : [this.price.level, Validators.required],
      // levelDescs: 'Level ' + [this.price.level],
      lowerPrice  : [this.price.lowerPrice, Validators.required],
      topPrice  : [this.price.topPrice, Validators.required]
      // product : [this.price.product]
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }

  onSubmit(pricelvl: Pricelevel)
  {
    if (this.form.valid)
    {
      pricelvl.levelDescs = 'Level ' + this.form.controls['level'].value;
      console.log(pricelvl);
      this.dialogRef.close(pricelvl);
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

  onDividerChange(dividerVal: string) {
    this.divVal = true;
    this.price.levelDescs = 'Level ' + dividerVal;
  }
  onCancelClick() {
    this.dialogRef.close();
  }
}
