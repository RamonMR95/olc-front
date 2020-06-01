import { Course } from "./course.model";

export class enrollment {
  constructor(
    public mentor: string,
    public course: Course,
    public subjects: string[]
  ) {}
}
