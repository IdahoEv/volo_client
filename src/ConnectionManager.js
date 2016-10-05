// Deals with connecting the user to the game, via the websocket.
import { Dependencies } from 'constitute';

import WebsocketHandler from 'WebsocketHandler';
import DevUX from 'DevUX';
import MessageRouter from 'MessageRouter';

@Dependencies(MessageRouter, DevUX, WebsocketHandler )
export default class ConnectionManager {

  constructor(messageRouter, devUX, websocketHandler) {
    this.websocketHandler = websocketHandler;
    this.devUX = devUX;
    this.messageRouter = messageRouter;
  }

  initialize() {
    this.gameConnected = false;
    this.gameID = localStorage.getItem("VoloGameID");
    this.privateID = localStorage.getItem("VoloPrivateID");
    console.log("Connection mgr connected callback:");
    console.log(this.connected);
    this.messageRouter.subscribe("connected", this.connected);
  }

  connectToGame(){
    console.log("Attempting to connect");
    if (this.gameConnected) {
      return;
    }
    this.websocketHandler.connect().then(() => {
        console.log("sending player connection request");
        var data = {
          connect: {
            private_id: this.privateID || null,
            game_id:   this.gameID || null
          }
        };
        console.log("Sending in CM: ", data);
        this.websocketHandler.transmit(data);
      }, () => {
        console.log("Error attempting to connect");
      });
  }

  // callback for when a connection was successful
  connected(message){
    this.privateID = message["private_id"];
    this.gameID = message["game_id"];
    localStorage.setItem("VoloPrivateID", this.privateID);
    localStorage.setItem("VoloGameID", this.gameID);
    this.gameConnected = true;
  }

  get isConnected() { return this.gameConnected }
}
