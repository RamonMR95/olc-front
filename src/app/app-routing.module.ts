import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";

import { UsersComponent } from "./components/users/users.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { EnrollmentListComponent } from "./components/enrollment-list/enrollment-list.component";
import { SubjectsComponent } from "./components/subjects/subjects.component";
import { AuthGuard } from "./guards/auth.guard";
import { ProfileComponent } from "./components/profile/profile.component";
import { ExamGuard } from "./guards/exam.guard";
import { TopicComponent } from "./components/topic/topic.component";
import { ExamComponent } from "./components/exam/exam.component";
import { HomeComponent } from "./components/home/home.component";
import { NewsComponent } from "./components/news/news.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { ExamFormComponent } from "./components/exam-form/exam-form.component";
import { RoleGuard } from "./guards/role.guard";
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "news", component: NewsComponent },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: "profile/:id",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "course/:id",
    component: SubjectsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "exam",
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/home", pathMatch: "full" },
      { path: "show/:id", component: ExamComponent, canActivate: [ExamGuard] },
      {
        path: "creation",
        component: ExamFormComponent,
        canActivate: [RoleGuard],
      },
    ],
  },
  {
    path: "subject/:name/themes",
    component: TopicComponent,
    canActivate: [AuthGuard],
  },
  { path: "contact-us", component: ContactUsComponent },
  { path: "enrollment", component: EnrollmentListComponent },
  { path: "page-not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "/page-not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
