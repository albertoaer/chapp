package controllers

import "github.com/gin-gonic/gin"

func Status(ctx *gin.Context) {
	ctx.String(200, "Alive")
}
