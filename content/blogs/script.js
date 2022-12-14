const crypto = require('crypto-js')

let array = [ { seatNumber: 'A1',
hold: false,
available: true
},
{ seatNumber: 'A2',
hold: false,
available: true
},
{ seatNumber: 'A3',
hold: false,
available: true
},
{ seatNumber: 'A4',
hold: false,
available: true
},
{ seatNumber: 'B1',
hold: false,
available: true
},
{ seatNumber: 'B2',
hold: false,
available: true
},
{ seatNumber: 'B3',
hold: false,
available: true
},
{ seatNumber: 'B4',
hold: false,
available: true
},
{ seatNumber: 'C1',
hold: false,
available: true
},
{ seatNumber: 'C2',
hold: false,
available: true
},
{ seatNumber: 'C3',
hold: false,
available: true
},
{ seatNumber: 'C4',
hold: false,
available: true
},
{ seatNumber: 'D1',
hold: false,
available: true
},
{ seatNumber: 'D2',
hold: false,
available: true
},
{ seatNumber: 'D3',
hold: false,
available: true
},
{ seatNumber: 'D4',
hold: false,
available: true
} ]

let bookedSeat = 'D4'

const result = array.filter( obj => obj.seatNumber === bookedSeat )

if(result[0].available === false)
console.log("already booked")
else
console.log("you can book now")

const generatePassword = () => {

}