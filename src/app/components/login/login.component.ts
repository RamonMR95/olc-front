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
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: "500px",
    });

    dialogRef.afterClosed().subscribe(() => {
      this.login();
    });
  }

  login(): void {
    // let user: UserLogin = {
    //   email: this.form.controls.email.value,
    //   password: this.form.controls.password.value,
    // };
    // this.loginService
    //   .login(user)
    //   .then(() => {
    //     this.router.navigate(["/"]);
    //   })
    //   .catch((err) => {
    //   });
  }
}
