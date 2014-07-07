window.Rayc = {
  init: function(mapCanvasSel, viewportCanvasSel) {
    console.log("init");

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

      this.mapCanvasElem = document.querySelector(mapCanvasSel);
      this.mapRCanvas = new RCanvas(this.mapCanvasElem, '#eee', this.rMap.width * RConst.kBlockSize, this.rMap.height * RConst.kBlockSize);

      this.viewportCanvasElem = document.querySelector(viewportCanvasSel);
      this.viewportRCanvas = new RCanvas(this.viewportCanvasElem, 'black', RConst.kViewportWidth, RConst.kViewportHeight);

      this.rWorld = new RWorld(this.mapRCanvas, this.rMap);
      this.viewportCanvasElem.width = RConst.kViewportWidth;
      this.viewportCanvasElem.height = RConst.kViewportHeight;

      this.rPlayer = new RPlayer(
        this.mapRCanvas,
        this.rMap,
        64, 128,
        112
      );
      this.rViewport = new RViewport(
        this.mapRCanvas,
        this.viewportRCanvas,
        this.rPlayer,
        this.rMap
      );

      this.tick();
    };

    this.init();
  },
};
