import { Component, OnInit } from "@angular/core";
import { ExamService } from "../../services/exam.service";
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionAnswer } from "../../interfaces/question.answer.interface";
import { UserExam } from "../../models/user.exam.model";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Exam } from "../../models/exam.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-exam",
  templateUrl: "./exam.component.html",
  styleUrls: ["./exam.component.scss"],
})
export class ExamComponent implements OnInit {
  exam: string;
  examId: number;
  questions: QuestionAnswer[] = [];
  selected: Array<any> = new Array(5);
  correctAnswers: number = 0;

  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.examId = this.route.snapshot.params.id;
    this.getQuestionsAndAnswers(this.examId);
  }

  getQuestionsAndAnswers(examId: number) {
    this.examService.getExamByExamId(examId).then((exm) => {
      this.exam = exm.name;
      this.examService.getQuestionsAndAnswersByExamId(examId).then((exam) => {
        for (let i = 0; i < exam.length; i++) {
          let question: QuestionAnswer = {
            question: exam[i].question,
            answers: exam[i].answer,
          };
          this.questions.push(question);
        }
      });
    });
  }

  submitExam(): void {
    this.evaluateExam();
    this.createExam();
  }

  evaluateExam(): void {
    this.selected.forEach((s) => {
      if (s.correct) {
        this.correctAnswers++;
      }
    });
  }

  createExam(): void {
    let usr = new User();
    // usr.id = parseInt(localStorage.getItem("id"));
    usr.id = 1;
    let exam = new Exam();
    exam.id = this.examId;
    let userExam = new UserExam(usr, exam, this.correctAnswers, new Date());
    console.log(userExam)
    this.examService.submitExam(userExam);
  }

  confirmSubmit(): void {
    Swal.fire({
      title: "Are you sure you want to submit the exam?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Submited!", "Your exam has been submitted.", "success");
        this.submitExam();
        this.router.navigate(["/profile/", 1]);
      }
    });
  }
}
