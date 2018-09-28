//falta pasar referencia de slice de conexiones y eliminar conexion al desconectar
package main

import (
	"log"
	"net/http"

	"./model"

	"github.com/gorilla/websocket"
)

var gameWorld = new(GameWorld)
var connections = make([]*websocket.Conn, 0)

var done = make(chan bool)

var upgrader = websocket.Upgrader{
	ReadBufferSize:    4096,
	WriteBufferSize:   4096,
	EnableCompression: true,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	go gameWorld.Run(connections)
	http.HandleFunc("/ws", handler)
	http.ListenAndServe(":9999", nil)
}

func handler(res http.ResponseWriter, req *http.Request) {
	conn, err := upgrader.Upgrade(res, req, nil)
	if err != nil {
		log.Println("Upgrade Error: ", err)
		return
	}
	defer conn.Close()

	log.Println("WebSocket connection initiated.")

	player := model.NewPlayer("jugador")
	gameWorld.AddPlayer(player)
	connections = append(connections, conn)

	go actionHandler(conn, player)

	for i := 0; i < 2; i++ {
		<-done
	}

	log.Println("WebSocket connection terminated.")
}

func actionHandler(conn *websocket.Conn, player *model.Player) {
	for {
		_, bytes, err := conn.ReadMessage()
		if err != nil {
			log.Println("Read Error: ", err)
			break
		}

		msg := string(bytes[:])

		player.SetAction(msg)
	}
}
