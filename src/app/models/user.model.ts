import { Address } from "./address.model";
import { Role } from "./role.model";
import { Course } from "./course.model";

export class User {
  public id: number;
  public active: boolean = true;

  constructor(
    public address: Address,
    public role: Role,
    public course: Course,
    public name: String,
    public surName: String,
    public nickName: String,
    public email: String,
    public password: String
  ) {}
}
