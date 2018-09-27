package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

type position struct {
	X int
	Y int
}

type actions struct {
	Up    bool
	Down  bool
	Left  bool
	Right bool
}

func main() {
	http.HandleFunc("/ws", handler)
	http.ListenAndServe(":9999", nil)
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:    4096,
	WriteBufferSize:   4096,
	EnableCompression: true,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var act = actions{}
var pos = position{}
var done = make(chan bool)

func handler(res http.ResponseWriter, req *http.Request) {
	conn, err := upgrader.Upgrade(res, req, nil)
	if err != nil {
		log.Println("Upgrade Error: ", err)
		return
	}
	defer conn.Close()

	log.Println("WebSocket connection initiated.")

	go actionHandler(conn)
	go positionHandler(conn)

	for i := 0; i < 2; i++ {
		<-done
	}

	log.Println("WebSocket connection terminated.")
}

func actionHandler(conn *websocket.Conn) {
	for {
		_, bytes, err := conn.ReadMessage()
		if err != nil {
			log.Println("Read Error: ", err)
			break
		}

		switch msg := string(bytes[:]); msg {
		case "upPressed":
			act.Up = true
		case "upUnpressed":
			act.Up = false
		case "downPressed":
			act.Down = true
		case "downUnpressed":
			act.Down = false
		case "leftPressed":
			act.Left = true
		case "leftUnpressed":
			act.Left = false
		case "rightPressed":
			act.Right = true
		case "rightUnpressed":
			act.Right = false
		}
	}
	done <- true
}

func positionHandler(conn *websocket.Conn) {
	for {
		if act.Up {
			pos.Y++
		} else if act.Down {
			pos.Y--
		}

		if act.Right {
			pos.X++
		} else if act.Left {
			pos.X--
		}

		err := conn.WriteJSON(pos)
		if err != nil {
			log.Println("Write Error: ", err)
			break
		}

		time.Sleep(50 * time.Millisecond)
	}
	done <- true
}
