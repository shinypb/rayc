var RWorld = function(rCanvas, map) {
  this.drawBlocks = function() {
    for(var i = 0; i < map.solidityMap.length; i++) {
      if (map.solidityMap[i]) {
        var x = i % map.width;
        var y = (i - x) / map.width;
        rCanvas.fillRect(x * RConst.kBlockSize, y * RConst.kBlockSize, RConst.kBlockSize, RConst.kBlockSize, RConst.kBlockColor);
      }
    };
  };

  this.drawGrid = function() {
    rCanvas.context.strokeStyle = RConst.kGridColor;
    if (rCanvas.height != rCanvas.width) {
      throw "drawGrid expects a square canvas";
    };
    for(var i = 0; i < rCanvas.width; i += RConst.kBlockSize) {
      rCanvas.drawLine(i, 0, i, rCanvas.height - 1);
      rCanvas.drawLine(0, i, rCanvas.width - 1, i);
    };
  };

  this.draw = function() {
    if (this.bufferCanvas) {
      rCanvas.context.drawImage(this.bufferCanvas, 0, 0);
      return;
    };

    // Draw the world
    this.drawGrid();
    this.drawBlocks();

    // Copy it to the backing store
    this.bufferCanvas = document.createElement('canvas');
    this.bufferCanvas.height = rCanvas.height;
    this.bufferCanvas.width = rCanvas.width;
    window.bs = this.bufferCanvas;
    var bufferCanvasContext = this.bufferCanvas.getContext('2d');
    bufferCanvasContext.drawImage(rCanvas.elem, 0, 0);
  };

  this.init = function() {
  };

  this.init();
};
