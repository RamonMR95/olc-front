import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../models/user.model";
import { Address } from "../../models/address.model";
import { Role } from '../../models/role.model';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
     public userService: UserService,
      public router: Router) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ["", Validators.required],
      surnameCtrl: ["", Validators.required],
      emailCtrl: ["", [Validators.required, Validators.email]],
      passwordCtrl: ["", Validators.required],
      birthDate: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      streetCtrl: ["", Validators.required],
      cityCtrl: ["", Validators.required],
      provinceCtrl: ["", Validators.required],
      zipCtrl: ["", Validators.required],
      countryCtrl: ["", Validators.required],
    });
  }

  registerUsers() {
    let newAdress: Address = new Address(
      this.secondFormGroup.controls.streetCtrl.value,
      this.secondFormGroup.controls.cityCtrl.value,
      this.secondFormGroup.controls.provinceCtrl.value,
      this.secondFormGroup.controls.zipCtrl.value,
      this.secondFormGroup.controls.countryCtrl.value
      );

    let newRole: Role = new Role()
    
    let newUser: User = new User(
      newAdress,
      newRole,
      null,
      this.firstFormGroup.controls.nameCtrl.value,
      this.firstFormGroup.controls.surnameCtrl.value,
      this.firstFormGroup.controls.emailCtrl.value,
      this.firstFormGroup.controls.passwordCtrl.value,
      this.firstFormGroup.controls.birthDate.value
    );

   this.userService.createUser(newUser)
   .then(usr => {
     Swal.fire("Registered!", "You have registered for OLC.", "success")
     .then(_ => this.router.navigate(["/login"]));
    })
   .catch(_ => Swal.fire("Invalid register!", "You have submitted invalid data.", "error"));
  }
}
