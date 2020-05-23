import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../models/user.model";
import { Address } from "../../models/address.model";
import { Role } from '../../models/role.model';
import { Course } from 'src/app/models/course.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, public userService: UserService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ["", Validators.required],
      surnameCtrl: ["", Validators.required],
      emailCtrl: ["", [Validators.required, Validators.email]],
      passwordCtrl: ["", Validators.required],
      nicknameCtrl: ["", Validators.required],
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
    let newAdress: Address = new Address();
    newAdress.id = null;

    let newRole: Role = new Role()

    let newCourse: Course = new Course();
    newCourse.id = null;

    let newUser: User = new User(
      newAdress,
      newRole,
      newCourse,
      this.firstFormGroup.controls.nameCtrl.value,
      this.firstFormGroup.controls.surnameCtrl.value,
      this.firstFormGroup.controls.nicknameCtrl.value,
      this.firstFormGroup.controls.emailCtrl.value,
      this.firstFormGroup.controls.passwordCtrl.value
    );
    
   // this.userService.createUser(newUser);

  }
}
