package main

import (
	"log"
	"time"

	"./model"
	"github.com/gorilla/websocket"
)

type GameWorld struct {
	Players []model.Player
}

func (g *GameWorld) AddPlayer(player *model.Player) {
	g.Players = append(g.Players, *player)
}

func (g *GameWorld) Run(connections []*websocket.Conn) {
	for {
		for _, p := range g.Players {
			p.Move()
		}

		for _, conn := range connections {
			err := conn.WriteJSON(g.Players)
			if err != nil {
				log.Println("Write Error: ", err)
				break
			}
		}

		time.Sleep(50 * time.Millisecond)
	}
}
