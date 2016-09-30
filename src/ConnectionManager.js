// Deals with connecting the user to the game, via the websocket.

import WebsocketHandler from 'WebsocketHandler';
import DevUX from 'DevUX';
import { Dependencies } from 'constitute';


@Dependencies(WebsocketHandler, DevUX)
export class ConnectionManager {
  constructor(websocketHandler, devUX) {
    this.websocketHandler = websocketHandler;
    this.devUX = devUX;
    this.gameConnected = false;
    this.gameID = localStorage.getItem("VoloGameID");
    this.playerID = localStorage.getItem("VoloPlayerID");
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
  connected(playerID, gameID){
    this.playerID = playerID;
    this.gameID = gameID;
    localStorage.setItem("VoloPlayerID", this.playerID);
    localStorage.setItem("VoloGameID", this.gameID);
    this.gameConnected = true;
  }

  get isConnected() { return this.gameConnected }
}
