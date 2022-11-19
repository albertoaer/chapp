package controllers

import (
	"chapp-backend/services"
)

type UserController struct {
	UserService *services.UserService
}
