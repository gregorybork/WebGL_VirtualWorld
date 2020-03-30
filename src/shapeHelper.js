
class Helper {

  constructor(shader) {
      this.vertices = [];
      this.shader = shader;
  }

  //render new after movement
  render() {
      return
  }

  /**
   * Interleaves the geometry's vertices for optimal performance. MUST be called
   * after any vertex is modified/constructed in a Geometry's vertices array.
   */
  interleaveVertices() {
        var interleavedData = interleaveVertexData(this.vertices);
        this.data       = interleavedData[0];
        this.indices    = interleavedData[1];
        this.dataCounts = interleavedData[2];
  }
}
