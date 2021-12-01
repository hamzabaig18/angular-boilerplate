import { Component } from '@angular/core';
import { IsLoadingService } from './modules/core/services/loading/is-loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loaderActive: boolean = false;
  title = 'bank-portal';
  constructor(private isLoadingService: IsLoadingService) {
    this.isLoadingService.isLoading.subscribe((result) => {
      this.loaderActive = result;
    });
    //this.loaderActive = this.isLoadingService.isLoading.observed;
  }
}
