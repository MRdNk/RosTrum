var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

// draw a straight line
ctx.beginPath ()
ctx.moveTo(100, 150)
ctx.lineTo(450, 50)
ctx.stroke()

// draw an arc
var x = canvas.width / 2
var y = canvas.height / 2
var radius = 75
var startAngle = 1.1 * Math.PI
var endAngle = 1.9 * Math.PI
var counterClockwise = false

ctx.beginPath ()
ctx.arc (x, y, radius, startAngle, endAngle, counterClockwise)
ctx.lineWidth = 1
ctx.stroke ()

// draw a quadratic curve
ctx.beginPath ()
ctx.moveTo (188, 150)
ctx.quadraticCurveTo (288, 0, 388, 150)
ctx.lineWidth = 5
ctx.stroke ()

// draw a bezier curve
ctx.beginPath ()
ctx.moveTo (188, 130)
ctx.bezierCurveTo (140, 0, 388, 10, 388, 170)
ctx.lineWidth = 2
ctx.stroke ()

