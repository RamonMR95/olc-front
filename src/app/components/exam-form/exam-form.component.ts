import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ExamService } from "../../services/exam.service";
import { Exam } from "../../models/exam.model";
import { SubjectService } from "../../services/subject.service";
import { CourseService } from "../../services/course.service";
import { Course } from "src/app/models/course.model";
import { Subject } from "src/app/models/subject.model";
import { Question } from "../../models/question.model";
import { QuestionAnswer } from "src/app/interfaces/question.answer.interface";
import { Answer } from "../../models/answer.model";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

const MAX_QUESTIONS: number = 5;

@Component({
  selector: "app-exam-form",
  templateUrl: "./exam-form.component.html",
  styleUrls: ["./exam-form.component.scss"],
})
export class ExamFormComponent implements OnInit {
  form: FormGroup;
  questionsForm: FormGroup;
  questions: any = [];
  counter: number = 1;
  courses: Course[];
  subjects: Subject[];
  exam: Exam;
  course: Course;
  subject: Subject;
  isExamCreated: boolean = false;
  questionCounter: number = 1;
  selected: any;

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private subjectService: SubjectService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.getCourses();
  }

  initForm(): void {
    this.form = this.fb.group({
      examName: ["", Validators.required],
      course: ["", Validators.required],
      subject: ["", Validators.required],
      date: ["", Validators.required],
      visible: ["", Validators.required],
    });

    this.questionsForm = this.fb.group({
      question: ["", Validators.required],
      answer1: ["", Validators.required],
      answer2: ["", Validators.required],
      answer3: ["", Validators.required],
      answer4: ["", Validators.required],
      correct: ["", Validators.required],
    });
  }

  async createExam(): Promise<any> {
    await this.subjectService
      .getSubjectBySubjectName(this.form.controls.subject.value)
      .then((sbj) => (this.subject = sbj))
      .catch(console.log);
    await this.courseService
      .getCourse(this.form.controls.course.value)
      .then((crs) => (this.course = crs));
    let exam = new Exam(
      this.form.controls.examName.value,
      this.subject,
      this.course,
      new Date(this.form.controls.date.value),
      this.form.controls.visible.value === true ? true : false
    );
    this.examService
      .createExam(exam)
      .then((e) => {
        this.exam = e;
        this.isExamCreated = true;
      })
      .catch(console.log);
  }

  getCourses(): void {
    this.courseService.getCourses().then((crs: Course[]) => {
      this.courses = crs;
    });
  }

  handleCourseChange(event: any): void {
    let selectedCourseId = event.value;
    this.getSubjects(selectedCourseId);
  }

  getSubjects(courseId: number): void {
    if (courseId != undefined) {
      this.subjectService.getSubjectsByCourseId(courseId).then((sbjs) => {
        this.subjects = sbjs;
      });
    }
  }

  createQuestion(): void {
    if (this.questionCounter <= MAX_QUESTIONS) {
      let question = new Question(this.questionsForm.controls.question.value);
      let ans1 = new Answer(this.questionsForm.controls.answer1.value, false);
      let ans2 = new Answer(this.questionsForm.controls.answer2.value, false);
      let ans3 = new Answer(this.questionsForm.controls.answer3.value, false);
      let ans4 = new Answer(this.questionsForm.controls.answer4.value, false);
      let correctAnswer = this.questionsForm.controls.correct.value;
      let answers: Answer[] = [ans1, ans2, ans3, ans4];
      answers[correctAnswer - 1].correct = true;
      let qa: QuestionAnswer = { question, answers };
      this.examService.createQuestion(this.exam.id, qa).then((_) => {
        this.clearQuestions();
        this.questionCounter++;
      });
    } else {
      Swal.fire(
        "Exam completed",
        "You have created an exam with 5 questions",
        "success"
      ).then((_) => this.router.navigate(["/home"]));
    }
  }

  clearQuestions(): void {
    this.questionsForm.controls.question.setValue("");
    this.questionsForm.controls.answer1.setValue("");
    this.questionsForm.controls.answer2.setValue("");
    this.questionsForm.controls.answer3.setValue("");
    this.questionsForm.controls.answer4.setValue("");
  }

  cancelOperation(): void {
    if (this.isExamCreated) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            "Exam deletion",
            "Your exam has been deleted.",
            "success"
          ).then((_) => {
            if (this.isExamCreated) {
              this.examService
                .deleteExam(this.exam.id)
                .then((_) => this.router.navigate(["/home"]));
            } else {
              this.router.navigate(["/home"]);
            }
          });
        }
      });
    } else {
      this.router.navigate(["/home"]);
    }
  }
}
