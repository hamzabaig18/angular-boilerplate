import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertBarService } from './modules/core/services/alert-bar/alert-bar.service';
import { IsLoadingService } from './modules/core/services/loading/is-loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loaderActive: boolean = false;
  title = 'bank-portal';
  constructor(
    public alertBarService: AlertBarService,
    private _snackBar: MatSnackBar,
    private isLoadingService: IsLoadingService
  ) {
    this.isLoadingService.isLoading.subscribe((result) => {
      this.loaderActive = result;
    });
    this.alertBarService.showAlert.subscribe((result) => {
      this.openSnackBar(result, 'close');
    });
    //this.loaderActive = this.isLoadingService.isLoading.observed;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
