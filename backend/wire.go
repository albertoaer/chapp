// +build wireinject

package main

import (
	"chapp-backend/controllers"

	"github.com/gin-gonic/gin"
	"github.com/google/wire"
)

func ProvideConnectChat() gin.HandlerFunc {
	wire.Build(controllers.ConnectChat)
	return nil
}
