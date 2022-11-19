//go:build wireinject
// +build wireinject

package app

import (
	"chapp-backend/controllers"
	"chapp-backend/services"
	"os"

	"github.com/google/wire"
	"github.com/joho/godotenv"
)

func init() {
	godotenv.Load()
}

func getSecretKey() services.SecretKey {
	return services.SecretKey(os.Getenv("SECRET"))
}

var providers = wire.NewSet(
	getSecretKey,
	services.NewChatService,
	services.NewUserService,
	services.NewJWTService,
	wire.Struct(new(controllers.ChatController), "*"),
	wire.Struct(new(controllers.UserController), "*"),
	wire.Struct(new(controllers.AuthController), "*"),
	Router,
	wire.Struct(new(App), "*"),
)

func InitializeApp() *App {
	wire.Build(providers)
	return &App{}
}
