// console.log("Hello World");

import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import QuizController from './controller/quiz.controller.ts';

const PORT: number = 3000;
const MAX_QUESTION_COUNT : number = 10;


const server = createServer(
  (req: IncomingMessage, res: ServerResponse): void => {
    const { url, method } = req;

    if (url === '/' && method === 'GET') {
      const html = QuizController.getStart();

      res
        .writeHead(200, 'A-OK', {
          'content-type': 'text/html',
        })
        .write(html);

      res.end();
    } else if (url === '/next' && method === 'GET') {
      const html = QuizController.getQuestion();

      res
        .writeHead(200, 'A-OK', {
          'content-type': 'text/html',
        })
        .write(html);

      res.end();
    } else if (url === '/end' && method === 'GET') {
      const html = QuizController.getEnd();

      res
        .writeHead(200, 'A-OK', {
          'content-type': 'text/html',
        })
        .write(html);
    }
  }
);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
