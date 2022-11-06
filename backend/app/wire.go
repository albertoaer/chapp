//go:build wireinject
// +build wireinject

package app

import (
	"chapp-backend/controllers"
	"chapp-backend/services"

	"github.com/google/wire"
)

var providers = wire.NewSet(
	services.NewChatService,
	services.NewUserService,
	wire.Struct(new(controllers.ChatsController), "*"),
	wire.Struct(new(controllers.UsersController), "*"),
	Router,
	wire.Struct(new(App), "*"),
)

func InitializeApp() *App {
	wire.Build(providers)
	return &App{}
}
