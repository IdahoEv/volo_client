import { Dependencies } from 'constitute';
import { _ } from "underscore";
// import WebsocketHandler from 'WebsocketHandler';
// import DevUX from "DevUX";


// Handles routing messages from the websocket to modules that care
// about them.

@Dependencies()
export default class MessageRouter {
  constructor(websocketHandler, devUX){
    this.subscriptions = new Map();
  };

  subscribe(key, callback) {
    this.subscriptions.set(key, callback);
    console.log(this.subscriptions);
  }
  unsubscribe(messageKey, callback) {
    delete this.subscriptions.get(messageKey);
  }

  // Pass this message to everyone subscribing to one of its keys.
  handle(message) {
    this.subscriptions.forEach((callback, key) => {
      if (message[key]) {
        callback.call(null, message);
      }
    });
  }

}
