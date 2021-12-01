import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { LoaderComponent } from './components/loader/loader.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent],
  exports: [HeaderComponent, FooterComponent, LoaderComponent],
  imports: [
    MatToolbarModule,
    MatListModule,
    RouterModule,
    CommonModule,
    MatSnackBarModule,
  ],
})
export class CoreModule {}
