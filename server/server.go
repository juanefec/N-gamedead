package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"

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
