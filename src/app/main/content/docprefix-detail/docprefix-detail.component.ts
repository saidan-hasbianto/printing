import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LogErrorHandleService } from '../../services/log-error-handle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DocprefixService } from '../../services/docprefix.service';
import { Docprefix } from '../../models/docprefix';

@Component({
  selector: 'fuse-docprefix-detail',
  templateUrl: './docprefix-detail.component.html',
  styleUrls: ['./docprefix-detail.component.scss']
})
export class DocprefixDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  type: string;
  isDelete: boolean;
  sub: any;
  loadingbar = true;
  docpre: Docprefix = {id : '0', prefix: null, descs: null, docFormat: null, docReset: null};
  docResetOpt = [
    {value: 'D', display_name: 'Day'},
    {value: 'M', display_name: 'Month'},
    {value: 'Y', display_name: 'Year'}
  ];
  paramId: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private docsvc: DocprefixService,
    private _location: Location,
    private logErrorHandle: LogErrorHandleService,
    private toastr: ToastrService,
  ) {
    this.formErrors = {
      prefix : {},
      descs : {},
      docFormat : {},
      docReset : {}
    };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id : [''],
      prefix : [''],
      descs : [''],
      docFormat : [''],
      docReset : ['']
    });

    this.sub = this.route.params.subscribe(params => {
      this.paramId = Number.parseInt(params['id']);
      console.log(this.paramId);
      if (this.paramId)
      {
        this.loadingbar = false;

        this.docsvc.getDoc(this.paramId)
        .subscribe(res => {
          this.docpre = res;
          console.log(res);

          this.form.setValue({
            id: this.docpre.id,
            prefix: this.docpre.prefix,
            descs: this.docpre.descs,
            docFormat: this.docpre.docFormat,
            docReset: this.docpre.docReset
            });

        this.loadingbar = false;
        });
      }});
      this.form.valueChanges.subscribe(() => {
        this.onFormValuesChanged();
      });
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

  onSubmit(docpre: Docprefix) {
    if (this.form.valid) {
      if (docpre.id === '') {
        this.loadingbar = false;
        this.docsvc.add(docpre).subscribe(
          success => {
            this.goback();
          },
          error => {
            console.log(error.error);
            this.toastr.error(error.error.error_message, 'Error');
          }
        );
      }
    }
  }
}
