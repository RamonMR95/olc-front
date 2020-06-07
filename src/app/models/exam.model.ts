import { Subject } from "src/app/models/subject.model";
import { Course } from "./course.model";
export class Exam {
  public id: number;

  constructor(
    public name?: string,
    public subject?: Subject,
    public course?: Course,
    public date?: Date,
    public visible?: boolean
  ) {}
}
