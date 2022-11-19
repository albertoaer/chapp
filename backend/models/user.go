package models

import "time"

type UserInfo struct {
	Name        string    `json:"name"`
	Picture     string    `json:"picture"`
	Id          int       `json:"id"`
	Description string    `json:"description"`
	LogIn       time.Time `json:"login"`
}
