package app

import (
	"chapp-backend/controllers"

	"github.com/gin-gonic/gin"
)

func Router(
	chats controllers.ChatsController,
	users controllers.UsersController,
	auth controllers.AuthController,
) *gin.Engine {

	gin.DisableConsoleColor()
	router := gin.New()

	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	// CORS Middleware
	router.Use(func(ctx *gin.Context) {
		ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		ctx.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		ctx.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		ctx.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		ctx.Next()
	})

	// Errors Middleware
	router.Use(func(ctx *gin.Context) {
		ctx.Next()
		if len(ctx.Errors) > 0 {
			ans := make([]string, len(ctx.Errors))
			for i, err := range ctx.Errors {
				ans[i] = err.Err.Error()
			}
			ctx.JSON(-1, gin.H{"errors": ans})
		}
	})

	// Unrestricted zone
	router.GET("/status", controllers.Status)
	userg := router.Group("/users")
	{
		userg.POST("/signin/:name", auth.SignIn)
	}

	// Restricted Zone
	router.Use(auth.RequireLogin)

	chatg := router.Group("/chats")
	{
		chatg.GET("/:id/connect", chats.Connect)
		chatg.POST("/new", chats.New)
		chatg.GET("/all", chats.List)
	}

	return router
}
