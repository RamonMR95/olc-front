import { User } from "./user.model";
import { Exam } from "./exam.model";

export class UserExam {
  constructor(
    public user: User,
    public exam: Exam,
    public mark: number,
    public date: Date
  ) {}
}
