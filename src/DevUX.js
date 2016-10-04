// Responsible for all the debugging and meta information, including both
// display and controls.
import { Dependencies } from 'constitute';
import ConnectionManager from "ConnectionManager";

@Dependencies(ConnectionManager)
export default class DevUX {
  constructor(connectionManager){
    this.connectionManager = connectionManager;
  }
  initialize() {
    $('#connect_button').addEventListener('click', function() {
      this.connectionManager.connectToGame();
    });
  }

  static socketConnected()   {  $('#socket_connection').HTML('ON');  }
  static socketDisconnected(){  $('#socket_connection').HTML('OFF');  }
  static gameConnected()     {  $('#socket_connection').HTML('ON');  }
  static gameDisconnected()  {  $('#socket_connection').HTML('OFF');  }
}
