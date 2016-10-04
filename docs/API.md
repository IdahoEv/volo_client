# API Docs

This is the (in development) JSON websockets API specification between
volo_client and volo_server

## Connection

For now, the system assumes there is only one game.  The game_id: key
is reserved for later use.

volo_client attempts to connect as follows:

```
// client -> server
{ connect: {
    private_id:  ('12345' or null),
    game_id: ('12345' or null)  
  }
}
```

If ids are specified (non-null), it will attempt to reconnect the player to the
specified tank in the specified game.  If neither are available, the game will
attempt to create a new tank for the player, or a new game, or both.  A
successful connection will result in this response:

```
// server -> client
{ connected: {
    private_id: '12345',
    game_id: '12345'  
  }
}
```

A failed connection will result in this response:

```
// server -> client
{ connection_failed: "String explaining the reason" }
```
