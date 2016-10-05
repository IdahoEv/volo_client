
// Deals with opening and maintaining the websocket connection to the
// game server.
import { Dependencies } from 'constitute';
import MessageRouter from "MessageRouter";
import DevUX from "DevUX";

@Dependencies(MessageRouter, DevUX)
export default class WebsocketHandler {
  constructor(messageRouter, DevUX) {
    this.websocket = null;
    this.host = `ws://${this.hostname()}/websocket`;
    this.router = messageRouter;
    this.devUX = DevUX;
  }

  hostname() {
    return window.location.host || "localhost:8080";
  }


  connect(callback) {
    self = this;
    if (self.isReady()) {
      return new Promise((resolve, reject) => { resolve() });
    } else {
      return new Promise((resolve, reject) => {
        self.websocket = new WebSocket(self.host);
        self.websocket.onclose   = (evt) => { self.socketClosed(evt) };
        self.websocket.onmessage = (evt) => { self.receiveMessage(evt); };
        self.websocket.onerror   = (evt) => {
          self.errorReceived(evt);
          reject(evt);
        };
        self.websocket.onopen =  (evt) => {
          console.log(`onopen callbacke, readystate is ${self.websocket.readyState}`);
          self.socketOpened(evt);
          resolve(evt);
        };
      });
    };
  };

  disconnect() {
    websocket.close();
  };

  transmit(toSend) {
    console.log("Transmit function 1, sending ", toSend );
    if(this.isReady()) {
      console.log("Transmit function 2, sending ", toSend );
      var data = JSON.stringify(toSend);
      console.log("sending", data);
      this.websocket.send(data);
    } else {
      console.log(`unable to send, readystate is ${this.websocket.readyState}`);
    }
  }

  receiveMessage(evt) {
    message = JSON.parse(evt.data);
    this.router.messageReceived(message);
  }

  isReady(){
    return this.websocket && this.websocket.readyState == WebSocket.OPEN;
  }
  socketOpened(event){
    this.devUX.socketConnected();
  }
  socketClosed(event){
    this.devUX.socketDisconnected();
  }
}
