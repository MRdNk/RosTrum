window.requestAnimFrame = (function(callback){
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame 
      || window.mozRequestAnimationFrame || window.oRequestAnimationFrame 
      || window.msRequestAnimationFrame ||
  function(callback){
    window.setTimeout(callback, 1000 / 60);
  };
})();


function animate(lastTime, angularSpeed, three){
  // update
  var date = new Date();
  var time = date.getTime();
  var timeDiff = time - lastTime;
  var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;
  three.cube.rotation.y += angleChange;
  three.cube.rotation.z += 0.01;
  lastTime = time;

  // render
  three.renderer.render(three.scene, three.camera);

  // request new frame
  requestAnimFrame(function(){
    animate(lastTime, angularSpeed, three);
  });
}

window.onload = function(){
  var angularSpeed = 0.1; // revolutions per second
  var lastTime = 0;

  var $elem = document.getElementById('container');

  // renderer
  var renderer = new THREE.WebGLRenderer();
  var widthSize = parseInt($elem.attributes[0].nodeValue);// / 3); //430; // window.innerWidth / 3;
  var heightSize = parseInt($elem.attributes[1].nodeValue); // / 3); //215; //window.innerHeight / 3;

  console.log(widthSize, heightSize)

  renderer.setSize(widthSize, heightSize);
  
  $elem.appendChild(renderer.domElement);
  // document.body.appendChild(renderer.domElement);

  // camera
  // var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 300;

  // scene
  var scene = new THREE.Scene();

  // MeshLambertMaterial
  var material = new THREE.MeshLambertMaterial({
    map: THREE.ImageUtils.loadTexture("/images/crate.jpg")
  });

  // cube
/*  var cube = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100), material);
  cube.overdraw = true;
  scene.add(cube);*/
  var cube = new Cube (50, 50, 50, material);
  scene.add(cube);

  window.cube = cube;

  function Cube (x, y, z, material) {
    var cube = new THREE.Mesh(new THREE.CubeGeometry(x, y, z, 1, 1, 1), material);
    cube.overdraw = true;
    return cube;
  }

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);

  // add directional light source
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  // create wrapper object that contains three.js objects
  var three = {
    renderer: renderer,
    camera: camera,
    scene: scene,
    cube: cube
  };

  /*
   * wait for texture image to load before
   * starting the animation
   */ 
  var textureImg = new Image();
  textureImg.onload = function(){
    animate(lastTime, angularSpeed, three, this);
  };
  textureImg.src = "/images/crate.jpg";
};