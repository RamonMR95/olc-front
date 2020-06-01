import { Course } from "../models/course.model";
import { Subject } from "../models/subject.model";

export interface CourseSubject {
  course: Course;
  subjects: Subject[];
  mentor: string;
}
