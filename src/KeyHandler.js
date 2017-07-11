import { Dependencies } from 'constitute';
import MessageRouter from "MessageRouter";
import { now } from "utils/VoloTime";

@Dependencies(MessageRouter)
export default class KeyHandler {
  constructor(messageRouter) {
    this.messageRouter = messageRouter;
    this.controlState = { 'acceleration': 0, 'rotation': 0, 'trigger': 0 };
    this.keyState     = { };
    this.keyMap     = this.generateKeyMap();
  }
 
  initialize() {
    $(document).on("keydown", this.keydown.bind(this));
    $(document).on("keyup", this.keyup.bind(this));    
  }
  
  keydown(event) {
    this.keyState[event.key] = true;
    this.updateControlState();
  }
  keyup(event) {
    delete this.keyState[event.key];
    this.updateControlState();
  }
  
  updateControlState() {
    this.controlState = { 'acceleration': 0, 'rotation': 0, 'trigger': 0 };
    for (var key in this.keyState) {
      if (this.keyState.hasOwnProperty(key)) {
        // console.log(key + " -> " + p[key]);
        let command = this.keyMap[key][0];
        let val     = this.keyMap[key][1];
        this.controlState[command] += val; 
      }
    }
    console.log("Control state: ", this.controlState);
  }
  
  generateKeyMap() {
    return {
      // acceleration 1 is forward.  Rotation 1 is clockwise.
      w: [ 'acceleration', 1 ], 
      a: [ 'rotation', -1 ],
      s: [ 'acceleration', -1 ],       
      d: [ 'rotation', 1 ],             
      
      ".": [ 'acceleration', 1 ],
      o: [ 'rotation', -1 ],
      e: [ 'acceleration', -1 ],       
      u: [ 'rotation', 1 ],             
      
      'ArrowUp': [ 'acceleration', 1 ],
      'ArrowLeft': [ 'rotation', -1 ],
      'ArrowDown': [ 'acceleration', -1 ],       
      'ArrowRight': [ 'rotation', 1 ],             
      
      " ": [ 'trigger', 1 ]
    }
  }
}