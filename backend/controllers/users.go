package controllers

import (
	"chapp-backend/services"

	"github.com/gin-gonic/gin"
)

type UsersController struct {
	userService *services.UserService
}

func NewUsersController(userService *services.UserService) UsersController {
	return UsersController{userService}
}

func (ctr *UsersController) LogIn(ctx *gin.Context) {
	ctr.userService.LogIn(ctx.Param("name"))
}
