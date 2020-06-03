import { Component, OnInit } from "@angular/core";
import { ExamService } from "../../services/exam.service";
import { ActivatedRoute } from "@angular/router";
import { QuestionAnswer } from "../../interfaces/question.answer.interface";

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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.examId = this.route.snapshot.params.id;
    this.getQuestionsAndAnswers(this.examId);
  }

  getQuestionsAndAnswers(examId: number) {
    this.examService.getExamByExamId(examId).then(exm => {
      console.log(exm)
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
    })
  }

  submitExam(): void {
    this.evaluateExam();
  }

  evaluateExam(): void {
    this.selected.forEach(s => {
      if (s.correct) {
        this.correctAnswers++;
      }
    })
  }
}
