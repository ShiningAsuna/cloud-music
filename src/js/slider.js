define(['jquery'], function($){

  class Slider {
    constructor(opt){
      opt = $.extend({
          line: $('.line'),
          lineDone: $('.line-done'),
          slider: $('.slider'),
          axis: 'x',
          dataAttr: 'percent',
          onslide: function(){}
        }, opt);
      this.opt = opt;
      this.$line = opt.line;
      this.$lineDone = opt.lineDone;
      this.$slider = opt.slider;
      this.axis = opt.axis;
      this.dataAttr = opt.dataAttr;
      this.onslide = opt.onslide;

      this.init();
    }

    init(){
      this.bind();
    }

    bind(){
      //让已完成的进度部分取消监听事件，以防事件冒泡
      this.$lineDone.css('pointer-events', 'none');
      if(this.axis === 'y'){
        this.bindYEve();
      } else{
        this.bindXEve();
      }
    }

    bindXEve(){
      let _this = this;
      //元素总宽度
      let lWidth = _this.$line.width();
      //滑块宽度
      let sWidth = _this.$slider.width();

      this.$slider.on('mousedown', function(eve){
        let x = eve.offsetX;
        //进度条距离页面左边的距离
        let lLeft = _this.$line.offset().left;

        //document移动事件
        $(document).on('mousemove.x', function(event){
          let percent;
          //增加边界限定
          if(event.pageX - lLeft - x < 0){
            _this.$slider.css('left', 0);
            _this.$lineDone.css('width', 0);
            _this.$line.attr('data-' + _this.dataAttr, 0);
            percent = 0;
          } else if(event.pageX - lLeft - x > lWidth - sWidth/2) {
            _this.$slider.css('left', lWidth - sWidth/2 + 'px');
            _this.$lineDone.css('width', lWidth);
            _this.$line.attr('data-' + _this.dataAttr, 100);
            percent = 100;
          } else {
            let ldWidth = event.pageX - lLeft - x + sWidth/2;
            percent = ldWidth / lWidth;
            _this.$slider.css('left', event.pageX - lLeft - x + 'px');
            _this.$lineDone.css('width', ldWidth + 'px');
            _this.$line.attr('data-' + _this.dataAttr, (percent * 100).toFixed(1));
          }
          _this.onslide(percent);
          return false;
        });

        //松开鼠标
        $(document).on('mouseup', function(){
          $(document).off('mousemove.x');
        });
        return false;
      });

      //防止滑块元素点击事件冒泡
      this.$slider.on('click', function(){
        return false;
      });

      //进度条点击事件
      this.$line.on('click', function(event){
        let percent = event.offsetX / lWidth;
        _this.$slider.css('left', percent * lWidth - sWidth/2);
        _this.$lineDone.css('width', percent * lWidth);
        $(this).attr('data-' + _this.dataAttr, (percent * 100).toFixed(1));
        _this.onslide(percent);
      });
    }

    bindYEve(){
      let _this = this;
      //元素总宽度
      let lHeight = _this.$line.height();
      //滑块宽度
      let sHeight = _this.$slider.height();

      this.$slider.on('mousedown', function(eve){
        let y = eve.offsetY;
        //进度条距离页面顶部的距离
        let lTop = _this.$line.offset().top;

        //document移动事件
        $(document).on('mousemove.y', function(event){
          let percent;
          //此时滑块应该所处位置的top值
          let sTop = event.pageY - lTop - y;

          let sBottom = lHeight - sTop - sHeight;
          // console.log(sBottom)
          //增加边界限定
          if(sBottom < 0){
            _this.$slider.css('bottom', 0);
            _this.$lineDone.css('height', 0);
            _this.$line.attr('data-' + _this.dataAttr, 0);
            percent = 0;
          } else if(sBottom > lHeight - sHeight/2) {
            _this.$slider.css('bottom', lHeight - sHeight/2 + 'px');
            _this.$lineDone.css('height', lHeight);
            _this.$line.attr('data-' + _this.dataAttr, 100);
            percent = 100;
          } else {
            let ldHeight = sBottom + sHeight / 2;
            percent = ldHeight / lHeight;
            _this.$slider.css('bottom', sBottom + 'px');
            _this.$lineDone.css('height', sBottom + sHeight / 2 + 'px');
            _this.$line.attr('data-' + _this.dataAttr, (percent * 100).toFixed(1));
          }
          _this.onslide(percent);
          return false;
        });

        //松开鼠标
        $(document).on('mouseup', function(){
          $(document).off('mousemove.y');
        });
        return false;
      });

      //防止滑块元素点击事件冒泡
      this.$slider.on('click', function(){
        return false;
      });

      this.$line.on('click', function(event){
        let num = lHeight - event.offsetY;
        let percent = num / lHeight;
        _this.$slider.css('bottom', percent * lHeight - sHeight/2);
        _this.$lineDone.css('height', percent * lHeight);
        $(this).attr('data-' + _this.dataAttr, (percent * 100).toFixed(1));
        _this.onslide(percent);
      });
    }
  } 

  return Slider;
});