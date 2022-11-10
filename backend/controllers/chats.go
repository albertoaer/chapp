package controllers

import (
	"chapp-backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ChatsController struct {
	ChatService *services.ChatService
	UserService *services.UserService
}

func (ctr *ChatsController) Connect(ctx *gin.Context) {
	//id := ctx.Param("id")
	//websockets.ForRoom(ctx.Writer, ctx.Request, id)
}

func (ctr *ChatsController) List(ctx *gin.Context) {
	ctx.JSON(200, gin.H{"chats": ctr.ChatService.GetChats()})
}

type CreateChatBody struct {
	ChatName string `json:"name" binding:"required"`
	OwnerId  int    `json:"id" binding:"required"`
}

func (ctr *ChatsController) New(ctx *gin.Context) {
	var body CreateChatBody
	if err := ctx.BindJSON(&body); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
	user, err := ctr.UserService.GetUser(body.OwnerId)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
	if err = ctr.ChatService.CreateChat(body.ChatName, user); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
	}
}
