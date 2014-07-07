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

    //  Draw edges of field of view
    rCanvas.context.strokeStyle = 'lightblue';
    var halfFOV = RConst.kFieldOfViewDegrees / 2;
    var leftFOVAngle = (360 + (this.viewAngle - halfFOV)) % 360;
    var rightFOVAngle = (360 + (this.viewAngle + halfFOV)) % 360;
    rCanvas.drawVector(this.x, this.y, RMath.deg2rad(leftFOVAngle), rMap.distanceToIntersect(this.x, this.y, RMath.deg2rad(leftFOVAngle)));
    rCanvas.drawVector(this.x, this.y, RMath.deg2rad(rightFOVAngle), rMap.distanceToIntersect(this.x, this.y, RMath.deg2rad(rightFOVAngle)));

    //  Draw ray
    rCanvas.context.strokeStyle = 'red';
    rCanvas.drawVector(this.x, this.y, RMath.deg2rad(this.viewAngle), rayLength);
  };

  this.tick = function() {
    var rotateIncrement = this.keyMap[RConst.kKeyShift] ? RConst.kIncrementRotateFast : RConst.kIncrementRotate;
    if (this.keyMap[RConst.kKeyLeft]) {
      this.viewAngle = (360 + (this.viewAngle + rotateIncrement)) % 360;
    } else if (this.keyMap[RConst.kKeyRight]) {
      this.viewAngle = (360 + (this.viewAngle - rotateIncrement)) % 360;
    };

    var nextX, nextY;
    var moveIncrement = this.keyMap[RConst.kKeyShift] ? RConst.kIncrementMoveFast : RConst.kIncrementMove;
    if (this.keyMap[RConst.kKeyUp]) {
      nextX = this.x + moveIncrement * Math.sin(RMath.deg2rad(this.viewAngle));
      nextY = this.y + moveIncrement * Math.cos(RMath.deg2rad(this.viewAngle));
    } else if (this.keyMap[RConst.kKeyDown]) {
      nextX = this.x - moveIncrement * Math.sin(RMath.deg2rad(this.viewAngle));
      nextY = this.y - moveIncrement * Math.cos(RMath.deg2rad(this.viewAngle));
    };

    // Collision detection
    if (nextX && nextY && !rMap.isSolidPxCoords(nextX, nextY)) {
      this.x = nextX;
      this.y = nextY;
    }
  };
};
