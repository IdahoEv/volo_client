// Responsible for all the debugging and meta information, including both
// display and controls.
export default class DevUX {

  static socketConnected()   {  $('#socket_connection').HTML('ON');  }
  static socketDisconnected(){  $('#socket_connection').HTML('OFF');  }
  static gameConnected()     {  $('#socket_connection').HTML('ON');  }
  static gameDisconnected()  {  $('#socket_connection').HTML('OFF');  }
}
