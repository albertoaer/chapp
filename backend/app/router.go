package app

import (
	"chapp-backend/controllers"

	"github.com/gin-gonic/gin"
)

func Router(
	chats controllers.ChatsController,
	users controllers.UsersController,
) *gin.Engine {
	gin.DisableConsoleColor()
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(func(ctx *gin.Context) {
		ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		ctx.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		ctx.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		ctx.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		ctx.Next()
	})

	router.GET("/status", controllers.Status)

	chatg := router.Group("/chats")
	{
		chatg.GET("/:id/connect", chats.Connect)
		chatg.POST("/new", chats.New)
		chatg.GET("/all", chats.List)
	}
	userg := router.Group("/users")
	{
		userg.POST("/login/:name", users.LogIn)
	}

	return router
}
