package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(*http.Request) bool { return true },
}

func chat(w http.ResponseWriter, r *http.Request) {
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/chat", chat)
	fmt.Println("Running")
	http.ListenAndServe(":3000", mux)
}
