import QuestionProvider from '../model/data.model.ts';
import type { QuizQuestion } from '../types/index.types.ts';
import EtaLoader from '../utils/eta.loader.ts';
import { calculateScore } from '../utils/utilityfns.ts';

export default class QuizController {
  static etaLoader: EtaLoader;

  static getQuestion(score : number): string | undefined {
    const questionProvider = QuestionProvider.getProvider();
    QuizController.etaLoader = EtaLoader.getEtaLoader();
    
    let num : number = Math.floor(Math.random()*25);


    // console.log(num);

    let ques: QuizQuestion = questionProvider.readQuestion(num);
    // console.log(ques);
    let html = QuizController.etaLoader.eta?.render('index', {
      route: '/next',
      currentScore : score,
      question: ques.question,
      options: ques.options,
      correctOption : ques.correctOption
    }); // setup template

    return html;
  }

  static getStart(): string | undefined {
    QuizController.etaLoader = EtaLoader.getEtaLoader();
    let html = QuizController.etaLoader.eta?.render('index', { route: '/' }); // setup template

    return html;
  }

  static getEnd(): string | undefined {
    QuizController.etaLoader = EtaLoader.getEtaLoader();
    let score: number = calculateScore();

    let html = QuizController.etaLoader.eta?.render('index', {
      route: '/end',
      score,
    }); // end quiz template

    return html;
  }
}
