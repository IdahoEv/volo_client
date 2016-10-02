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

  setup() {
    this.gameConnected = false;
    this.gameID = localStorage.getItem("VoloGameID");
    this.playerID = localStorage.getItem("VoloPlayerID");
    console.log("Connection mgr connected callback:");
    console.log(this.connected);
    this.messageRouter.subscribe("connected", this.connected);
  }

  connectToGame(){
    if (this.gameConnected) {
      return;
    }
    if (!this.websocketHandler.isReady()) {
      this.websocketHandler.connect();
    }
    // if we have a game ID and a player ID, attempt to connect to that.
    this.websockketHandler.transmit({
      playerID: this.playerID,
      gameID:   this.gameID
    })
  }

  // callback for when a connection was successful
  connected(message){
    this.playerID = message["player_id"];
    this.gameID = message["game_id"];
    localStorage.setItem("VoloPlayerID", this.playerID);
    localStorage.setItem("VoloGameID", this.gameID);
    this.gameConnected = true;
  }

  get isConnected() { return this.gameConnected }
}
