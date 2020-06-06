import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { UserLogin } from "../../interfaces/user.login.interface";
import { MatDialog } from "@angular/material/dialog";
import { LoginModalComponent } from "../login-modal/login-modal.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loginService.logout();
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: "500px",
      data: {},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(
      (data) => {
        this.login(data);
      },
      (err) => {
        console.log(err);
        this.openDialog();
      }
    );
  }

  login(user: UserLogin): void {
    this.loginService
      .authenticate(user)
      .then((resp: any) => {
        this.loginService.setLocalStorage(resp);
        this.router.navigate(["/home"]);
      })
      .catch((err) => {
        this.loginService.logout();
        this.router.url.replace("/", "") === "register"
          ? this.router.navigate(["/register"])
          : this.router.navigate(["/login"]);
      });
  }
}
