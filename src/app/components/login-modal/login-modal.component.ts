import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LoginComponent } from "../login/login.component";
import { UserLogin } from "../../interfaces/user.login.interface";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.scss"],
})
export class LoginModalComponent implements OnInit {
  form: FormGroup;
  public dialogRef: MatDialogRef<LoginComponent>;
  @Inject(MAT_DIALOG_DATA) public data: UserLogin;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [""],
    });
  }
}
