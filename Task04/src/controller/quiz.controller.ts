import QuestionProvider from '../model/data.model.ts';
import type { QuizQuestion } from '../types/index.types.ts';
import EtaLoader from '../utils/eta.loader.ts';
import { calculateScore } from '../utils/utilityfns.ts';

export default class QuizController {
  static etaLoader: EtaLoader;

  static getQuestion(): string | undefined {
    const questionProvider = QuestionProvider.getProvider();
    QuizController.etaLoader = EtaLoader.getEtaLoader();
    let num = 0; // some logic -> 0-9

    let ques: QuizQuestion = questionProvider.readQuestion(num);

    let html = QuizController.etaLoader.eta?.render('index', ques); // setup template

    return html;
  }

  static getStart(): string | undefined {
    let html = QuizController.etaLoader.eta?.render('start', {}); // setup template

    return html;
  }

  static getEnd() : string | undefined {

    let score : number = calculateScore();

    let html = QuizController.etaLoader.eta?.render('end', { score }); // end quiz template

    return html;
  }
}
