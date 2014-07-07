window.RMap = function(mapName) {
  this.isSolidBlockCoords = function(x, y) {
    var index = (y * this.width) + x;
    return this.solidityMap[index];
  };

  this.isSolidPxCoords = function(xPx, yPx) {
    return this.isSolidBlockCoords(Math.floor(xPx / RConst.kBlockSize), Math.floor(yPx / RConst.kBlockSize));
  };

  this.distanceToIntersect = function(x, y, radAngle) {
    var rayLength = 1;
    while(rayLength < this.maxRayLength) {
      //  calculate next block
      var nextX = x + (rayLength * Math.sin(radAngle));
      var nextY = y + (rayLength * Math.cos(radAngle));
      if (this.isSolidPxCoords(nextX, nextY)) {

        if (false) {
          // Ray max extend into a solid block; cut it off at the edges
          var destBlockLeft = Math.floor(nextX / RConst.kBlockSize) * RConst.kBlockSize;
          var destBlockTop  = Math.floor(nextY / RConst.kBlockSize) * RConst.kBlockSize;
          var rayHitX, rayHitY;
          if (x < nextX) {
            rayHitX = destBlockLeft;
          } else {
            rayHitX = destBlockLeft + RConst.kBlockSize;
          };
          if (y < nextY) {
            rayHitY = destBlockTop;
          } else {
            rayHitY = destBlockTop + RConst.kBlockSize;
          };
          rCanvas.drawPoint(rayHitX, rayHitY);

          return distanceBetweenPoints(x, y, rayHitX, rayHitY);
        } else {
          // lazy/easy way
          return RMath.distanceBetweenPoints(x, y, nextX, nextY);
        };
      };

      rayLength += 1 ; // would prefer to use RConst.kBlockSize / 2;
    };

    throw 'Unable to find an intersection';
  };


  this.init = function() {
    /**
     *  Maps are defined with arrays like this:
     *  [
     *    '111',
     *    '101',
     *    '111'
     *  ]
     *  Blocks containing '1' are walls, everything else is floor.
     *
     *  This function transforms that structure into an array with one boolean per block:
     *  [
     *    true, true, true,
     *    true, false, true,
     *    true, true, true
     *  ]
     *
     */
    var rawMapData = RMaps[mapName]
    this.solidityMap = rawMapData.map(function(row) {
      return row.replace(/\s/g, '').split('').map(function(elem) {
        return elem == '#';
      });
    }).reduce(function(acc, elem) {
      return acc.concat(elem);
    }, [])

    this.height = rawMapData.length;
    this.width = this.solidityMap.length / this.height;
    this.maxRayLength = Math.ceil(Math.sqrt(Math.pow(this.height, 2) + Math.pow(this.width, 2))) * RConst.kBlockSize;
    console.log('World is', this.width, 'x', this.height, 'so ray length is', this.maxRayLength);
  };

  this.init();
};

window.RMaps = {
  demo1: [
    "# # # # # # # # # # # #",
    "# # - - - - - - - - - #",
    "# - # - - - # - - - - #",
    "# - - - - - - - - - - #",
    "# - - - - - - - - - - #",
    "# - - - - - - - - - - #",
    "# - - - - - - - - - - #",
    "# - - - - - - - - - - #",
    "# - - - - - - - - - - #",
    "# - # - - - - - - - - #",
    "# - # - - - - - - - - #",
    "# # # # # # # # # # # #",
  ]
};
