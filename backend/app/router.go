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
