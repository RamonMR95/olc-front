import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";
import { UploadService } from "../../services/upload.service";
import { UserService } from "../../services/user.service";
import { User } from "src/app/models/user.model";
import { v4 as uuid } from "uuid";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"],
})
export class UploadComponent implements OnInit {
  user: User;
  uploadPercent: Observable<number>;
  downloadURL: string;

  constructor(
    private storage: AngularFireStorage,
    private uploadService: UploadService,
    private userService: UserService
  ) {}

  @Input() userPhoto: User;
  @Input() seeUploadPhoto: boolean;
  isUploadFile: boolean = false;

  ngOnInit(): void {
    this.userService
      .getUserByEmail(localStorage.getItem("email"))
      .then((usr) => (this.user = usr));
  }

  async uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `/images/${uuid() + "-" + file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    this.isUploadFile = true;

    task
      .snapshotChanges()
      .pipe(
        finalize(() =>
          fileRef.getDownloadURL().subscribe(async (res) => {
            this.downloadURL = res;
            let urlEncode: string = encodeURI(this.downloadURL);
            await this.uploadService.uploadPhoto(this.user.id, urlEncode);
            setInterval(
              (_) => ((this.isUploadFile = false), location.reload()),
              200
            );
          })
        )
      )
      .subscribe();
  }
}
