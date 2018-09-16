package game

// World of game
import (
	c "../common"
)

const (
	ShotVel   = 35
	PlayerVel = 11
)

type World struct {
	Players []Player
	Shots   []Shot
	Schan   chan c.ShotMessg
	Pchan   chan c.PlayerMessg
}

func (w World) Run(cp c.PlayerMessg, cs c.ShotMessg) {
	players := make([]Player, 0)
	shots := make([]Shot, 0)
	w.Pchan = make(chan c.PlayerMessg)
	w.Schan = make(chan c.ShotMessg)

	go w.EventHandler()
	for {

	}

}
func (w World) EventHandler() {
	for {
		select {
		case p := <-w.Pchan:
			w.PlayerHandler(p)
		case s := <-w.Schan:
			w.ShotHandler(s)
		}
	}
}

// PlayerHandler for World
func (w World) PlayerHandler(p c.PlayerMessg) {
	switch p.chanCode {
	case c.CCode.Create:
		w.CreatePlayer()
	case c.CCode.Update:

	case c.CCode.Delete:

	}
}

// ShotHandler for World
func (w World) ShotHandler(s c.ShotMessg) {

}

// CreateShot in the world
func (w World) CreateShot(s Shot) {
	w.Shots = append(w.Shots, s)
}

// CreatePlayer in the world
func (w World) CreatePlayer(p Player) {
	w.Players = append(w.Players, p)
}

// Player of the game
type Player struct {
	Pos  Vec
	Life int8
	ID   string
}

// Update player
func (p Player) Update(pos Vec, life int8) {
	p.Pos = pos
	p.Life = life
}

// Shots .
type Shots []Shot

// Shot .
type Shot struct {
	Pos     Vec
	Vel     Vec
	OwnerID string
}

// Update shot position
func (s Shot) Update(pos Vec) {
	s.Pos = pos
}
func (s Shot) UpdateVel() {

}

func (ss Shots) Update() {
	for i := range ss {
		ss[i].Pos.Add(ss[i].Vel)
	}
}

// Game inits the world
func Game() World {

	return World{}
}

// Vec 2D Vector
type Vec struct {
	x float32
	y float32
}

// Add to vector
func (v Vec) Add(av Vec) {
	v.x = v.x + av.x
	v.y = v.y + av.y
}
