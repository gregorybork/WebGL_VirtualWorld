var _renderer = null;

class Renderer {

    constructor(gl, scene, camera) {
        this.gl = gl;
        this.scene = scene;
        this.camera = camera;

        this.textures = {};

        this.initGLSLBuffers();

        // Setting canvas' clear color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        // Use the z-buffer when drawing
        this.gl.enable(gl.DEPTH_TEST);

        _renderer = this;
    }

    /**
     * Starts an animation loop
     */
    start() {
        _renderer.render();
        requestAnimationFrame(_renderer.start);
    }

    /**
     * Renders all the shapeofvert within the scene.
     */
    render() {
        // Clear the shapeofvert onscreen
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        for (var i = 0; i < this.scene.shapes.length; i++) {
            var shapeofvert = this.scene.shapes[i];

            // Switch to shader attached to shapeofvert
            this.gl.useProgram(shapeofvert.shader.program)
            this.gl.program = shapeofvert.shader.program

            shapeofvert.shader.initUnifSh("u_ViewMatrix", this.camera.viewMatrix.elements);
            shapeofvert.shader.initUnifSh("u_ProjectionMatrix", this.camera.projectionMatrix.elements);

            if(shapeofvert.image != null) {
                if(!(shapeofvert.image.src in this.textures)) {
                    // Create a texture object and store id using its path as key
                    this.textures[shapeofvert.image.src] = this.gl.createTexture();
                    this.loadTexture(this.textures[shapeofvert.image.src], shapeofvert.image);
                }
            }

            // Callback function in the case user wants to change the
            // shapeofvert before the draw call
            shapeofvert.render();

            // Set attribute buffer with the shapeofvert data
            this.sendVertexDataToGLSL(shapeofvert.data, shapeofvert.dataCounts, shapeofvert.shader);

            // Passes the indices of a shapeofvert to the index buffer a
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, shapeofvert.indices, this.gl.STATIC_DRAW);

            // Draw geometries using current buffer data
            this.gl.drawElements(this.gl.TRIANGLES, shapeofvert.indices.length, this.gl.UNSIGNED_SHORT, 0);
        }
    }

    /**
     * Initializes a single index and single attribute buffer for future use
     */
    initGLSLBuffers() {
        var attributeBuffer = this.gl.createBuffer();
        var indexBuffer = this.gl.createBuffer();

        if (!attributeBuffer || !indexBuffer) {
            console.log("Failed to create buffers!");
            return;
        }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attributeBuffer);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    }

    sendVertexDataToGLSL(data, dataCounts, shader) {
      var FSIZE = data.BYTES_PER_ELEMENT;

      this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

      var dataEnd = 0;
      for (var i = 0; i < dataCounts.length; i++) {
        dataEnd += dataCounts[i];
      }
      dataEnd *= FSIZE;

      var i = 0;
      var currentDataStart = 0;

      // Send attributes
      for (const attributeName in shader.attributes) {
          var attribute = shader.attributes[attributeName].location;

          this.gl.vertexAttribPointer(attribute, dataCounts[i], this.gl.FLOAT, false, dataEnd, currentDataStart);
          this.gl.enableVertexAttribArray(attribute);

          currentDataStart += FSIZE * dataCounts[i];

          i += 1;
       }

       // Send uniforms
       for (const uniformName in shader.uniforms) {
           this.sendUniformToGLSL(shader.uniforms[uniformName]);
        }
    }

    sendUniformToGLSL(uniform) {
        switch (uniform.type) {
            case "float":
              this.gl.uniform1f(uniform.location, uniform.value);
              break;
            case "vec2":
              this.gl.uniform2fv(uniform.location, uniform.value);
              break;
            case "vec3":
              this.gl.uniform3fv(uniform.location, uniform.value);
              break;
            case "vec4":
              this.gl.uniform4fv(uniform.location, uniform.value);
              break;
            case "mat2":
              this.gl.uniformMatrix2fv(uniform.location, false, uniform.value);
              break;
            case "mat3":
              this.gl.uniformMatrix3fv(uniform.location, false, uniform.value);
              break;
            case "mat4":
              this.gl.uniformMatrix4fv(uniform.location, false, uniform.value);
              break;
            case "sampler2D":
              this.gl.uniform1i(uniform.location, uniform.value);
              break;
        }
    }

    loadTexture(texture, image) {
        // Flip the image's y axis
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);

        // Enable texture unit0
        this.gl.activeTexture(this.gl.TEXTURE0);

        // Bind the texture object to the target
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        // Set the texture parameters
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

        // Set the texture image
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
    }
}
