require.config({
  paths: {
    "jquery": "../lib/jquery-3.5.1",
    "slider": "slider",
    "banner": "banner",
    "throttle": "throttle"
  }
});

define(['jquery', 'slider', 'banner'], function($, Slider, Banner){

  class Index{
    constructor(){
      this.init();
    }

  }

  //初始化进度条
  new Slider({
    line: $('.progress .line'),
    lineDone: $('.progress .line-done'),
    slider: $('.progress .slider'),
    axis: 'x',
    onslide: function(per){
      console.log(per);
    }
  });

  //初始化音量
  new Slider({
    line: $('.volume-wrap .line'),
    lineDone: $('.volume-wrap .line-done'),
    slider: $('.volume-wrap .slider'),
    axis: 'y',
    onslide: function(per){
      console.log(per);
    }
  });

  //从接口获取banner数据并返回，渲染banner
  $.ajax({
    url: 'api/banner?type=0',
    type: 'get',
    dataType: 'json',
    success: function(res){
      if(res.code == 200){
        //渲染图片
        let html = res.banners.map( ele => {
          return `<a data-targetId="${ele.targetId}"><img src="${ele.imageUrl}" alt=""></a>`
        }).join('');
        $(html).appendTo('.img_wrap');

        //设置列表
        for(let i = 0; i<res.banners.length; i++){
          $(`<li class="list-item ${i===0?'active':''}"></li>`).appendTo('.list-wrap');
        }

        new Banner({
          imgWrap: $('.img_wrap'),
          leftBtn: $('.btn-left'),
          rightBtn: $('.btn-right'),
          listWrap: $('.list-wrap'),
          imgItems: $('.img_wrap a'),
          listItems: $('.list-wrap .list-item'),
          effect: 'roll',
          onswitch: function(index){
            $('.list-wrap .list-item').removeClass('active').eq(index).addClass('active');
          }
        });
      }
    }
  });
  
});