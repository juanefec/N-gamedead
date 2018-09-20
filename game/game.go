package game

// World of game
import (
	"math"

	c "../common"
)

const (
	ShotVel   = 35
	PlayerVel = 11
)

// Game inits the world
func Game() World {

	return World{}
}

// World of the game
type World struct {
	x ,y float32
	Players []Player
	Shots   []Shot
	Schan   chan c.ShotMessg
	Pchan   chan c.PlayerMessg
}

// Run World loop
func (w World) Run() {
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
	switch p.ChanCode {
	case c.CCode.Create:
		w.CreatePlayer(p)
	case c.CCode.Update:

	case c.CCode.Delete:

	}
}

// ShotHandler for World
func (w World) ShotHandler(s c.ShotMessg) {
	switch s.ChanCode {
	case c.CCode.Create:
		w.CreateShot(s)
	case c.CCode.Update:

	case c.CCode.Delete:

	}
}

// CreateShot in the world
func (w World) CreateShot(sm c.ShotMessg) {
	s := Shot{}
	w.Shots = append(w.Shots, s)
}

// CreatePlayer in the world
func (w World) CreatePlayer(pm c.PlayerMessg) {
	p := Player{}
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
func (s Shot) UpdateVel(d Vec) {
	d.Normalize()
	d.Mult(ShotVel)
	s.Pos.Add(d)
}

func (ss Shots) Update() {
	for i := range ss {
		ss[i].Pos.Add(ss[i].Vel)
	}
}

// Vec 2D Vector
type Vec struct {
	x float32
	y float32
}

func CreateVector() Vec {
	return Vec{x: 0, y: 0}
}
func InitVector(x, y float32) Vec {
	return Vec{x: x, y: y}
}

// Add to vector
func (v Vec) Add(av Vec) {
	v.x = v.x + av.x
	v.y = v.y + av.y
}

func (v Vec) MagSq() float32 { return v.x*v.x + v.y*v.y }

func (v Vec) Mag() float32 {
	return float32(math.Sqrt(float64(v.MagSq())))
}

func (v Vec) Mult(n float32) {
	v.x *= n
	v.y *= n
}

func (v Vec) Normalize() {
	l := v.Mag()
	if l != 0 {
		v.Mult(1 / l)
	}
}
