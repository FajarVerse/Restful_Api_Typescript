import winston from "winston";

// Setup Winston (Logger)
export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [new winston.transports.Console({})],
});
