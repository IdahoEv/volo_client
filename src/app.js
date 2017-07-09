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

var connectionManager = container.constitute(ConnectionManager);
var devUX = container.constitute(DevUX)
connectionManager.initialize();
devUX.initialize();
