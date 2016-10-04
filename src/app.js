console.log("App file loaded");
import styles from "./app.css"

import setup from "utils";
setup();

import DevUX from "DevUX";
import ConnectionManager from "ConnectionManager";
import WebsocketHandler from "WebsocketHandler";
import MessageRouter from "MessageRouter";

import constitute from "constitute";

const cm = constitute(ConnectionManager);
const devUX = constitute(DevUX);
cm.initialize();
devUX.initialize();
