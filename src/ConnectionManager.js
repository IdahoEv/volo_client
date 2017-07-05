// Deals with connecting the user to the game, via the websocket.
import { Dependencies } from 'constitute';

import WebsocketHandler from 'WebsocketHandler';
import MessageRouter from 'MessageRouter';

@Dependencies(MessageRouter, WebsocketHandler )
export default class ConnectionManager {

  constructor(messageRouter, websocketHandler) {
    console.log("constructing ConnectionManager");
    this.websocketHandler = websocketHandler;
    this.messageRouter = messageRouter;
  }

  initialize() {
    this.gameConnected = false;
    this.gameID =     this.clean(localStorage.getItem("VoloGameID"));
    this.privateID =  this.clean(localStorage.getItem("VoloPrivateID"));
    this.playerName = this.clean(localStorage.getItem("VoloPlayerName"));
    this.messageRouter.subscribe("connected", this.connected.bind(this));
    this.messageRouter.subscribe("connectionRequested", this.connectToGame.bind(this));

    this.messageRouter.handle({ prevStateLoaded: { 
      gameID: this.gameID,
      privateID: this.privateID,
      playerName: this.playerName
    }});
  }
  
  clean(value) {
    if (value === "undefined") {
      return null
    }
  }

  connectToGame(){    
    var playerName = $('#player_name').val();  
    console.log("Attempting to connect, player name is ", playerName);
    if (this.gameConnected) {
      return;
    }
    this.websocketHandler.connect().then(() => {
        console.log("sending player connection request");
        var data = {
          connect: {
            private_id:   this.privateID || null,
            game_id:      this.gameID || null,
            player_name:  playerName
          }
        };
        console.log("Sending in CM: ", data);
        this.websocketHandler.transmit(data);
      }, () => {
        console.log("Error attempting to connect");
        this.messageRouter.handle({ webSocketDisconnected: true })
      });
  }

  // callback for when a connection was successful
  connected(message){
    this.privateID = message["connected"]["private_id"];
    this.gameID = message["connected"]["game_id"];
    this.playerName = message["connected"]["player_name"];
    localStorage.setItem("VoloPrivateID",  this.privateID);
    localStorage.setItem("VoloGameID",     this.gameID);
    localStorage.setItem("VoloPlayerName", this.playerName);
    this.gameConnected = true;
  }

  get isConnected() { return this.gameConnected }
}
