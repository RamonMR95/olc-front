import { Question } from "../models/question.model";
import { Answer } from "../models/answer.model";

export interface QuestionAnswerCorrect {
  question: Question;
  answer: Answer;
  correct: boolean;
}
