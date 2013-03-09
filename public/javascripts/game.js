var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight

var scene = new THREE.Scene ()
var camera = new THREE.PerspectiveCamera(100, WIDTH / HEIGHT, 0.1, 1000)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(WIDTH, HEIGHT)
document.body.appendChild(renderer.domElement)

// cube
var geometry = new THREE.CubeGeometry (1, 1, 1)
var material = new THREE.MeshBasicMaterial ({ color: 0x00ff00 })
var cube = new THREE.Mesh (geometry, material)
scene.add(cube)

var cube2 = new THREE.Mesh (geometry, material)
cube2.position.y =- 5;
scene.add(cube2)

camera.position.z = 5

function render () {
  requestAnimationFrame(render)
  cube.rotation.x += 0.1
  cube.rotation.y += 0.1
  renderer.render (scene, camera)
}

render()

$(window).keydown(controls)

function controls (e) {
  console.log('e: ', e.keyCode)

  switch (e.keyCode) {
    case 38:
      camera.position.z -= 1
      break;
    case 40: 
      camera.position.z += 1
      break;
    case 39:
      // right
      break;
    case 37:
      // left
      break;
  }

  render ();

}

function forward () {
  //camera = new THREE.PerspectiveCamera (100, WIDTH / HEIGHT, 0.1, 1000)
  camera.position.z -= 1
  render ()
}

