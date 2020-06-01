import { User } from "../models/user.model";
import { Subject } from "../models/subject.model";
import { Course } from "../models/course.model";

export interface IEnrollment {
  mentor: String;
  subject: Subject[];
  course: Course;
}
