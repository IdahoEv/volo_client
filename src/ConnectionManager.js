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

    this.messageRouter.subscribe("connected", this.connected.bind(this));
    this.messageRouter.subscribe("connectionRequested", this.connectToGame.bind(this));
    this.messageRouter.subscribe("disconnectionRequested", this.disconnectFromGame.bind(this));
    this.messageRouter.subscribe("clearGameInfoRequested", this.clearGameInfo.bind(this));
  }

  initialize() {
    this.gameConnected = false;
    this.gameID =     this.clean(localStorage.getItem("VoloGameID"));
    this.privateID =  this.clean(localStorage.getItem("VoloPrivateID"));
    this.playerName = this.clean(localStorage.getItem("VoloPlayerName"));
    this.notifyInfoUpdated();
  }
  notifyInfoUpdated(){
    this.messageRouter.handle({ connectionInfoUpdated: { 
      gameID: this.gameID,
      privateID: this.privateID,
      playerName: this.playerName
    }});
  }
  
  clean(value) {
    if (value === "undefined" || value === "") {
      return null;
    }
    return value;
  }

  connectToGame(){    
    var playerName = this.clean($('#player_name').val());  
    if (this.gameConnected) {
      return;
    }
    this.websocketHandler.connect().then(() => {
        // console.log("sending player connection request");
        var data = {
          connect: {
            private_id:   this.privateID || null,
            game_id:      this.gameID || null,
            player_name:  playerName
          }
        };
        // console.log("Sending in CM: ", data);
        this.websocketHandler.transmit(data);
      }, () => {
        // console.log("Error attempting to connect");
        this.messageRouter.handle({ webSocketDisconnected: true })
      });
  }
  
  disconnectFromGame(){
    this.websocketHandler.disconnect();
    this.gameConnected = false;
    this.messageRouter.handle({ gameDisconnected: true, webSocketDisonnected: true });
  }
  
  clearGameInfo(msg){
    this.disconnectFromGame();
    this.gameID = null;
    this.privateID = null;
    this.playerName = null;
    this.updateLocalStorage();
    this.notifyInfoUpdated();
  }

  // callback for when a connection was successful
  connected(message){
    this.privateID =  this.clean(message.connected.private_id);
    this.gameID =     this.clean(message.connected.game_id);
    this.playerName = this.clean(message.connected.player_name);
    this.updateLocalStorage();
    this.notifyInfoUpdated();
    this.gameConnected = true;
    this.messageRouter.handle({ gameConnected: true });
  }
  
  updateLocalStorage(){  
    this.storeItem("VoloPrivateID",  this.privateID);
    this.storeItem("VoloGameID",     this.gameID);
    this.storeItem("VoloPlayerName", this.playerName);    
  }
  storeItem(key, value){
    if (this.clean(value) === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  }

  get isConnected() { return this.gameConnected }
}
