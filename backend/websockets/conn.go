package websockets

import "github.com/gorilla/websocket"

type Conn struct {
	wrapped *websocket.Conn
}
