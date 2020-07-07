define(function(){

  let throttle = function(fn, timeout=500){
    //定时器标记
    let timer;
    //是否是第一次执行
    let first = true;
    
    return function(){
      //如果是第一次执行
      if(first){
        fn.call(this, ...[arguments]);
        first = false;
        return;
      }
      
      //检查是否有定时器，如果有，立刻退出
      if(timer){return;}

      timer = setTimeout(()=>{
        //如果没有定时器任务在进行，开启定时器
        //TODO arguments获取？？
        fn.call(this, ...[arguments]);
        timer = null;
      }, timeout)
    }
  }

  let debounce = function(fn, timeout=500){
    let timer;
    return function(){
      //每次执行先清除定时器
      clearTimeout(timer);
      
      timer = setTimeout(()=>{
        //开启定时器
        fn.call(this, ...[arguments]);
      }, timeout);

    }
  }

  return {
    throttle,
    debounce
  }
});