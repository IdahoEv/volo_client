import { Dependencies } from 'constitute';


// Handles routing messages from the websocket to modules that care
// about them.

export default class MessageRouter {
  constructor(){
    this.subscriptions = new Map();
  };

  subscribe(key, callback) {
    var existingSubscriptions = this.subscriptions.get(key);
    if (existingSubscriptions) {
        existingSubscriptions.push(callback);
        // this.subscriptions.set(key,  )
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
    var matchingSubscribers = [];
    this.subscriptions.forEach((subscribers, key) => {
      if (message[key]) {
        // Append all members of subscribers to the accumulated list
        Array.prototype.push.apply(matchingSubscribers, subscribers);
      }
    });
    // Dedupe the matches and call them
    Array.from(new Set(matchingSubscribers)).forEach(
      (callback) => callback.call(null, message)
    );
  }

}
