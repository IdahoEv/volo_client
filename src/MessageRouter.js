import { Dependencies } from 'constitute';

import WebsocketHandler from 'WebsocketHandler';
import DevUX from "DevUX";


@Dependencies(WebsocketHandler, DevUX)
export class MessageRouter {
  constructor(websocketHandler, devUX){
    this.websocketHandler = websocketHandler;
    this.devUX = devUX;
  };
}
