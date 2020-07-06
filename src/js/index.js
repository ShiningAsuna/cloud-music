require.config({
  paths: {
    "jquery": "../lib/jquery-3.5.1",
    "slider": "slider"
  }
});

define(['jquery', 'slider'], function($, slider){
  //初始化进度条
  let proSlider = new slider.element({
    line: $('.progress .line'),
    lineDone: $('.progress .line-done'),
    slider: $('.progress .slider'),
    axis: 'x',
    onslide: function(per){
      console.log(per);
    }
  });
  proSlider.init();

  //初始化音量
  let volSlider = new slider.element({
    line: $('.volume-wrap .line'),
    lineDone: $('.volume-wrap .line-done'),
    slider: $('.volume-wrap .slider'),
    axis: 'y',
    onslide: function(per){
      console.log(per);
    }
  });
  volSlider.init();

  
});