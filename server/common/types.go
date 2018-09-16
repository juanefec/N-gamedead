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
	chanCode Code
}
type ShotMessg struct {
	chanCode Code
}
