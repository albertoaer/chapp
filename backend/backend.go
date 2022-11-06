package main

import (
	"chapp-backend/server"
)

func main() {
	router := server.Router()

	router.Run(":3000")
}
