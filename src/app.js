import 'app.css';
import constitute from "constitute";
import setup from "utils";
setup();

// NOTE: order of imports is sensitive here due to interaction with
// DI framework.
import ConnectionManager from "ConnectionManager";
import DevUX from "DevUX";

var connectionManager = constitute(ConnectionManager);
connectionManager.initialize();

var devUX = constitute(DevUX)
devUX.initialize();
