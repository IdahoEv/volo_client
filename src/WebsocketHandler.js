
// Deals with opening and maintaining the websocket connection to the
// game server.
import { Dependencies } from 'constitute';
import MessageRouter from "MessageRouter";

@Dependencies(MessageRouter)
export default class WebsocketHandler {
  constructor(messageRouter) {
    console.log("constructing WebsocketHandler");
    this.websocket = null;
    this.host = `ws://${this.hostname()}/websocket`;
    this.messageRouter = messageRouter;
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
          console.log(`onopen callback, readystate is ${self.websocket.readyState}`);
          self.socketOpened(evt);
          resolve(evt);
        };
      });
    };
  };

  disconnect() {
    if (this.websocket) {
      this.websocket.close();      
    }
    this.websocket = null;
    this.messageRouter.handle({ webSocketDisconnected: true })
  };

  transmit(toSend) {
    // console.log("Transmit function 1, sending ", toSend );
    if(this.isReady()) {
      // console.log("Transmit function 2, sending ", toSend );
      var data = JSON.stringify(toSend);
      console.log("sending", data);
      this.websocket.send(data);
      this.messageRouter.handle({ webSocketMessageSent: data });
    } else {
      console.log(`unable to send, readystate is ${this.websocket.readyState}`);
    }
  }

  receiveMessage(evt) {
    console.log(`received message with event:`);
    console.log(evt);
    console.log(evt.data);
    let message = JSON.parse(evt.data);
    this.messageRouter.handle({ webSocketMessageReceived: message });
    this.messageRouter.handle(message);
  }

  isReady(){
    return this.websocket && this.websocket.readyState == WebSocket.OPEN;
  }
  socketOpened(event){
    this.messageRouter.handle({ webSocketConnected: true });
  }
  socketClosed(event){
    this.messageRouter.handle({ webSocketDisconnected: true });
  }
}
