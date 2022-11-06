package server

import (
	"chapp-backend/controllers"
	"chapp-backend/services"

	"github.com/gin-gonic/gin"
)

func Router() *gin.Engine {
	gin.DisableConsoleColor()
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	router.GET("/status", controllers.Status)
	users := services.NewUserService()

	chatg := router.Group("/chats")
	{
		chats := controllers.NewChatsController(services.NewChatService(), users)
		chatg.GET("/:id/connect", chats.Connect)
		chatg.POST("/new", chats.New)
		chatg.GET("/all", chats.List)
	}
	userg := router.Group("/users")
	{
		users := controllers.NewUsersController(users)
		userg.POST("/login/:name", users.LogIn)
	}

	return router
}
