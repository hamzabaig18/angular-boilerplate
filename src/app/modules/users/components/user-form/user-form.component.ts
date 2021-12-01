import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertBarService } from 'app/modules/core/services/alert-bar/alert-bar.service';
import { BaseApiService } from '../../../core/services/base/base-api.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  form: any;
  urlParam: string = '';
  fileToUpload: File | null = null;
  isUserUpdating: boolean = false;
  isData: boolean = false;
  userCountryCode: string[] = ['us'];
  initalValues: any;
  constructor(
    public route: ActivatedRoute,
    private fb: FormBuilder,
    public baseApiService: BaseApiService,
    public alertBarService: AlertBarService
  ) {
    this.urlParam = this.route.snapshot.paramMap.get('id') || '';
    if (this.urlParam !== '') {
      this.isUserUpdating = true;
      this.userDetail();
    }
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: [null, [Validators.required, Validators.maxLength(59)]],
      last_name: [null, [Validators.required, Validators.maxLength(59)]],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      personalId: [
        null,
        [Validators.required, Validators.pattern('^[0-9]{11}$')],
      ],
      country: [null],
      city: [],
      state: [],
      zipCode: [],
      gender: [null, [Validators.required]],
      uploadFile: [],
      phone: [],
      account: [null, [Validators.required]],
    });
  }
  handleFileInput(event: Event) {
    let files: FileList = <FileList>(<HTMLInputElement>event.target).files;
    if (files[0].type !== 'image/jpeg') {
      this.form.controls.uploadFile.setValue('');
      this.form.get('uploadFile').setValidators(Validators.required);
      this.form.get('uploadFile').updateValueAndValidity();
    } else {
      this.form.get('uploadFile').clearValidators();
      this.form.controls.uploadFile.setValue(files[0].name);
    }
  }

  // Api call for create user
  async createUser() {
    let response = await this.baseApiService.postRequestMethod(
      'users',
      this.form.value
    );
    if (response) {
      this.alertBarService.showAlert.next('User create successfully');
    }
  }

  //Fill the edit user form
  async userDetail() {
    let response = await this.baseApiService.getRequestMethod(
      'users/' + this.urlParam
    );

    this.form.patchValue({
      id: response.id,
      first_name: response.first_name,
      last_name: response.last_name,
      email: response.email,
      personalId: response.personalId,
      //phone: response.phone,
      gender: response.gender,
      country: response.country,
      city: response.city,
      state: response.state,
      zipCode: response.zipCode,
      account: response.account,
    });
    this.form.controls['phone'].setValue(response.phone.toString());
    this.initalValues = this.form.value;
    this.isData = true;
  }

  // Api call for update user
  updateUser() {
    if (this.initalValues != this.form.value) {
      let response = this.baseApiService.putRequestMethod(
        'users/' + this.urlParam,
        this.form.value
      );
      this.alertBarService.showAlert.next('User update successfully');
    } else {
      debugger;
    }
  }

  updateCountryCode() {
    debugger;
    this.userCountryCode = ['gb'];
  }

  async onSubmit(form: FormGroup) {
    if (!this.isUserUpdating) {
      this.createUser();
    } else {
      this.updateUser();
    }
    if (this.form.valid) {
      this.form.reset();
    }
  }
}
