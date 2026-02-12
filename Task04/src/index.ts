// console.log("Hello World");

import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import QuizController from './controller/quiz.controller.ts';

const PORT: number = 3000;
const MAX_QUESTION_COUNT: number = 10;

let CURRENT_COUNTER: number = -1;
let CURRENT_SCORE: number = -1;

const server = createServer(
  (req: IncomingMessage, res: ServerResponse): void => {
    const { url, method } = req;

    if (url === '/' && method === 'GET') {
      const html = QuizController.getStart();
      CURRENT_COUNTER = -1;
      CURRENT_SCORE = 0;
      res
        .writeHead(200, 'A-OK', {
          'content-type': 'text/html',
        })
        .write(html);

      res.end();
      return;

    } else if (url === '/next' && method === 'GET') {
      if (CURRENT_COUNTER == -1) {
        CURRENT_COUNTER = 0;
      } else {
        ++CURRENT_COUNTER;
      }
      if (!(CURRENT_COUNTER >= MAX_QUESTION_COUNT)) {
        const html = QuizController.getQuestion(CURRENT_SCORE);

        res
          .writeHead(200, 'A-OK', {
            'content-type': 'text/html',
          })
          .write(html);

        res.end();
      } else {
        res.writeHead(302, { Location: '/end' });
        res.end();
        return;
      }
    } else if (url === '/end' && method === 'GET') {
      const html = QuizController.getEnd();

      res
        .writeHead(200, 'A-OK', {
          'content-type': 'text/html',
        })
        .write(html);

      res.end();
      return;
    }
  }
);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
