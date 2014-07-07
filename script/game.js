window.Rayc = {
  init: function() {
    this.draw = function() {
      this.mapRCanvas.clear();
      this.viewportRCanvas.clear();

      this.rPlayer.tick();

      this.rWorld.draw();
      this.rViewport.draw();
      this.rPlayer.draw();
    };

    this.tick = function() {
      if (this.lastTick) {
//               if (Math.random() * 100 < 1)  {
//                 document.title = Math.floor(1000 / ((new Date) - this.lastTick));
//               }
      };
      this.lastTick = new Date;
      this.draw();

      setTimeout(function() {
        requestAnimationFrame(this.tick.bind(this));
      }.bind(this), 0);
    };

    this.init = function() {
      this.rMap = new RMap('demo1');

      this.mapRCanvas = new RCanvas(
        _name = 'rayc-map',
        _backgroundColor = '#eee',
        _width = this.rMap.width * RConst.kBlockSize,
        _height = this.rMap.height * RConst.kBlockSize
      );

      this.viewportRCanvas = new RCanvas(
        'rayc-viewport',
        'black',
        RConst.kViewportWidth,
        RConst.kViewportHeight
      );

      this.rWorld = new RWorld(this.mapRCanvas, this.rMap);

      this.rPlayer = new RPlayer(
        this.mapRCanvas,
        this.rMap,
        64, 128, // starting position in pixels TODO: should be given in blocks
        112 // initial view angle
      );
      this.rViewport = new RViewport(
        this.mapRCanvas,
        this.viewportRCanvas,
        this.rPlayer,
        this.rMap,
        'img/background.png'
      );

      this.tick();
    };

    this.init();
  },
};
