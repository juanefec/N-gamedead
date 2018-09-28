package model

import (
	"../constants"
)

type Player struct {
	Name     string
	Position *Position
	Actions  *Actions
}

func NewPlayer(name string) *Player {
	p := new(Player)
	p.Name = name
	p.Position = new(Position)
	p.Actions = new(Actions)
	return p
}

func (p *Player) SetAction(command string) {
	switch command {
	case constants.UpPressed:
		p.Actions.Up = true
	case constants.UpUnpressed:
		p.Actions.Up = false
	case constants.DownPressed:
		p.Actions.Down = true
	case constants.DownUnpressed:
		p.Actions.Down = false
	case constants.LeftPressed:
		p.Actions.Left = true
	case constants.LeftUnpressed:
		p.Actions.Left = false
	case constants.RightPressed:
		p.Actions.Right = true
	case constants.RightUnpressed:
		p.Actions.Right = false
	}
}

func (p *Player) Move() {
	if p.Actions.Up {
		p.Position.Y++
	} else if p.Actions.Down {
		p.Position.Y--
	}

	if p.Actions.Right {
		p.Position.X++
	} else if p.Actions.Left {
		p.Position.X--
	}
}
