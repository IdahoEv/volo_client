# API Docs

This is the (in development) JSON websockets API specification between
volo_client and volo_server

## Connection

For now, the system assumes there is only one game.  The game_id: key
is reserved for later use.

volo_client attempts to connect as follows:

```
// SEND  client -> server
{ connect: {
    player_id: '12345',
    game_id: '12345'  
  }
}
```

If ids are specified, it will attempt to reconnect the player to the specified
tank in the specified game.  If neither are available, the game will attempt
to create a new tank for the player, or a new game, or both.  A successful
connection will result in this response:

```
// SEND  server -> client
{ connected: {
    player_id: '12345',
    game_id: '12345'  
  }
}
```
