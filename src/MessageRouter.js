import { Dependencies } from 'constitute';
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
    var existingSubscriptions = this.subscriptions.get(key);
    if (existingSubscriptions) {
        existingSubscriptions.push(callback);
    } else {
      this.subscriptions.set(key, [callback]);
    }
  }

  unsubscribe(messageKey, callback) {
    var existingSubscriptions = this.subscriptions.get(messageKey);
    var index = existingSubscriptions.indexOf(callback);
    if (index > -1) {
      existingSubscriptions.splice(index, 1);
    }
  }

  // Pass this message to everyone subscribing to one of its keys.
  handle(message) {
    this.subscriptions.forEach((subscribers, key) => {
      if (message[key]) {
        subscribers.forEach( (callback) => {
          callback.call(null, message);
        });
      }
    });
  }

}
