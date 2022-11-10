package controllers

import (
	"chapp-backend/services"
)

type UsersController struct {
	UserService *services.UserService
}
