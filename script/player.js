var RPlayer = function(rCanvas, rMap, startX, startY, startingViewAngle) {
  this.x = startX;
  this.y = startY;
  this.viewAngle = startingViewAngle;

  this.keyMap = {};

  window.addEventListener('keydown', function(e) {
    this.keyMap[e.keyCode] = true;
  }.bind(this));
  window.addEventListener('keyup', function(e) {
    this.keyMap[e.keyCode] = false;
  }.bind(this));

  this.draw = function() {
    //  Draw player
    rCanvas.drawPoint(this.x, this.y);

    //  See what ray hits
    var rayLength = rMap.distanceToIntersect(this.x, this.y, RMath.deg2rad(this.viewAngle));

    //  Draw ray
    rCanvas.context.strokeStyle = 'red';
    rCanvas.drawVector(this.x, this.y, RMath.deg2rad(this.viewAngle), rayLength);
  };

  this.tick = function() {
    if (this.keyMap[RConst.kKeyLeft]) {
      this.viewAngle = (360 + (this.viewAngle + RConst.kIncrementRotate)) % 360;
    } else if (this.keyMap[RConst.kKeyRight]) {
      this.viewAngle = (360 + (this.viewAngle - RConst.kIncrementRotate)) % 360;
    };

    if (this.keyMap[RConst.kKeyUp]) {
      this.x += RConst.kIncrementMove * Math.sin(RMath.deg2rad(this.viewAngle));
      this.y += RConst.kIncrementMove * Math.cos(RMath.deg2rad(this.viewAngle));
    } else if (this.keyMap[RConst.kKeyDown]) {
      this.x -= RConst.kIncrementMove * Math.sin(RMath.deg2rad(this.viewAngle));
      this.y -= RConst.kIncrementMove * Math.cos(RMath.deg2rad(this.viewAngle));
    };
  };
};
