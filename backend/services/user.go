package services

import (
	"chapp-backend/models"
	"errors"
	"sync"
	"time"
)

type UserService struct {
	activeUsers map[int]*models.UserInfo
	usersMx     sync.RWMutex
	usersCont   int
	maxSession  time.Duration
}

func NewUserService() *UserService {
	return &UserService{activeUsers: make(map[int]*models.UserInfo)}
}

func (srv *UserService) GetUser(id int) (*models.UserInfo, error) {
	srv.usersMx.Lock()
	defer srv.usersMx.Unlock()
	if user, exists := srv.activeUsers[id]; exists {
		if user.LogIn.Sub(time.Now()) > srv.maxSession {
			delete(srv.activeUsers, id)
			return nil, errors.New("User session expired")
		}
		return user, nil
	}
	return nil, errors.New("User does not exists")
}

func (srv *UserService) SignIn(name string) *models.UserInfo {
	srv.usersMx.Lock()
	defer srv.usersMx.Unlock()
	srv.usersCont++ //First id will be 1, not 0
	inf := &models.UserInfo{
		Name:        name,
		Id:          srv.usersCont,
		Picture:     "",
		Description: "",
		LogIn:       time.Now(),
	}
	srv.activeUsers[srv.usersCont] = inf
	return inf
}
