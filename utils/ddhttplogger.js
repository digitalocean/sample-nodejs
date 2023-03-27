import { createLogger, format, transports } from 'winston';
import * as fs from "fs";
import * as crypto from "crypto";

class DataDog{
  hostname;
  service_name;
  source;
  logger;
  requestId;
  requester;
  env;

  constructor (req) {
    try{
      this.hostname = fs.readFileSync("/home/ubuntu/hostname", "utf-8");
      // this.hostname = 'http://localhost:3000';
    }catch(error){
      console.log("failed to fetch hostname from file at /home/ubuntu/hostname. please make sure if respective cronjob is setup correctly");
      this.hostname = "failed to determine";
    }
    try{
      if (req.hasOwnProperty('originalUrl')){
        this.service_name = req.originalUrl;
      }else{
        this.service_name = req.url;
      }

      if (req.user){
        this.requester = req.user._id;
      }else{
        this.requester = null;
      }

      const env = process.env.env;
      if (env){
        this.env = env;
      }else{
        this.env = "undefined";
      }
      
      this.source = "NodeJS";
      this.requestId = crypto.randomBytes(8).toString("hex");

      const httpTransportOptions = {
        host: 'http-intake.logs.us5.datadoghq.com',
        path: `/api/v2/logs?dd-api-key=7db69aa1978b2d81823e3ea8884decdc&ddsource=${this.source}&service=${this.service_name}&hostname=${this.hostname}&requester=${this.requester}`,
        ssl: true
      };
    
      this.logger = createLogger({
        level: 'info',
        exitOnError: false,
        format: format.json(),
        transports: [
          new transports.Http(httpTransportOptions),
        ],
      });
      console.log("datadog logger init ->", this.service_name, this.requestId, this.hostname);
    }catch(error){
      console.log("error in constructing logger", error);
    }
  }

  error(message, error){
    if (!this.logger){
      console.log(new Date().toLocaleString(), message, error);
      return;
    }
    console.log(new Date().toLocaleString(), message, error);
    if (error.hasOwnProperty('message')){
      this.logger.error({
        requestId: this.requestId,
        message: message,
        error: error.message,
        env: this.env
      });
      return;
    }
    this.logger.error({
      requestId: this.requestId,
      message: message,
      error: error,
      env: this.env
    });
  }

  info(message, data){
    if (!this.logger){
      console.log(new Date().toLocaleString(), message, data);
      return;
    }

    console.log(message, data);
    console.log(new Date().toLocaleString(), message, data);

    this.logger.info({
      requestId: this.requestId,
      message: message,
      data: data,
      env: this.env
    });
  }

  warn(message, data){
    if (!this.logger){
      console.log(new Date().toLocaleString(), message, data);
      return;
    }
    console.log(new Date().toLocaleString(), message, data);
    this.logger.warn({
      requestId: this.requestId,
      message: message,
      data: data,
      env: this.env
    });
  }
  

  // static async getHostName(){
  //   const id = await axios.get("http://169.254.169.254/latest/meta-data/instance-id");
  //   console.log("hostname: ",id.data);
  //   return id.data;
  // }

}

export default DataDog;
// export default logger;