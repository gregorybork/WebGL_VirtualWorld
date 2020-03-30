
class HelperSh {

    constructor(gl, vShader, fShader) {
        this.gl = gl;

        this.program = createShaderProgram(this.gl, vShader, fShader)
        this.uniforms = {};
        this.attributes = {};
    }
    newAttriSh(attributeName) {
      //var a_position = gl.getattriblocation(gl.program, 'a_position')
        var location = this.gl.getAttribLocation(this.program, attributeName);
        this.attributes[attributeName] = {"location": location};
    }

    newUnifSh(uniformName, type, value) {
        var location = this.gl.getUniformLocation(this.program, uniformName);
        this.uniforms[uniformName] = {"type": type, "location": location, "value": value};
    }

    initUnifSh(uniformName, value) {
        if(uniformName in this.uniforms) {
            this.uniforms[uniformName].value = value;
        }
    }
}
