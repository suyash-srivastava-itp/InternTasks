## Quiz App using MVC architecture

This project uses Node.js with Typescript to expose server endpoints that return html rendered on server using Eta.js template engine. It uses Jest for unit testing.


## Mindmap

 Port - 3000 -> localhost:3000

 route :
    "/" -> server receives request -> checks endpoint -> calls getStart function from controller -> returns rendered html with status code back.

    "/next" -> server receives request -> checks endpoint -> calls getQuestion function from controller -> 
    getQuestion calls QuestionProvider.readQuestion and renders html -> returns rendered html with status code back.

    "/end" -> server receives request -> checks endpoint -> calls getEnd function from controller -> returns rendered html with status code back.

 TESTING - 
    Jest : JS testing library

    mock() - function used to mock dependencies of a particular function/code to test it in isolation.
    describe() - group realted tests
    beforeEach() - logic to be run before each test case/clear state
    clearAllMocks() - resets call history





### Things learnt
- Constructors cannot be asynchronous
- Singleton class /Static factory methods
- iife


## Author 
Suyash Srivastava 