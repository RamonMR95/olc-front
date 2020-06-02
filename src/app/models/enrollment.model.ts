import { Course } from "./course.model";

export class Enrollment {
  constructor(
    public mentor: string,
    public course: Course,
    public subjects: string[]
  ) {}
}
