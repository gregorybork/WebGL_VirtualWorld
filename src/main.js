var VSHADER_SOURCE =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  varying vec4 v_Color;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;

  void main() {
    v_Color = a_Color;
    v_TexCoord = a_TexCoord;
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * a_Position;
  }`;

// Fragment Shader
var FSHADER_SOURCE =
  `precision mediump float;
  varying vec4 v_Color;
  varying vec2 v_TexCoord;

  uniform sampler2D u_Sampler;

  void main() {
    gl_FragColor = texture2D(u_Sampler, v_TexCoord);
  }`;

// -----------------------------------------------------
//main
function main() {
  canvas = document.getElementById("webgl");
  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  // Initialize the scene
  var scene = new drawScene();
  var camera = new View();

  var keyboardMovement = new KeyboardMovement(canvas, scene, camera);

  // Initialize shader
  shader = new HelperSh(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  // Add attibutes
  shader.newAttriSh("a_Position");
  shader.newAttriSh("a_Color");
  shader.newAttriSh("a_TexCoord");

  shader.newUnifSh("u_Sampler", "sampler2D", new Matrix4().elements);
  shader.newUnifSh("u_ViewMatrix", "mat4", new Matrix4().elements);
  shader.newUnifSh("u_ProjectionMatrix", "mat4", new Matrix4().elements);

// -----------------------------------------------------
  // Load texture and add square to the scene with that texture.
  keyboardMovement.readTexture("lib/floor.jpg", function(image2) {
      var shape = new drawSquare(shader, image2);
      console.log("Square");
      scene.draw(shape);
  })

// -----------------------------------------------------
//draw cubes
  keyboardMovement.readTexture("lib/sky.jpg", function(image) {

    var position = [0,0,0];
    var sky = new drawCube(shader, image, 60, position);
    scene.draw(sky);



      position = [0, -0.5, -16];
      var displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-1, -0.5, -16];
      var displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [1,-0.5, -10];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [1,0.5, -10];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [2,-0.5, -10];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [2,0.5, -10];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [1,-0.5, -10];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [1,0.5, -10];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-5,-0.9, -3];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-3,0.5, -10];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-3,-0.5, -10];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-3,1.5, -10];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-3,0.5, -11];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-3,-0.5, -11];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-3,1.5, -11];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-3,0.5, -12];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-3,-0.5, -12];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-3,1.5, -12];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-3,0.5, -13];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-3,-0.5, -13];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-3,1.5, -13];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-3,2.5, -13];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      position = [-3,-0.5, -9];
      displaycube = new drawCube(shader, image, 0.5, position);
      scene.draw(displaycube);

      //----------------------------

      for(var p = -0.5; p < 3.5; p++) {
        position = [3, k, 4];
        displaycube = new drawCube(shader, image, 0.5, position);
        scene.draw(displaycube);
      }

      for(var s = -30; l < 30; l++) {
        position = [s, -0.5, 4];
        displaycube = new drawCube(shader, image, 0.5, position);
        scene.draw(displaycube);
      }



      for(var p = -0.5; p < 3.5; p++) {
        position = [30, p, 25];
        displaycube = new drawCube(shader, image, 0.5, position);
        scene.draw(displaycube);
      }


      for(var k = -0.5; k < 3.5; k++) {
        position = [2, k, 4];
        displaycube = new drawCube(shader, image, 0.5, position);
        scene.draw(displaycube);
      }


      for(var k = -0.5; k < 2.5; k++) {
        position = [13, k, -12];
        displaycube = new drawCube(shader, image, 0.5, position);
        scene.draw(displaycube);
      }

      for(var k = -0.5; k < 2.5; k++) {
        position = [13, k, -13];
        displaycube = new drawCube(shader, image, 0.5, position);
        scene.draw(displaycube);
      }

      for(var k = -0.5; k < 2.5; k++) {
        position = [13, k, -14];
        displaycube = new drawCube(shader, image, 0.5, position);
        scene.draw(displaycube);
      }

      for(var k = -0.5; k < 2.5; k++) {
        position = [13, k, -15];
        displaycube = new drawCube(shader, image, 0.5, position);
        scene.draw(displaycube);
      }

      for(var l = -6; l < 8; l++) {
        position = [16, -0.5, l];
        displaycube = new drawCube(shader, image, 0.5, position);
        scene.draw(displaycube);
      }

      for(var w = -15; l < 15; l++) {
        position = [w, -0.5, 4];
        displaycube = new drawCube(shader, image, 0.5, position);
        scene.draw(displaycube);
      }

  })

  // render the screne
  renderer = new Renderer(gl, scene, camera);
  renderer.start();
}
// -----------------------------------------------------
//drawScene
class drawScene {

  // the shapes
  constructor() {
    this.shapes = [];
  }
  //draw them with push
  draw(shape) {
    this.shapes.push(shape);
  }

  //clear canvas
  clear() {
    this.shapes = [];
  }
}

// -----------------------------------------------------
// draws square floor and UV coord
class drawSquare extends Helper {
    constructor(shader, image) {
        super(shader);

        this.vertices = this.initSquareVertextBuffers();
        this.faces = {0: [0, 1, 2]};

        this.image = image;

        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
    }

    initSquareVertextBuffers() {
        var vertices = []

        // Vertex 0
        var v0 = new Vertex(-32.0, -1.0, 32.0);
        v0.texCoord = [0.0,1.0];
        vertices.push(v0);

        // Vertex1
        var v1 = new Vertex(-32.0, -1.0, -32.0);
        v1.texCoord = [0.0,0.0];
        vertices.push(v1);

        // Vertex 2
        var v2 = new Vertex( 32.0, -1.0, 32.0);
        v2.texCoord = [1.0,1.0];
        vertices.push(v2);

        // Vertex 2
        var v3 = new Vertex( 32.0, -1.0, -32.0);
        v3.texCoord = [1.0,0.0];
        vertices.push(v3);

        // Vertex 2
        var v4 = new Vertex(-32.0, -1.0, -32.0);
        v4.texCoord = [0.0,0.0];
        vertices.push(v4);

        // Vertex 2
        var v5 = new Vertex( 32.0, -1.0, 32.0);
        v5.texCoord = [1.0,1.0];
        vertices.push(v5);

        return vertices;
     }
  }

// -----------------------------------------------------
// draw a drawCube
class drawCube extends Helper {
    //constructors to create drawCube
    constructor(shader, image, size, position) {
        super(shader);
        this.modelMatrix = new Matrix4();
        this.vertices = this.initCubeVertextBuffers(size, position);
        this.faces = {0: [0, 1, 2, 3, 4, 5]};

        this.image = image;
        this.interleaveVertices();
    }

    initCubeVertextBuffers(size, position) {
        var vertices = [];

        var v0 = new Vertex( size + position[0],  size + position[1],  size + position[2]);
        var v1 = new Vertex(-size + position[0],  size + position[1],  size + position[2]);
        var v2 = new Vertex(-size + position[0], -size + position[1],  size + position[2]);
        var v3 = new Vertex( size + position[0], -size + position[1],  size + position[2]);
        var v4 = new Vertex( size + position[0], -size + position[1], -size + position[2]);
        var v5 = new Vertex( size + position[0],  size + position[1], -size + position[2]);
        var v6 = new Vertex(-size + position[0],  size + position[1], -size + position[2]);
        var v7 = new Vertex(-size + position[0], -size + position[1], -size + position[2]);

        v0.texCoord = [0.0,1.0];
        v1.texCoord = [1.0,1.0];
        v2.texCoord = [0.0,1.0];
        v3.texCoord = [1.0,1.0];
        v4.texCoord = [0.0,1.0];
        v5.texCoord = [1.0,1.0];
        v6.texCoord = [0.0,1.0];
        v7.texCoord = [1.0,1.0];


      vertices.push(v0);
      vertices.push(v1);
      vertices.push(v2);

      vertices.push(v0);
      vertices.push(v2);
      vertices.push(v3);

      vertices.push(v0);
      vertices.push(v3);
      vertices.push(v4);

      vertices.push(v0);
      vertices.push(v4);
      vertices.push(v5);

      vertices.push(v0);
      vertices.push(v5);
      vertices.push(v6);

      vertices.push(v0);
      vertices.push(v6);
      vertices.push(v1);

      vertices.push(v1);
      vertices.push(v2);
      vertices.push(v7);

      vertices.push(v1);
      vertices.push(v7);
      vertices.push(v6);

      vertices.push(v2);
      vertices.push(v3);
      vertices.push(v4);

      vertices.push(v2);
      vertices.push(v4);
      vertices.push(v7);

      vertices.push(v4);
      vertices.push(v7);
      vertices.push(v6);

      vertices.push(v4);
      vertices.push(v6);
      vertices.push(v5);


      console.log("vertices pushed");

      return vertices;
     }
  }

//attribute helper for uv coordinates/norm
class Vertex {
  constructor(x, y, z, color) {
      this.point  = new Vector3([x, y, z]);
      this.color  = [0.0, 1.0, 0.0, 1.0];
      this.texCoord  = [0.0, 0.0];

  }
}

// -----------------------------------------------------
// keyboardMovement

var _keyboardMovement = null;
class KeyboardMovement {
    /**
     * Initializes the event handeling functions within the program.
     */
    constructor(canvas, scene, camera) {
      this.canvas = canvas;
      this.scene  = scene;
      this.camera = camera;

      _keyboardMovement = this;

      // Mouse Events
      this.canvas.onmousedown = function(ev) { _keyboardMovement.mouseClick(ev) };
      this.canvas.onmousemove = function(ev) { _keyboardMovement.mouseMove(ev) };

      // Keyboard Events
      document.addEventListener('keydown', function(ev) { _keyboardMovement.keyDown(ev); }, false);
      document.addEventListener('keyup',   function(ev) { _keyboardMovement.keyUp(ev);   }, false);

    }

    /**
     * Function called upon mouse click.
     */
    mouseClick(ev) {
        // Print x,y coordinates.
        console.log(ev.clientX, ev.clientY);

        var shape = new Square(shader);
        this.scene.draw(shape);
    }

    mouseMove(ev) {
        var movementX = ev.movementX;
        console.log("movementX", movementX);
        this.camera.pan(movementX);

        var movementY = ev.movementY;
        console.log("movementY", movementY);
        this.camera.tilt(movementY)
    }

    keyUp(ev) {
        var keyName = event.key;
        console.log("key up", keyName);
    }

    keyDown(ev) {
        var keyName = event.key;
        console.log("key down", keyName);

        // Move Left
        if(keyName == "a") {
            this.camera.truck(-1);
        }

        // Move Right
        else if(keyName == "d") {
            this.camera.truck(1);
        }

        // Move Forward
        else if(keyName == "w") {
            this.camera.dolly(-1);
        }

        // Move Backward
        else if(keyName == "s") {
            this.camera.dolly(1);
        }

        else if(keyName == "z") {
            this.camera.setOrtho();
        }

        else if(keyName == "e") {
            this.camera.zoom(-1);
        }

        else if(keyName == "q") {
            this.camera.zoom(1);
        }
    }

    /**
     * Function called to read a selected file.
     */
    readSelectedFile() {
        var fileReader = new FileReader();
        var objFile = document.getElementById("fileInput").files[0];

        if (!objFile) {
            alert("OBJ file not set!");
            return;
        }

        fileReader.readAsText(objFile);
        fileReader.onloadend = function() {
            alert(fileReader.result);
        }
    }

    readTexture(src, onTexLoad) {
        // Create the image object
        var image = new Image();
        if (!image) {
          console.log('Failed to create the image object');
          return false;
        }

        // Register the event handler to be called on loading an image
        image.onload = function() {
            _keyboardMovement.image = image;
            onTexLoad(image);
        };

        // Tell the browser to load an image
        image.src = src
        return true;
    }
}
