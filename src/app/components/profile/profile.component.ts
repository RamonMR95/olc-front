import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/models/user.model";
import { Course } from "src/app/models/course.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { AddressService } from "../../services/address.service";
import { Address } from "src/app/models/address.model";
import { Role } from "src/app/models/role.model";
import { ActivatedRoute } from "@angular/router";
import { RoleService } from "../../services/role.service";
import Swal from "sweetalert2";
import { CourseService } from '../../services/course.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public user: User;
  public address: Address;
  public role: Role;

  private activatedEdit: boolean;
  private userUpdate: boolean;
  private adddressUpdate: boolean;

  public form: FormGroup;
  public formAddress: FormGroup;

  public courseUsr: Course;
  public mentor: User;

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private roleService: RoleService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.activatedEdit= true;
    this.userUpdate = false;
    this.adddressUpdate = false;
    this.initForms();
    this.init();
  }

  private async init(): Promise<any> {
    this.loadDataModal();
    await this.getData();
    this.loadData();

  }

  async getData(): Promise<any> {

    await Promise.all([
      this.getUserData(),
      this.getAddressData(),
      this.getRoleData(),
      await this.getCourseData(),
      this.getMentorByCourseId(this.courseUsr.id)
    ]);
  }

  getUserData(): Promise<any> {
    return this.userService
      .getUser(this.route.snapshot.params.id)
      .then((usr) => (this.user = usr));
  }

  getAddressData(): Promise<any> {
    return this.addressService
      .getAddressByUserId(this.route.snapshot.params.id)
      .then((addr) => (this.address = addr));
  }

  getRoleData(): Promise<any> {
    return this.roleService
      .getRole(this.route.snapshot.params.id)
      .then((rle) => (this.role = rle));
  }

  getCourseData(): Promise<any> {
    return this.courseService
      .getCoursesByUserId(this.route.snapshot.params.id)
      .then(crsUrs => this.courseUsr = crsUrs[0]);
  }

  getMentorByCourseId(courseId: number): Promise<User> {
    return this.userService.getMentorByCourseId(courseId).then(mnt => this.mentor = mnt);
  }

  private initForms() {
    this.form = this.fb.group({
      nameUser: [
        { value: "", disabled: this.activatedEdit },
        Validators.required,
      ],
      surName: [
        { value: "", disabled: this.activatedEdit },
        Validators.required,
      ],
      nickName: [
        { value: "", disabled: this.activatedEdit },
        Validators.required,
      ],
      email: [
        { value: "", disabled: this.activatedEdit },
        [Validators.required, Validators.email],
      ],
      passwordUsr: [
        { value: "", disabled: this.activatedEdit },
        [Validators.min(6), Validators.max(25), Validators.required],
      ],
      birthday: [{ value: "", disabled: true }],
    });

    this.formAddress = this.fb.group({
      street: [
        { value: "", disabled: this.activatedEdit },
        Validators.required,
      ],
      city: [{ value: "", disabled: this.activatedEdit }, Validators.required],
      province: [
        { value: "", disabled: this.activatedEdit },
        Validators.required,
      ],
      zip: [{ value: "", disabled: this.activatedEdit }, Validators.required],
      country: [
        { value: "", disabled: this.activatedEdit },
        [Validators.min(6), Validators.max(25), Validators.required],
      ],
    });
  }

  public editProfile() {
    this.resetButtonsAndData();
  }

  public handleCancel() {
    this.resetButtonsAndData();
  }

  public async updateProfile(): Promise<any> {
    await this.updateProfileUser();
    await this.updateProfileAddress();
    await this.isCorrect();
  }

  private async updateProfileUser(): Promise<any> {
    let newUser: User = new User(
      this.address,
      this.role,
      this.courseUsr,
      this.form.controls.nameUser.value,
      this.form.controls.surName.value,
      this.form.controls.nickName.value,
      this.form.controls.email.value,
      this.form.controls.passwordUsr.value
    );
    await this.userService
      .updateUser(newUser, this.route.snapshot.params.id)
      .then((_) => {
        this.userUpdate = true;
        this.user = newUser;
      });
  }

  private async updateProfileAddress(): Promise<any> {
    let newAddress: Address = new Address(
      this.formAddress.controls.street.value,
      this.formAddress.controls.city.value,
      this.formAddress.controls.province.value,
      this.formAddress.controls.zip.value,
      this.formAddress.controls.country.value
    );

    await this.userService
      .getUser(this.route.snapshot.params.id)
      .then((usr) => {
        this.addressService
          .updateUserAddress(newAddress, usr.address.id)
          .then((_) => {
            this.adddressUpdate = true;
            this.address = newAddress;
          });
      });
  }

  async isCorrect() {
    this.userUpdate || this.adddressUpdate
      ? Swal.fire(
          "Profile updated",
          "You clicked the button for go back!",
          "success"
        ).then((_) => this.resetButtonsAndData())
      : Swal.fire(
          "Profile updated error",
          "You clicked the button for go back!",
          "error"
        ).then((_) => this.resetButtonsAndData());
  }

  private loadData() {
    this.loadProfileData();
    this.loadAddressData();
    Swal.close();
  }

  private loadProfileData() {
    this.form.controls.nameUser.setValue(this.user.name);
    this.form.controls.surName.setValue(this.user.surName);
    this.form.controls.email.setValue(this.user.email);
    this.form.controls.passwordUsr.setValue(this.user.password);
    this.form.controls.birthday.setValue(this.user.birthDate);
  }

  private loadAddressData() {
    this.formAddress.controls.street.setValue(this.address.street);
    this.formAddress.controls.city.setValue(this.address.city);
    this.formAddress.controls.province.setValue(this.address.province);
    this.formAddress.controls.zip.setValue(this.address.zip);
    this.formAddress.controls.country.setValue(this.address.country);
  }

  private resetButtonsAndData() {
    this.activatedEdit =
      this.activatedEdit != true
        ? (this.activatedEdit = true)
        : (this.activatedEdit = false);
    this.initForms();
    this.loadData();
  }

  private loadDataModal() {
    Swal.fire({
      title: 'Loading data Profile',
      text: 'We are get your profile data.',
      padding: '12em',
      width: 650,
      allowEscapeKey: false,
      allowOutsideClick: false,
      background: 'rgba(255, 255, 255, 0.8)',
      scrollbarPadding: false,
      showConfirmButton: false,
      position: "center"
    });
    Swal.showLoading();
  }
}
