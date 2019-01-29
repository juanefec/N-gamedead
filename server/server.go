package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"./data"
	"./model"
	"github.com/gorilla/websocket"
)

var gameWorld = NewGameWorld()

var playerNumber = 0

var upgrader = websocket.Upgrader{
	ReadBufferSize:    4096,
	WriteBufferSize:   4096,
	EnableCompression: true,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	go gameWorld.Run()
	http.HandleFunc("/ws", handler)
	log.Println("Running")
	http.ListenAndServe(":9999", nil)
}

func handler(res http.ResponseWriter, req *http.Request) {
	conn, err := upgrader.Upgrade(res, req, nil)
	if err != nil {
		log.Println("Upgrade Error: ", err)
		return
	}
	defer conn.Close()

	log.Println("WebSocket connection initiated. Port ", conn.RemoteAddr())

	player := model.NewPlayer(fmt.Sprintf("%s%d", "jugador", playerNumber))
	playerNumber++ //esto va a volar despues, ahora está para probar
	gameWorld.AddPlayer(player, conn)

	var wg sync.WaitGroup
	wg.Add(1)
	go actionHandler(conn, player, &wg)
	wg.Wait()

	log.Println("WebSocket connection terminated.")
}

func actionHandler(conn *websocket.Conn, player *model.Player, wg *sync.WaitGroup) {
	for {
		_, bytes, err := conn.ReadMessage()
		if err != nil {
			log.Println("Read Error: ", player.Name, " ", err)
			break
		}

		msg := string(bytes[:])

		player.SetAction(msg)
	}
	wg.Done()
}

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
