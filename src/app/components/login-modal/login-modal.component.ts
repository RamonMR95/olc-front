import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LoginComponent } from "../login/login.component";
import { UserLogin } from "../../interfaces/user.login.interface";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.scss"],
})
export class LoginModalComponent implements OnInit {
  public form: FormGroup;
  private user: UserLogin;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserLogin,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: ["ramonmr16@gmail.com", [Validators.required, Validators.email]],
      password: ["123456"],
    });
  }

  getCredentials(): void {
    this.user = {
      username: this.form.controls.email.value,
      password: this.form.controls.password.value,
    };
    this.dialogRef.close(this.user);
  }

  navigateToRegister(): void {
    this.dialogRef.close(this.user);
    this.router.navigate(["/register"]);
  }

}
