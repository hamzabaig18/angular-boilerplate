import { Component, OnInit } from '@angular/core';
import { BaseApiService } from 'app/modules/core/services/base/base-api.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertBarService } from 'app/modules/core/services/alert-bar/alert-bar.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    public baseApiService: BaseApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log('its params' + JSON.stringify(params, null, 4));
      if (params['page'] == undefined || params['firstName'] == undefined) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            page: this.currentPage + 1,
            firstName: '',
          },
        });
      }
      if (params['page'] !== undefined && params['page'] != 0) {
        this.currentPage = parseInt(params['page']);
      }
      this.getUserlist(this.currentPage, this.pageSize)
        .then(() => {
          if (params['firstName'] !== undefined && params['firstName'] !== '') {
            this.search(params['firstName']);
          }
        })
        .catch((e) => {
          console.log('Error Occured while fetching userlists');
        });
    });
  }

  updateParams(page: number, value: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page,
        firstName: value,
      },
    });
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
      this.updateParams(this.currentPage, filter);
    } else {
      this.userlist = this.allUserlist;
    }
  }

  pageNavigations(event?: any) {
    console.log(event);
    this.getUserlist(event.pageIndex + 1, event.pageSize);
    this.updateParams(event.pageIndex + 1, '');
  }

  ngOnInit(): void {}

  async getUserlist(pageNumber: number, pageSize: number) {
    let response = await this.baseApiService.getRequestMethod(
      `users?_page=${pageNumber}&_limit=${pageSize}`
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
