package controllers

import (
	"chapp-backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

const UserNameKey string = "user.name"
const UserIdKey string = "user.id"
const UserTimeKey string = "user.time"

type AuthController struct {
	JWT         *services.JWTService
	UserService *services.UserService
}

func (ctr *AuthController) RequireLogin(ctx *gin.Context) {
	data, err := ctr.JWT.Parse(ctx.GetHeader("Authorization"))
	if err != nil {
		ctx.AbortWithError(http.StatusUnauthorized, err)
	} else {
		ctx.Set(UserNameKey, data["name"])
		ctx.Set(UserIdKey, data["id"])
		ctx.Set(UserTimeKey, data["time"])
		ctx.Next()
	}
}

type SignInBody struct {
	UserName string `json:"name" binding:"required"`
}

func (ctr *AuthController) SignIn(ctx *gin.Context) {
	var data SignInBody
	ctx.BindJSON(&data)
	info := ctr.UserService.SignIn(data.UserName)
	token, err := ctr.JWT.Create(gin.H{
		UserNameKey: info.Name,
		UserIdKey:   info.Id,
		UserTimeKey: info.LogIn,
	})
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
	} else {
		ctx.JSON(http.StatusCreated, gin.H{
			"token": token,
			"name":  info.Name,
			"id":    info.Id,
		})
	}
}
