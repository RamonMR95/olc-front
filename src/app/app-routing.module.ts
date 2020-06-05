import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UsersComponent } from "./components/users/users.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { EnrollmentListComponent } from "./components/enrollment-list/enrollment-list.component";
import { SubjectsComponent } from './components/subjects/subjects.component';
import { AuthGuard } from "./guards/auth.guard";
import { ExamComponent } from './components/exam/exam.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExamGuard } from './guards/exam.guard';
import { TopicComponent } from './components/topic/topic.component';

const routes: Routes = [
  { path: "", redirectTo: "/users", pathMatch: "full" },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  { path: "profile/:id", component: ProfileComponent, canActivate: [AuthGuard]},
  { path: "enrollment", component: EnrollmentListComponent, canActivate: [AuthGuard] },
  { path: "course/:id", component: SubjectsComponent, canActivate: [AuthGuard] },
  { path: "exam/:id", component: ExamComponent, canActivate: [AuthGuard, ExamGuard] },
  { path: "subject/:name/themes", component: TopicComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
