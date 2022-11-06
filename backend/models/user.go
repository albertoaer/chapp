package models

import "time"

type UserInfo struct {
	Name        string
	Picture     string
	Id          int
	Description string
	LogIn       time.Time
}
