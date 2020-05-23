import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UsersComponent } from "./components/users/users.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { EnrollmentListComponent } from "./components/enrollment-list/enrollment-list.component";

const routes: Routes = [
  { path: "", redirectTo: "/users", pathMatch: "full" },
  { path: "users", component: UsersComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "enrollment", component: EnrollmentListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
