import { format, Logger, transports } from "winston";



const logger = new Logger({
    level : 'http',
    format : format.json(),
    transports : [
        new transports.File({
            filename : "requestLogs.json",
            dirname : "./logs",
        })
    ]
})

export default logger;