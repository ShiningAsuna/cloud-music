require.config({
  paths: {
    "jquery": "../lib/jquery-3.5.1",
    "slider": "slider",
    "banner": "banner",
    "throttle": "throttle",
    "api": "api",
    "lyric": "lyric",
    "timing": "timing"
  }
});

define(['jquery', 'slider', 'timing'], function($, Slider, timing){

  let audio = $('audio')[0];

  //初始化进度条
  let progress = new Slider({
    line: $('.progress .line'),
    lineDone: $('.progress .line-done'),
    slider: $('.progress .slider'),
    axis: 'x',
    onslide: function(per){
      if(audio.readyState == 4){
        audio.currentTime = audio.duration * per;
      };
    }
  });

  //初始化音量条
  new Slider({
    line: $('.volume-wrap .line'),
    lineDone: $('.volume-wrap .line-done'),
    slider: $('.volume-wrap .slider'),
    axis: 'y',
    onslide: function(per){
      if(audio.readyState == 4){
        audio.volume = per;
      };
    }
  });

  //点击音量事件
  $('.volume i').on('click', function(){
    $('.volume-wrap').toggle();
    return false;
  });

  $(document).on('click', function(){
    $('.volume-wrap').hide();
  });

  //控制开始与暂停
  $('.controls').on('click', '.icon-start', function(){
    audio.play();
    $(this).removeClass('icon-start').addClass('icon-pause');
  });

  $('.controls').on('click', '.icon-pause', function(){
    audio.pause();
    $(this).removeClass('icon-pause').addClass('icon-start');
  });

  //播放进行时事件
  audio.ontimeupdate = function(){

    //当前时间百分比
    let percent = this.currentTime / this.duration;
    //修改当前时间
    $('footer .time .curtime').html(timing.secondToMinuteSecond(this.currentTime));

    //设置进度条宽度
    let allWidth = progress.$line.width();
    progress.$lineDone.css('width', percent * allWidth + 'px');

    //设置滑块位置
    let sliderWidth = progress.$slider.width() / 2;
    progress.$slider.css('left', percent * allWidth - sliderWidth + 'px');
  }

});