(function () {

  var KEYS = {
      LEFT: 37
    , RIGHT: 39 
    , UP: 38
    , DOWN: 40
    , W: 87
    , D: 68
    , A: 65
    , S: 83
  }

  var MOVEMENT = {
      LEFT: -5
    , RIGHT: 5
    , UP: -2
    , DOWN: 2
    , RUN_TIME: 200
  }

  var stage = new Kinetic.Stage ({
      container: 'container'
    , width: 1000
    , height: 200
    , 'border-radius': 4
  })

  var jumpPoint

  var background_layer = new Kinetic.Layer()
  var layer = new Kinetic.Layer()

  var animal = 0
  var animals = ['sheep', 'swan', 'horse', 'dolphin', 'cow', 'dog', 'pig', 'duck']
  var animations = {}

  for (var i = 0; i < animals.length; i++) {
    var array = []

    for (var x = 0; x < 4; x++) {
      array[x] = {}
      array[x].x = (x === 0) ? 2 : 120 * x
      array[x].y = 90 * i
      array[x].width = 120
      array[x].height = 90  
    }
    
    animations[animals[i]] = array
  }

  var background = new Kinetic.Rect({
      x: 0
    , y: 0
    , width: stage.getWidth()
    , height: stage.getHeight()
    , fill: '#2895E7'
  })

  var imageObj = new Image()
  imageObj.onload = function () {

    Kinetic.Node.addGetterSetter(Kinetic.Sprite, 'directionX', 0)
    Kinetic.Node.addGetterSetter(Kinetic.Sprite, 'directionY', 0)

    var sheep = new Kinetic.Sprite({
        x: 120
      , y: 90
      , width: 90
      , image: imageObj
      , animation: animals[animal]
      , animations: animations
      , frameRate: 10
      , directionX: 0
      , directionY: 0
    })

    background_layer.add(background)
    layer.add(sheep)
    stage.add(background_layer)
    stage.add(layer)

    background_layer.clear()

    window.onkeydown = function (e) {
      switch (e.keyCode) {
        case KEYS.LEFT: 
        case KEYS.A:
          move(sheep, MOVEMENT.LEFT)
          break
        case KEYS.RIGHT: 
        case KEYS.D:
          move(sheep, MOVEMENT.RIGHT)
          break
        case KEYS.UP:
        case KEYS.W:
          jumpPoint = sheep.getY()
          move(sheep, null, MOVEMENT.UP)
          break
        case KEYS.DOWN:
        case KEYS.S:
          // move(sheep, null, MOVEMENT.DOWN)
          break
      }
    }

    window.onkeyup = function (e) {
      switch (e.keyCode) {
        case KEYS.LEFT:
        case KEYS.A:
          animX.stop()
          break
        case KEYS.RIGHT: 
        case KEYS.D:
          animX.stop()
          break
      }
      
      if(!animX.isRunning() && !animY.isRunning()) sheep.stop()
    }

    function move (shape, x, y) {
      if (x) { 
        shape.setDirectionX(x)
        runAnimation(sheep, 'sheep', true)
      }
      if (y) {
        shape.setDirectionY(y)
        runAnimation(sheep, 'sheep')
      }
    }

    function runAnimation (shape, animation, isX) {
      if (isX) animX.start()
      else animY.start()
    }

    var animX = new Kinetic.Animation (function (frame) {
      var locX = (sheep.getX() > stage.getWidth()) ? 0 - sheep.getWidth() : sheep.getX() + sheep.getDirectionX()
      sheep.start()
      sheep.setX (locX)
    }, layer)

    var animY = new Kinetic.Animation (function (frame) {
      
      if (sheep.getDirectionY() === MOVEMENT.DOWN) {
        sheep.setY(sheep.getY() + sheep.getDirectionY())
        if (sheep.getY() === jumpPoint) {
          animY.stop()
          sheep.stop()
          sheep.index = 0;
          console.log('at jumpPoint')
        }
      }
      else {
        var locY = (sheep.getY() > stage.getHeight()) ? 0 - sheep.getHeight() : sheep.getY() + sheep.getDirectionY()
        sheep.start()
        sheep.setY (locY)
        setTimeout (function () {
          sheep.setDirectionY(MOVEMENT.DOWN)
          sheep.start()
          animY.start()
          sheep.index = 0;
        }, 300)
      }
    }, layer)
  }

  imageObj.src = '/images/animals.png'
}())