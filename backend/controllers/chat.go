package controllers

import (
	"chapp-backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ChatController struct {
	ChatService *services.ChatService
	UserService *services.UserService
}

func (ctr *ChatController) Connect(ctx *gin.Context) {
	//id := ctx.Param("id")
	//websockets.ForRoom(ctx.Writer, ctx.Request, id)
}

func (ctr *ChatController) List(ctx *gin.Context) {
	// TODO: Filter chat properties
	ctx.JSON(200, gin.H{"chats": ctr.ChatService.ListChats()})
}

func (ctr *ChatController) New(ctx *gin.Context) {
	var body struct {
		ChatName string `json:"name" binding:"required"`
		OwnerId  int    `json:"id" binding:"required"`
	}
	if err := ctx.BindJSON(&body); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
	user, err := ctr.UserService.GetUser(body.OwnerId)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
	} else if err = ctr.ChatService.CreateChat(body.ChatName, user); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
	}
}
