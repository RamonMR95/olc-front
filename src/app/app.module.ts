import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { JwtInterceptor } from "./interceptors/jwt.interceptor";

import { AppComponent } from "./app.component";
import { UsersComponent } from "./components/users/users.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoginComponent } from "./components/login/login.component";
import { LoginModalComponent } from "./components/login-modal/login-modal.component";
import { RegisterComponent } from "./components/register/register.component";
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { EnrollmentListComponent } from "./components/enrollment-list/enrollment-list.component";
import { ExamComponent } from './components/exam/exam.component';
import { UploadComponent } from './components/upload/upload.component';
import { environment } from 'src/environments/environment';
import { UtilModule } from './utils/marks-graph/util.module';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    LoginModalComponent,
    ProfileComponent,
    RegisterComponent,
    EnrollmentComponent,
    EnrollmentListComponent,
    ExamComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    UtilModule
  ],
  entryComponents: [LoginModalComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
