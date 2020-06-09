import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { UtilModule } from './utils/util.module';

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
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ExamComponent } from './components/exam/exam.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TopicComponent } from './components/topic/topic.component';
import { TopicContentComponent } from './components/topic-content/topic-content.component';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { ExamFormComponent } from './components/exam-form/exam-form.component';

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
    SubjectsComponent,
    TopicComponent,
    TopicContentComponent,
    ExamComponent,
    HomeComponent,
    NewsComponent,
    ExamFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
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
