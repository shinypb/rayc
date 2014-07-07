var RCanvas = function(canvasId, backgroundColor, width, height) {

  var canvasElem = document.createElement('canvas');
  canvasElem.id = canvasId;
  document.body.appendChild(canvasElem);

  this.width = width;
  this.height = height;
  canvasElem.width = width;
  canvasElem.height = height;

  var context = canvasElem.getContext('2d');
  this.context = context;
  this.elem = canvasElem;

  this.backgroundColor = backgroundColor;

  this.clear = function() {
    this.fillRect(0, 0, this.width, this.height, this.backgroundColor);
  };

  this.fillRect = function(x, y, h, w, color) {
    if (color) {
      context.fillStyle = color;
    };
    context.fillRect(x, y, h, w);
  };

  this.drawLine = function(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();
  };

  this.drawVector = function(startX, startY, radAngle, length) {
    var stopX = startX + (length * Math.sin(radAngle));
    var stopY = startY + (length * Math.cos(radAngle));

    this.drawLine(startX, startY, stopX, stopY);
  };


  this.drawPoint = function(x, y) {
    context.beginPath();
    context.arc(x, y, RConst.kPointRadius, 0, 2 * Math.PI, false);
    context.fillStyle = RConst.kPointFill;
    context.fill();

    context.beginPath();
    context.arc(x, y, 1, 0, 2 * Math.PI, false);
    context.lineWidth = 1;
    context.strokeStyle = RConst.kPointStroke;
    context.stroke();
  };
};
