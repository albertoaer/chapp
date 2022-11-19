package models

type Chat struct {
	Name    string    `json:"name"`
	Picture string    `json:"picture"`
	Owner   *UserInfo `json:"owner"`
}
