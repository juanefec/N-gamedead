package common

// CCode for operations
var CCode = Codes{
	Create: "C",
	Update: "U",
	Delete: "D",
}

// Code is the code
type Code string

// Codes are the codes
type Codes struct {
	Create Code
	Update Code
	Delete Code
}

// Vec is a 2D Vector
type PlayerMessg struct {
	ChanCode Code
	Pos      Vec
	ID       string
}
type ShotMessg struct {
	ChanCode Code
	Pos      Vec
	Dir      Vec
	ID       string
}

type Vec struct {
	x float32
	y float32
}
