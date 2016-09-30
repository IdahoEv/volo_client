import { Dependencies } from 'constitute';

import WebsocketHandler from 'WebsocketHandler';
import DevUX from "DevUX";


@Dependencies(WebsocketHandler, DevUX)
export class WebsocketRouter {
  constructor(websocketHandler, devUX){
    this.websocketHandler = websocketHandler;
    this.devUX = devUX;
  };
}
