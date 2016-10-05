// Responsible for all the debugging and meta information, including both
// display and controls.
import { Container } from 'constitute';
import ConnectionManager from "ConnectionManager";

export default class DevUX {
  static constitute() { return [ Container ] }
  constructor(container){
    container.schedulePostConstructor(function(connectionManager){
      this.connectionManager = connectionManager;
    }, [ ConnectionManager ]);
  }
  initialize() {
    console.log("initializing interface");
    var scope = this;
    $('#connect_button').addEventListener('click', function() {
      console.log("Connect button clicked");
      scope.connectionManager.connectToGame();
    });
  }

  socketConnected()   {   $('#socket_connection').innerHTML = 'ON';  }
  socketDisconnected(){  $('#socket_connection').innerHTML = 'OFF';  }
  gameConnected()     {  $('#socket_connection').innerHTML = 'ON';  }
  gameDisconnected()  {  $('#socket_connection').innerHTML = 'OFF';  }
}
