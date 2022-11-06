package app

import (
	"github.com/gin-gonic/gin"
)

type App struct {
	Router *gin.Engine
}

func (app *App) Launch(addr string) {
	app.Router.Run(addr)
}
