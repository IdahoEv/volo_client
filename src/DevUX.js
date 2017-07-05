// Responsible for all the debugging and meta information, including both
// display and controls.
import { Dependencies } from 'constitute';
import MessageRouter from "MessageRouter";

@Dependencies(MessageRouter)
export default class DevUX {
  // static constitute() { return [ Container ] }
  constructor(messageRouter){
    console.log("constructing DevUX");

    this.messageRouter = messageRouter;
    this.messageRouter.subscribe("webSocketConnected", this.socketConnected.bind(this));
    this.messageRouter.subscribe("webSocketDisconnected", this.socketDisconnected.bind(this));

    this.messageRouter.subscribe("connected", this.gameConnected.bind(this));
    this.messageRouter.subscribe("connection_failed", this.gameDisconnected.bind(this));
    
    this.messageRouter.subscribe("gameDisconnected", this.gameDisconnected.bind(this));
    this.messageRouter.subscribe("webSocketMessageReceived", this.messageReceived.bind(this));
    this.messageRouter.subscribe("webSocketMessageSent", this.messageSent.bind(this));
    this.messageRouter.subscribe("connectionInfoUpdated", this.infoUpdated.bind(this));
  }

  initialize() {
    console.log("initializing interface");
    var scope = this;
    $('#connect_button').click(function() {
      scope.messageRouter.handle({"connectionRequested": true});
    });
    $('#disconnect_button').click(function() {
      scope.messageRouter.handle({"disconnectionRequested": true});
    });
    $('#clear_button').click(function() {
      scope.messageRouter.handle({"clearGameInfoRequested": true});
    });
    
    this.socketDisconnected();
    this.gameDisconnected();
  }

  
  socketConnected()   {  $('#socket_connection').html('ON').addClass('on'); }
  socketDisconnected(){  $('#socket_connection').html('OFF').removeClass('on');  }
  gameConnected(message)     {  
    $('#connect_button').prop('disabled', true);
    $('#disconnect_button').prop('disabled', false);
    $('#clear_button').prop('disabled', true);
    
    $('#game_connection').html('ON').addClass('on'); 
    // $('#game_id').html(message.connected.game_id);
    // $('#private_id').html(message.connected.private_id);
    // $('#player_name').val(message.connectionInfoUpdated.playerName);
  }
  infoUpdated(message)     {  
    $('#game_id').html(message.connectionInfoUpdated.gameID);
    $('#private_id').html(message.connectionInfoUpdated.privateID);
    $('#player_name').val(message.connectionInfoUpdated.playerName);
  }
  gameDisconnected()  {  
    console.log('disconnected callback');
    $('#connect_button').prop('disabled', false);
    $('#disconnect_button').prop('disabled', true);
    $('#clear_button').prop('disabled', false);
    
    $('#game_connection').html('OFF').removeClass('on');  
  }
  
  messageReceived(msg)   { 
    let data = JSON.stringify(msg);
    console.log('Message Received', msg);
    this.displayMessage('#received_messages', msg.webSocketMessageReceived); 
  }
  messageSent(msg)   { 
    this.displayMessage('#sent_messages', msg.webSocketMessageSent); 
  }
  
  formatMessage(message) {
    if (typeof message === 'object') {
      message = JSON.stringify(message);
    }
    return "<p class='message'>" + message + "</p>";
  }
  displayMessage(destination, msg, limit) {
    if (typeof limit === 'undefined' ){
      limit = 60;
    }
    $(destination + " .message_container").prepend(this.formatMessage(msg));
    $(destination + " .message_container .message").slice(limit).remove();
  }

}
