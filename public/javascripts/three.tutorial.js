// Set the scene size
var WIDTH = 400;
var HEIGHT = 300;

// Set some camera attributes
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.1;
var FAR = 1000;

// Fetch the container dom element
var $container = document.getElementById('container');

// Create a WebGL renderer, camera and a scene
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera (
    VIEW_ANGLE
  , ASPECT
  , NEAR
  , FAR
);

var scene = new THREE.Scene();

// Add the camera to the scene
scene.add(camera);

// The camera starts at 0,0,0 so pull it back
camera.position.z = 1000;

// Start the renderer
renderer.setSize (WIDTH, HEIGHT);

console.log($container);
$container.appendChild(renderer.domElement);

// Setup the scene vars
var radius = 50;
var segments = 16;
var rings = 16;

// Create a new mesh with sphere geometry
var sphere = new THREE.Mesh (
  new THREE.SphereGeometry (
      radius
    , segments
    , rings
  )
  , sphereMaterial
);

// Add a sphere to the scene
scene.add(sphere);

// Create a sphere's material
var sphereMaterial = new THREE.MeshLambertMaterial ({
  color: 0xCC0000
});

// Create a point light
var pointLight = new THREE.PointLight (0xFFFFFF);

// Set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// Add light to the scene
scene.add(pointLight);

// Draw
renderer.render(scene, camera);