import { Injectable } from "@angular/core";
import {
  UrlTree,
  CanActivate,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let role: string = localStorage.getItem("role").toUpperCase();
    switch (role) {
      case "ADMIN": {
        return true;
      }
      case "TEACHER": {
        return true;
      }
      default: {
        this.router.navigate(["/home"]);
        return false;
      }
    }
  }
}
