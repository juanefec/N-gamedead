package orchester

import (
	"io"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:    4096,
	WriteBufferSize:   4096,
	EnableCompression: true,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type WSH struct {
}

func WSHandler(w http.ResponseWriter, r *http.Request, writerOnly bool) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade:", err)
		return
	}
	defer conn.Close()
	for {
		mt, r, err := conn.NextReader()
		if err != nil {
			if err != io.EOF {
				log.Println("NextReader:", err)
			}
			return
		}
		if mt == websocket.TextMessage {
			r = &validator{r: r}
		}
		w, err := conn.NextWriter(mt)
		if err != nil {
			log.Println("NextWriter:", err)
			return
		}
		if mt == websocket.TextMessage {
			r = &validator{r: r}
		}
		if writerOnly {
			_, err = io.Copy(struct{ io.Writer }{w}, r)
		} else {
			_, err = io.Copy(w, r)
		}
		if err != nil {
			if err == errInvalidUTF8 {
				conn.WriteControl(websocket.CloseMessage,
					websocket.FormatCloseMessage(websocket.CloseInvalidFramePayloadData, ""),
					time.Time{})
			}
			log.Println("Copy:", err)
			return
		}
		err = w.Close()
		if err != nil {
			log.Println("Close:", err)
			return
		}
	}
}
