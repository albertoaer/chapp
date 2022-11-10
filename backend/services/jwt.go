package services

import (
	"errors"

	"github.com/golang-jwt/jwt"
)

type SecretKey []byte

type JWTService struct {
	secret SecretKey
	method jwt.SigningMethod
}

func NewJWTService(secret SecretKey) *JWTService {
	return &JWTService{secret: secret, method: jwt.SigningMethodHS256}
}

func (srv *JWTService) Create(content map[string]interface{}) (string, error) {
	token := jwt.NewWithClaims(srv.method, jwt.MapClaims(content))
	return token.SignedString([]byte(srv.secret))
}

func (srv *JWTService) Parse(token string) (map[string]interface{}, error) {
	parsed, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if t.Method.Alg() != srv.method.Alg() {
			return nil, errors.New("Unauthorized")
		}
		return []byte(srv.secret), nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := parsed.Claims.(jwt.MapClaims); ok && parsed.Valid {
		return claims, nil
	}
	return nil, errors.New("Invalid token")
}
