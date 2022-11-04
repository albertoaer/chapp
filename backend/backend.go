package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/status", func(ctx *gin.Context) {
		ctx.String(200, "Running")
	})

	router.GET("/chat/:id", ProvideConnectChat())

	router.Run(":3000")
}
