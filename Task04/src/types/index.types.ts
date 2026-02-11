export interface QuizQuestion {
  question: string;
  options: string[];
  correctOption: string;
}

export type QuestionArray = QuizQuestion[] 