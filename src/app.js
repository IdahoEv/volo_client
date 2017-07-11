import 'app.css';
import constitute from "constitute";
import { Container } from 'constitute';
import $ from 'jquery';
window.$ = $;
// import setup from "utils";
// setup();

// NOTE: order of imports is sensitive here due to interaction with
// DI framework.
const container = new Container();

import ConnectionManager from "ConnectionManager";
import DevUX from "DevUX";
import KeyHandler from "KeyHandler";

let connectionManager = container.constitute(ConnectionManager);
let devUX = container.constitute(DevUX)
let keyHandler = container.constitute(KeyHandler)
connectionManager.initialize();
devUX.initialize();
keyHandler.initialize();
