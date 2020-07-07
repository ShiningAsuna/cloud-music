define(['jquery', 'throttle'], function($, {throttle}){

  /**
   * @class Banner 轮播图组件类
   * @param {Object} opt 配置项信息
   * @description 配置项可配置属性说明
   *    imgWrap: 必选：装有图片的容器，jquery对象
   *    leftBtn: 可选：左按钮，用于图片向左滚动，jquery对象
   *    rightBtn: 可选：右按钮，用于图片向右滚动，jquery对象
   *    listWrap: 可选：装有按钮列表的容器，用于滚动到指定图片和显示当前图片信息，jquery对象
   *    imgItems: 必选：所有图片的集合，jquery对象
   *    listItems: 可选：所有列表按钮的集合，jquery对象
   *    hasBtn: 可选，默认为true：是否设置按钮
   *    hasList: 可选，默认为true：是否设置列表
   *    autoplay: 可选，默认为true：是否自动播放
   *    autoPlayTime: 可选，默认为3000：自动播放间隔
   *    effect: 可选，默认为'roll'滚动，可设置为'show'，直接出现不滚动
   *    throttle: 可选，默认为true，是否设置节流
   *    throttleTime: 可选，默认为600，节流间隔时间
   *    onswitch: 可选：当图片切换时的回调函数，参数为切换后图片的索引
   */
  class Banner {

    constructor(opt){
      
      opt = $.extend({
          imgWrap: $('.img-wrap'),
          leftBtn: $('.btn-left'),
          rightBtn: $('.btn-right'),
          listWrap: $('.list-wrap'),
          imgItems: $('.img-wrap a'),
          listItems: $('.list-wrap .list-item'),
          autoPlay: true,
          autoPlayTime: 3000,
          hasList: true,
          hasBtn: true,
          effect: 'roll',
          throttle: true,
          throttleTime: 500,
          onswitch: function(){}
        }, opt);

      this.opt = opt;
      this.$imgWrap = opt.imgWrap;
      this.$leftBtn = opt.leftBtn;
      this.$rightBtn = opt.rightBtn;
      this.$listWrap = opt.listWrap;
      this.$imgItems = opt.imgItems;
      this.$listItems = opt.listItems;
      this.autoPlay = opt.autoPlay;
      this.autoPlayTime = opt.autoPlayTime;
      this.hasList = opt.hasList;
      this.hasBtn = opt.hasBtn;
      this.effect = opt.effect;
      this.throttle = opt.throttle;
      this.throttleTime = opt.throttleTime;
      this.onswitch = opt.onswitch;
      this.size = this.$imgItems.length;

      this.imgWidth = this.$imgItems.width();
      this.index = 0; 
    
      this.init();
    }

    init(){
      this.render();
      this.bind();
    }

    render(){
      //复制第一张图用于无缝轮播
      let $first = this.$imgItems.eq(0).clone();
      $first.appendTo(this.$imgWrap);
      this.$imgItems.push($first);
      //设置容器的宽度
      this.$imgWrap.css('width', this.imgWidth * this.$imgItems.length);
    }

    bind(){
      if(this.hasBtn){
        this.bindBtn();
      }
      if(this.hasList){
        this.bindList();
      } 
      if(this.autoPlay){
        this.bindAutoplay();
      }
    }

    bindBtn(){
      let _this = this; 

      //是否有节流
      if(this.throttle){
         //左键点击事件
        this.$leftBtn.on('click', throttle(function(){
          _this.moveLeft();
        }, this.throttleTime));
         //右键点击事件
        this.$rightBtn.on('click', throttle(function(){          
          _this.moveRight();
        }, this.throttleTime));
      } else {
        this.$leftBtn.on('click', function(){
          _this.moveLeft();
        });
         //右键点击事件
        this.$rightBtn.on('click', function(){          
          _this.moveRight();
        });
      }                                 
    }

    bindList(){
      var _this = this;
      this.$listItems.each((index, node) => {
        $(node).on('click', function(){
          if(_this.index === _this.$imgItems.length - 1){        //如果点击list时，此时是图片最后一张，应先设置返回第一张图
            _this.$imgWrap.css('left', 0);             //先将left定位到第一张（和最后一张相同）
          }
          _this.moveTo(index);                               //调用方法跳转至对应图片
        });
      });
    }

    bindAutoplay(){
      var _this = this;
      this.autoplayClear = setInterval(() => {               //定时器自动向右滚动播放
        _this.moveRight();
      }, _this.autoPlayTime);

      this.$imgWrap.parent().on('mouseover', function(){         //鼠标进入暂时停止
        // console.log('in');
        clearInterval(_this.autoplayClear);
      });

      this.$leftBtn.on('mouseover', function(){         //鼠标进入暂时停止
        // console.log('in');
        clearInterval(_this.autoplayClear);
      });

      this.$rightBtn.on('mouseover', function(){         //鼠标进入暂时停止
        // console.log('in');
        clearInterval(_this.autoplayClear);
      });


      this.$imgWrap.parent().on('mouseout', function(){          //鼠标移出继续开启计时
        // console.log('out');
        clearInterval(_this.autoplayClear);
        _this.autoplayClear = setInterval(() => {
          _this.moveRight();
        }, _this.autoPlayTime);
      });

      this.$leftBtn.on('mouseout', function(){          //鼠标移出继续开启计时
        // console.log('out');
        clearInterval(_this.autoplayClear);
        _this.autoplayClear = setInterval(() => {
          _this.moveRight();
        }, _this.autoPlayTime);
      });

      this.$rightBtn.on('mouseout', function(){          //鼠标移出继续开启计时
        // console.log('out');
        clearInterval(_this.autoplayClear);
        _this.autoplayClear = setInterval(() => {
          _this.moveRight();
        }, _this.autoPlayTime);
      });
    }

    moveRight(){
      switch(this.effect){
        case 'roll':
          this.moveRightRoll();
          break;
        case 'show':
          this.moveRightShow();
          break;
        default: 
          this.moveRightRoll();
      }
    }

    moveRightRoll(){
      if(this.index === this.$imgItems.length-1) {              //如果是最后一张
        this.$imgWrap.css('left', 0);                  //先将left定位到第一张（和最后一张相同）
        this.moveTo(1);                                     //再将图片移动到第二张
      } else {
        let curLeft = -this.index * this.imgWidth;                  //获取当前left值
        this.$imgWrap.animate({left: curLeft - this.imgWidth}, 500);           //终点为当前left值再减500
        this.index++;                                      //移动结束后设置索引
        let newIdx = this.index === this.size? 0 : this.index;
        this.onswitch(newIdx);                               //索引设置结束后执行回调函数
      }
    }

    moveRightShow(){
      if(this.index === this.$imgItems.length-1) {              //如果是最后一张
        this.$imgWrap.css('left', 0);                  //先将left定位到第一张（和最后一张相同）
        this.moveTo(1);                                     //再将图片移动到第二张
      } else {
        let curLeft = -this.index * this.imgWidth;                  //获取当前left值
        this.$imgWrap.css({left: curLeft - this.imgWidth});           //终点为当前left值再减500
        this.index++;                                      //移动结束后设置索引
        let newIdx = this.index === this.size? 0 : this.index;
        this.onswitch(newIdx);                               //索引设置结束后执行回调函数
      }
    }

    moveLeft(){
      switch(this.effect){
        case 'roll':
          this.moveLeftRoll();
          break;
        case 'show':
          this.moveLeftShow();
          break;
        default: 
          this.moveLeftRoll();
      }
    }

    moveLeftRoll(){
      if(this.index === 0) {                                  //如果是第一张
        this.$imgWrap.css('left', -(this.$imgItems.length - 1) * this.imgWidth);              //将left定位到最后一张（和第一张相同）
        this.moveTo(this.$imgItems.length - 2);                                       //再将图片移动到倒数第二张
      } else {
        let curLeft = -this.index * this.imgWidth;
        this.$imgWrap.animate({left: curLeft + this.imgWidth}, 500); 
        this.index--;
        let newIdx = this.index === this.size? 0 : this.index;
        this.onswitch(newIdx);                               //索引设置结束后执行回调函数 
      }
    }

    moveLeftShow(){
      if(this.index === 0) {                                  //如果是第一张
        this.$imgWrap.css('left', -(this.$imgItems.length - 1) * this.imgWidth);              //将left定位到最后一张（和第一张相同）
        this.moveTo(this.$imgItems.length - 2);                                       //再将图片移动到倒数第二张
      } else {
        let curLeft = -this.index * this.imgWidth;
        this.$imgWrap.css({left: curLeft + this.imgWidth}); 
        this.index--;
        let newIdx = this.index === this.size? 0 : this.index;
        this.onswitch(newIdx);                               //索引设置结束后执行回调函数 
      }
    }

    //要将图片移动到哪张，idx从0开始表示第一张图
    moveTo(idx){         
      switch(this.effect){
        case 'roll':
          this.moveToRoll(idx);
          break;
        case 'show':
          this.moveToShow(idx);
          break;
        default: 
          this.moveToRoll(idx);
      }                                                                 
    }

    moveToRoll(idx){
      this.$imgWrap.finish();
      this.$imgWrap.animate({left: -idx * this.imgWidth}, 500); 
      this.index = idx;                       //要将图片移动到哪张
      let newIdx = this.index === this.size? 0 : this.index;
      this.onswitch(newIdx);                               //索引设置结束后执行回调函数
    }

    moveToShow(idx){
      this.$imgWrap.css({left: -idx * this.imgWidth}); 
      this.index = idx;                       //要将图片移动到哪张
      let newIdx = this.index === this.size? 0 : this.index;
      this.onswitch(newIdx);                               //索引设置结束后执行回调函数
    }

  }

  return Banner;
});