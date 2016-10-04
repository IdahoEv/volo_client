// Deals with connecting the user to the game, via the websocket.
import { Dependencies } from 'constitute';

import WebsocketHandler from 'WebsocketHandler';
import DevUX from 'DevUX';
import MessageRouter from 'MessageRouter';

@Dependencies(WebsocketHandler, DevUX, MessageRouter)
export default class ConnectionManager {
  constructor(websocketHandler, devUX, messageRouter) {
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
    if (!this.websocketHandler.isReady()) {
      this.websocketHandler.connect();
    }
    // if we have a game ID and a player ID, attempt to connect to that.
    this.websockketHandler.transmit({
      privateID: this.privateID,
      gameID:   this.gameID
    })
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
