import { Eta } from 'eta';
import path from 'node:path';
import type { QuizQuestion } from '../types/index.types.ts';

export default class EtaLoader {
  private static etaLoader: EtaLoader;
  eta: Eta | null;

  private constructor() {
    this.eta = new Eta({
      views: path.join(import.meta.dirname, '../view'),
    });
  }

  static getEtaLoader(): EtaLoader {
    if (EtaLoader.etaLoader) return this.etaLoader;

    EtaLoader.etaLoader = new EtaLoader();

    return EtaLoader.etaLoader;
  }
}
