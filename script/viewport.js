window.RViewport = function(mapRCanvas, viewportRCanvas, rPlayer, rMap) {
  var halfFieldOfViewDegrees = RConst.kFieldOfViewDegrees / 2;
  this.draw = function() {
    mapRCanvas.context.strokeStyle = 'lightblue';
    viewportRCanvas.context.strokeStyle = 'white';

    var minAngle = rPlayer.viewAngle - halfFieldOfViewDegrees;
    for(var x = 0; x < RConst.kViewportWidth; x++) {
      var angle = minAngle + ((x / RConst.kViewportWidth) * RConst.kFieldOfViewDegrees);

      var rayLength = rMap.distanceToIntersect(rPlayer.x, rPlayer.y, RMath.deg2rad(angle));

      //  Draw the vector in the top-down view
      mapRCanvas.drawVector(rPlayer.x, rPlayer.y, RMath.deg2rad(angle), rayLength);

      //  Draw the column in the viewport
      var wallHeight = (1 - (rayLength / rMap.maxRayLength)) * RConst.kViewportHeight;
      var wallY = RConst.kViewportHeight / 2 - wallHeight / 2;
      var wallColor = Math.floor((1 - (rayLength / rMap.maxRayLength)) * 255);
      viewportRCanvas.context.strokeStyle = 'rgb(' + [wallColor, wallColor, wallColor].join(',') + ')';
      viewportRCanvas.drawLine(RConst.kViewportWidth - x, wallY, RConst.kViewportWidth - x, RConst.kViewportHeight - wallY);
    };
  };
};
