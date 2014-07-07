window.RViewport = function(mapRCanvas, viewportRCanvas, rPlayer, rMap, backgroundImageName) {
  var halfFieldOfViewDegrees = RConst.kFieldOfViewDegrees / 2;
  this.draw = function() {
    if (this.backgroundImage) {
      viewportRCanvas.context.drawImage(this.backgroundImage, 0, 0);
    };

    mapRCanvas.context.strokeStyle = 'lightblue';
    viewportRCanvas.context.strokeStyle = 'white';

    var minAngle = rPlayer.viewAngle - halfFieldOfViewDegrees;
    for(var x = 0; x < RConst.kViewportWidth; x++) {
      var angle = minAngle + ((x / RConst.kViewportWidth) * RConst.kFieldOfViewDegrees);

      var rayLength = rMap.distanceToIntersect(rPlayer.x, rPlayer.y, RMath.deg2rad(angle));

      //  Draw the vector in the top-down view
      mapRCanvas.drawVector(rPlayer.x, rPlayer.y, RMath.deg2rad(angle), rayLength);

      //  Draw the column in the viewport
      var maxHeight = RConst.kViewportHeight * 1.5;
      var fractionOfMaximumDistance = 1 - (rayLength / rMap.maxRayLength);
      var wallHeight = Math.pow(maxHeight, fractionOfMaximumDistance);

      //  The farther the wall is from us, the darker it should be
      var wallColor = Math.floor(fractionOfMaximumDistance * fractionOfMaximumDistance * 255);
      viewportRCanvas.context.strokeStyle = 'rgb(' + [wallColor, wallColor, wallColor].join(',') + ')';

      var wallY = (RConst.kViewportHeight / 2 - wallHeight / 2);
      viewportRCanvas.drawLine(RConst.kViewportWidth - x, wallY, RConst.kViewportWidth - x, RConst.kViewportHeight - wallY);
    };
  };

  this.init = function() {
    if(backgroundImageName) {
      this.backgroundImage = new Image();
      this.backgroundImage.src = backgroundImageName;
    }
  };

  this.init();

};
