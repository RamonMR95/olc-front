import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from "./components/login/login.component";
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterComponent } from './components/register/register.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { EnrollmentListComponent } from './components/enrollment-list/enrollment-list.component';
import { UtilModule } from './utils/marks-graph/util.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    LoginModalComponent,
    RegisterComponent,
    EnrollmentComponent,
    EnrollmentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UtilModule
  ],
  entryComponents: [LoginModalComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}