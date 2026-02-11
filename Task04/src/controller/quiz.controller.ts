import QuestionProvider from '../model/data.model.ts';
import type { QuizQuestion } from '../types/index.types.ts';
import EtaLoader from '../utils/eta.loader.ts';
import { calculateScore } from '../utils/utilityfns.ts';


export default class QuizController {
  static etaLoader: EtaLoader;

  static getQuestion(): string | undefined {
    const questionProvider = QuestionProvider.getProvider();
    QuizController.etaLoader = EtaLoader.getEtaLoader();
    let num = 2; // some logic -> 0-

    let ques: QuizQuestion = questionProvider.readQuestion(num);

    let html = QuizController.etaLoader.eta?.render('index', ques); // setup template

    return html;
  }

  static getStart(): string | undefined {
    QuizController.etaLoader = EtaLoader.getEtaLoader();
    let html = QuizController.etaLoader.eta?.render('index', {route:"/"}); // setup template

    return html;
  }

  static getEnd() : string | undefined {

    QuizController.etaLoader = EtaLoader.getEtaLoader();
    let score : number = calculateScore();

    let html = QuizController.etaLoader.eta?.render('index', { route:"/end", score }); // end quiz template

    return html;
  }
}
