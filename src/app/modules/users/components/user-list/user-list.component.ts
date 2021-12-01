import { Component, OnInit } from '@angular/core';
import { BaseApiService } from 'app/modules/core/services/base/base-api.service';
import { FormControl } from '@angular/forms';

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

  constructor(public baseApiService: BaseApiService) {
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
    // this.Page = event.pageIndex;
    // this.Size = event.pageSize;
    // this.reloadData();
  }

  ngOnInit(): void {}

  async getUserlist(pageNumber: number, pageSize: number) {
    let response = await this.baseApiService.getRequestMethod(
      `users?_page=${pageNumber + 1}&_limit=${pageSize}`
    );
    this.userlist = response;
    this.allUserlist = this.userlist;
    if (this.userlist) {
      console.log(this.userlist);
      this.isData = true;
    }
  }

  async deleteUser(userId: number) {
    let respone = await this.baseApiService.deleteRequestMethod(
      'users/' + userId
    );
    if (respone) {
      var splicIndex = this.userlist.findIndex((el) => el.id === userId);
      this.userlist.splice(splicIndex, 1);
    }
  }
}
