package controllers

import (
	"chapp-backend/services"

	"github.com/gin-gonic/gin"
)

type UsersController struct {
	UserService *services.UserService
}

func (ctr *UsersController) LogIn(ctx *gin.Context) {
	ctr.UserService.LogIn(ctx.Param("name"))
}
