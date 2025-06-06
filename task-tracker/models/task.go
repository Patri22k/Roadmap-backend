package models

import "time"

// Task structure initialization
type Task struct {
	ID          int       `json:"id"`
	Description string    `json:"description"`
	Status      string    `json:"status"`
	CreateAt    time.Time `json:"time"`
	UpdateAt    time.Time `json:"updateAt"`
}
