
// Deals with opening and maintaining the websocket connection to the
// game server.
import { Dependencies } from 'constitute';
import MessageRouter from "MessageRouter";
import DevUX from 'DevUX';

@Dependencies(MessageRouter, DevUX)
export default class WebsocketHandler {
  constructor(router, devUX) {
    this.websocket = null;
    this.host = `ws://${window.location.host}/websocket`;
    this.router = router;
  }

  connect() {
    if (websocket == undefined || !(websocket.readyState == websocket.OPEN)) {
      websocket = new WebSocket(this.host);
      websocket.onopen = (evt) => { router.socketOpened(evt) };
      websocket.onclose = (evt) => { router.socketClosed(evt) };
      websocket.onmessage = (evt) => { receiveMessage(evt); };
      websocket.onerror = (evt) => { router.errorReceived(evt) };
    }
    return websocket.readyState == websocket.OPEN;
  };

  disconnect() {
    websocket.close();
  };

  transmit(object) {
    if(isReady()) {
      websocket.send(JSON.stringify(object));
    } else {
      router.socketClosed(null);
    }
  }

  receiveMessage(evt) {
    message = JSON.parse(evt.data);
    this.router.messageReceived(message);
  }

  isReady(){
    this.websocket.readyState == websocket.OPEN;
  }
}
