package main

import (
	"log"
	"time"

	"./data"
	"./model"
	"github.com/gorilla/websocket"
)

type GameWorld struct {
	Players map[model.Player]*websocket.Conn
}

func NewGameWorld() *GameWorld {
	gw := new(GameWorld)
	gw.Players = make(map[model.Player]*websocket.Conn)
	return gw
}

func (g *GameWorld) AddPlayer(player *model.Player, conn *websocket.Conn) {
	g.Players[*player] = conn
}

func (g *GameWorld) Run() {
	for {
		g.step()
		g.sendPackets()

		time.Sleep(50 * time.Millisecond)
	}
}

func (g *GameWorld) step() {
	for k := range g.Players {
		k.Move()
	}
}

func (g *GameWorld) sendPackets() {
	packet := g.makePacket()
	for k, v := range g.Players {
		err := v.WriteJSON(packet)
		if err != nil {
			log.Println("Write Error: ", k.Name, " ", err)
			v.Close()
			delete(g.Players, k)
		}
	}
}

func (g *GameWorld) makePacket() *data.Packet {
	packet := new(data.Packet)

	for k := range g.Players {
		packet.PlayerData = append(packet.PlayerData, *k.GetData())
	}

	return packet
}
