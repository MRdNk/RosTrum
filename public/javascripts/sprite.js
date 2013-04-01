(function () {
  var stage = new Kinetic.Stage ({
      container: 'container'
    , width: 1000
    , height: 200
    , 'border-radius': 4
  })

  var background_layer = new Kinetic.Layer()
  var layer = new Kinetic.Layer()

  var animal = 0;
  var animals = ['sheep', 'swan', 'horse', 'dolphin', 'cow', 'dog', 'pig', 'duck'];
  var animations = {};

  for (var i = 0; i<animals.length; i++) {
    var array = []

    for (var x = 0; x < 4; x++) {
      array[x] = {};
      array[x].x = (x === 0) ? 2 : 120 * x;
      array[x].y = 90 * i;
      array[x].width = 120;
      array[x].height = 90;  
    }
    
    animations[animals[i]] = array;
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

    var sheep = new Kinetic.Sprite({
        x: 100
      , y: 90
      , width: 90
      , image: imageObj
      , animation: animals[animal]
      , animations: animations
      , frameRate: 10
    })

    var amplitude = 150;
    var period = 2000;
    // in ms
    var centerX = stage.getWidth() / 2;

    background_layer.add(background)
    layer.add(sheep)
    stage.add(background_layer)
    stage.add(layer)

    // console.log(background_layer)
    background_layer.clear()
    sheep.start()

    var anim = new Kinetic.Animation (function (frame) {
      var loc = (sheep.getX() > stage.getWidth()) ? 0 - sheep.getWidth() : sheep.getX() + 5;
      if (sheep.getX() > stage.getWidth()) {
        if (animal !== animals.length-1) {
          sheep.setAnimation(animals[++animal])
          if (animals[animal] === 'dolphin')
            background_layer.draw()
          else
            background_layer.clear() //.setZIndex(0)

        }
        else {
          animal = 0;
          sheep.setAnimation(animals[animal])
        }
      }
      sheep.setX (loc)

    }, layer)

    // sheep.start()
    anim.start()
    setTimeout (function () {
      // anim.stop()
    }, 2000)
  }

  imageObj.src = '/images/animals.png'

}())