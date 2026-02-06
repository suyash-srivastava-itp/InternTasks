// console.log("Hello World");
import { createServer, IncomingMessage, ServerResponse } from "node:http"; 

const PORT : number = 3000;

const server = createServer((req : IncomingMessage , res : ServerResponse) : void => {
    res.writeHead(200, {
        "Content-type" : "text/plain"
    })
    res.end("Hello from server");
})

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
    
})