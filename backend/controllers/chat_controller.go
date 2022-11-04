package controllers

import (
	"chapp-backend/websockets"

	"github.com/gin-gonic/gin"
)

func ConnectChat() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		websockets.Create(ctx.Writer, ctx.Request)
	}
}
