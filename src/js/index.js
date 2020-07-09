require.config({
  paths: {
    "jquery": "../lib/jquery-3.5.1",
    "slider": "slider",
    "banner": "banner",
    "throttle": "throttle",
    "api": "api",
    "lyric": "lyric"
  }
});

define(['jquery', 'slider', 'lyric'], function($, Slider){

  //初始化进度条
  new Slider({
    line: $('.progress .line'),
    lineDone: $('.progress .line-done'),
    slider: $('.progress .slider'),
    axis: 'x',
    onslide: function(per){
      // console.log(per);
    }
  });

  //初始化音量条
  new Slider({
    line: $('.volume-wrap .line'),
    lineDone: $('.volume-wrap .line-done'),
    slider: $('.volume-wrap .slider'),
    axis: 'y',
    onslide: function(per){
      // console.log(per);
    }
  });

  //点击音量事件
  $('.volume i').on('click', function(){
    $('.volume-wrap').toggle();
  });

});