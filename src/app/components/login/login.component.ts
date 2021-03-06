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
      data: {}
    });

    dialogRef.afterClosed().subscribe(
      (data) => {
        data ? this.login(data) : this.router.navigate(["/"]);
      },
      (_) => {
        this.router.navigate(["/"]);
      }
    );
  }

  async login(user: UserLogin): Promise<void> {
    await this.loginService
      .authenticate(user)
      .then((resp: any) => {
        this.loginService.setLocalStorage(resp);
        this.router.navigate(["/home"]);
      })
      .catch((_) => {
        this.loginService.logout();
        this.router.url.replace("/", "") === "register"
          ? this.router.navigate(["/register"])
          : this.router.navigate(["/login"]);
      });
      location.reload();
  }
}
