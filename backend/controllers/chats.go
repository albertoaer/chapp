package controllers

import (
	"chapp-backend/models"
	"chapp-backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ChatsController struct {
	chatService *services.ChatsService
	userService *services.UserService
}

func NewChatsController(chatService *services.ChatsService, userService *services.UserService) ChatsController {
	return ChatsController{chatService, userService}
}

func (ctr *ChatsController) Connect(ctx *gin.Context) {
	//id := ctx.Param("id")
	//websockets.ForRoom(ctx.Writer, ctx.Request, id)
}

type ListChatsResponse struct {
	Chats map[string]models.Chat `json:"chats"`
}

func (ctr *ChatsController) List(ctx *gin.Context) {
	ctx.JSON(200, ListChatsResponse{ctr.chatService.GetChats()})
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
	user, err := ctr.userService.GetUser(body.OwnerId)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
	if err = ctr.chatService.CreateChat(body.ChatName, user); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
	}
}
