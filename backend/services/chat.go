package services

import (
	"chapp-backend/models"
	"chapp-backend/websockets"
	"errors"
	"sync"
)

type ChatMonitor struct {
	connections []*websockets.Conn
	model       models.Chat
}

type ChatService struct {
	chats    map[string]*ChatMonitor
	chatsMx  sync.RWMutex
	owners   map[int]string
	ownersMx sync.RWMutex
}

func NewChatService() *ChatService {
	return &ChatService{
		chats:  make(map[string]*ChatMonitor),
		owners: make(map[int]string),
	}
}

func (srv *ChatService) GetChats() map[string]models.Chat {
	srv.chatsMx.RLock()
	defer srv.chatsMx.RUnlock()
	chats := make(map[string]models.Chat)
	for name, chat := range srv.chats {
		chats[name] = chat.model
	}
	return chats
}

func (srv *ChatService) ListChats() []models.Chat {
	srv.chatsMx.RLock()
	defer srv.chatsMx.RUnlock()
	chats := make([]models.Chat, 0)
	for _, chat := range srv.chats {
		chats = append(chats, chat.model)
	}
	return chats
}

func (srv *ChatService) CreateChat(name string, owner *models.UserInfo) error {
	srv.chatsMx.Lock()
	defer srv.chatsMx.Unlock()
	srv.ownersMx.Lock()
	defer srv.ownersMx.Unlock()
	if _, isOwner := srv.owners[owner.Id]; isOwner {
		return errors.New("The user is already own a chat")
	}
	if _, chatExists := srv.chats[name]; chatExists {
		return errors.New("Name taken by another chat")
	}
	srv.chats[name] = &ChatMonitor{
		connections: make([]*websockets.Conn, 0),
		model: models.Chat{
			Name:  name,
			Owner: owner,
		},
	}
	srv.owners[owner.Id] = name
	return nil
}
