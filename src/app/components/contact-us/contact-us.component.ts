import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmailService } from "src/app/services/email.service";
import { EmailContact } from "../../interfaces/email.contact.interface";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"],
})
export class ContactUsComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      nameUsr: ["", Validators.required],
      emailUsr: ["", Validators.required],
      subject: ["", Validators.required],
      body: ["", Validators.required],
    });
  }

  sendMessage() {
    let msgEmail: EmailContact = {
      name: this.form.controls.nameUsr.value,
      email: this.form.controls.emailUsr.value,
      subject: this.form.controls.subject.value,
      body: this.form.controls.body.value,
    };
    this.emailService
      .submitContactEmail(msgEmail)
      .then((_) => {
        Swal.fire(
          "The message was sent!!!",
          "We will reply you in about 24/48 Hours",
          "success"
        ).then((_) => {
          this.form.reset();
          this.router.navigate(["/home"]);
        });
      })
      .catch((_) => {
        Swal.fire(
          "The message wasn't sent!!!",
          "There was a problem sending the email.",
          "error"
        );
      });
  }
}
