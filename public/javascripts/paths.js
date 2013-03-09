var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

// being
ctx.beginPath ()
ctx.moveTo (100, 20)

// line 1
ctx.lineTo (200, 160)

// quadratic curve
ctx.quadraticCurveTo (230, 200, 250, 120)

// bezier curve
ctx.bezierCurveTo (290, -40, 300, 200, 400, 150)

// line 2
ctx.lineTo (500, 90)

ctx.lineWidth = 5
ctx.strokeStyle = 'blue'
ctx.stroke ()