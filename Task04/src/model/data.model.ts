import { readFileSync } from 'fs';
import { type QuizQuestion, type QuestionArray } from '../types/index.types.ts';

export default class QuestionProvider {
  //singleton
  readonly Questions: QuestionArray = [];

  private static provider: QuestionProvider | null = null;

  private constructor(arr: QuestionArray) {
    this.Questions = arr;
  }

  static getProvider(): QuestionProvider {
    if (QuestionProvider.provider) return QuestionProvider.provider;

    let arr: QuestionArray;
    arr = JSON.parse(readFileSync('./question.json', 'utf-8')).questions;
    QuestionProvider.provider = new QuestionProvider(arr);

    return QuestionProvider.provider;
  }

  readQuestion(index: number): QuizQuestion {
    const question = this.Questions[index];

    if (!question) {
      throw new Error('Question not found');
    }
    
    return question;
  }
}
