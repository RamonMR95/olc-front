import { Question } from "../models/question.model";
import { Answer } from "../models/answer.model";

export interface QuestionAnswer {
  question: Question;
  answers: Answer[];
}
