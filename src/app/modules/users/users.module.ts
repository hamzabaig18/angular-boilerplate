import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

console.log('users module');
@NgModule({
  declarations: [UserListComponent, UserFormComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgxMatIntlTelInputModule,
    MatGridListModule,
    MatCardModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSnackBarModule,
  ],
})
export class UsersModule {}
