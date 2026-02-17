import { jest } from '@jest/globals';

import QuizController from '../controller/quiz.controller.ts';
import QuestionProvider from '../model/data.model.ts';
import EtaLoader from '../utils/eta.loader.ts';
import type { QuizQuestion } from '../types/index.types.ts';

// jest.unstable_mockModule('../model/data.model.ts', () => ({
//   default: {
//     getProvider: jest.fn(),
//   },
// }));
// jest.unstable_mockModule('../utils/eta.loader.ts', () => ({
//   __esModule: true,
//   default: {
//     getEtaLoader: jest.fn(),
//   },
// }));

// describe('QuizController', () => {
//   let mockQuestion: QuizQuestion;
//   let mockRender: jest.Mock;

//   beforeEach(() => {
//     jest.clearAllMocks();

//     mockQuestion = {
//       question: 'What is 2+2?',
//       options: ['1', '2', '3', '4'],
//       correctOption: '4',
//     };

//     // Mock QuestionProvider
//     (QuestionProvider.getProvider as jest.Mock).mockReturnValue({
//       readQuestion: jest.fn().mockReturnValue(mockQuestion),
//     });

//     // Mock EtaLoader
//     mockRender = jest.fn().mockReturnValue('<html>mocked html</html>');
//     (EtaLoader.getEtaLoader as jest.Mock).mockReturnValue({
//       eta: { render: mockRender },
//     });
//   });

//   describe('getStart', () => {
//     it('should render start template with correct route', () => {
//       const html = QuizController.getStart();

//       expect(EtaLoader.getEtaLoader).toHaveBeenCalled();
//       expect(mockRender).toHaveBeenCalledWith('index', { route: '/' });
//       expect(html).toBe('<html>mocked html</html>');
//     });
//   });

//   describe('getQuestion', () => {
//     it('should render question template with question data', () => {
//       const html = QuizController.getQuestion(5);

//       const questionProvider = QuestionProvider.getProvider();

//       expect(questionProvider.readQuestion).toHaveBeenCalled();
//       expect(EtaLoader.getEtaLoader).toHaveBeenCalled();

//       expect(mockRender).toHaveBeenCalledWith('index', {
//         route: '/next',
//         question: mockQuestion.question,
//         options: mockQuestion.options,
//         correctOption: mockQuestion.correctOption,
//       });

//       expect(html).toBe('<html>mocked html</html>');
//     });
//   });

//   describe('getEnd', () => {
//     it('should render end template with correct route', () => {
//       const html = QuizController.getEnd();

//       expect(EtaLoader.getEtaLoader).toHaveBeenCalled();
//       expect(mockRender).toHaveBeenCalledWith('index', {
//         route: '/end',
//       });

//       expect(html).toBe('<html>mocked html</html>');
//     });
//   });
// });
