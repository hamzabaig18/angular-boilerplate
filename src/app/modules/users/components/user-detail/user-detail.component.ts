import { Component, OnInit } from '@angular/core';
import { BaseApiService } from 'app/modules/core/services/base/base-api.service';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../models/user-class.model';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  urlParam: string = '';
  isData: boolean = false;
  user: UserModel = <UserModel>{};

  constructor(
    private route: ActivatedRoute,
    public baseApiService: BaseApiService
  ) {
    this.urlParam = this.route.snapshot.paramMap.get('id') || '';
    this.userDetail();
  }

  ngOnInit(): void {}

  async userDetail() {
    let response = await this.baseApiService.getRequestMethod(
      'users/' + this.urlParam
    );
    debugger;
    this.user = new UserModel(
      (this.user.id = response.id),
      (this.user.first_name = response.first_name),
      (this.user.last_name = response.last_name),
      (this.user.email = response.email),
      (this.user.image = response.avatar),
      (this.user.personalId = response.personalId),
      (this.user.phone = response.phone),
      (this.user.gender = response.gender),
      (this.user.country = response.country),
      (this.user.city = response.city),
      (this.user.state = response.state),
      (this.user.zipCode = response.zipCode),
      (this.user.account = response.account),
      (this.user.countryCode = response.countryCode)
    );
    if (this.user) {
      this.isData = true;
    }
  }
}
