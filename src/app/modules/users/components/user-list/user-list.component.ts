import { Component, OnInit } from '@angular/core';
import { BaseApiService } from 'app/modules/core/services/base/base-api.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertBarService } from 'app/modules/core/services/alert-bar/alert-bar.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userlist: any[] = [];
  allUserlist: any[] = [];
  isData: boolean = false;
  searchText = new FormControl('');
  states: string[] = [];
  selectedStates = this.states;
  pageEvent: any;
  public pageSize = 5;
  public currentPage = 0;

  constructor(
    public alertBarService: AlertBarService,
    private _snackBar: MatSnackBar,
    public baseApiService: BaseApiService
  ) {
    this.getUserlist(this.currentPage, this.pageSize);
  }

  onKey(event: any) {
    this.search(event.target.value);
  }

  onSelection(event: any) {
    this.search(event.value);
  }

  onEnter(event: any) {
    if (event.target.value !== '' && event.target.value !== undefined) {
      if (this.selectedStates.length == 3) {
        this.selectedStates.shift();
      }
      this.selectedStates.unshift(event.target.value);
    }
    this.search(event.target.value);
    event.target.value = '';
  }

  search(value: string) {
    if (value !== undefined) {
      let filter = value.toLowerCase();

      this.userlist =
        filter == ''
          ? this.allUserlist
          : this.allUserlist.filter((option) =>
              option.first_name.toLowerCase().startsWith(filter)
            );
    } else {
      this.userlist = this.allUserlist;
    }
  }

  pageNavigations(event?: any) {
    console.log(event);
    this.getUserlist(event.pageIndex, event.pageSize);
  }

  ngOnInit(): void {}

  async getUserlist(pageNumber: number, pageSize: number) {
    let response = await this.baseApiService.getRequestMethod(
      `users?_page=${pageNumber + 1}&_limit=${pageSize}`
    );
    this.userlist = response;
    this.allUserlist = this.userlist;
    if (this.userlist) {
      this.alertBarService.showAlert.next('User list successfully generated');
      this.isData = true;
    }
  }

  async deleteUser(userId: number) {
    let respone = await this.baseApiService.deleteRequestMethod(
      'users/' + userId
    );
    if (respone) {
      this.alertBarService.showAlert.next('User delete successfully');
      var splicIndex = this.userlist.findIndex((el) => el.id === userId);
      this.userlist.splice(splicIndex, 1);
    }
  }
}
