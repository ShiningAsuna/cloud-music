define(function(){

  /**
   * 将数字补齐0至某一位数
   * @param {Number} num 要补位的整数数字
   * @param {Number} digit 要补至的位数
   * @returns 返回一个固定位数的字符串
   */
  function addZero(num, digit) {
    digit = digit || 2;                       //默认补到两位
    var numStr = num.toString();
    for(var i = numStr.length; i<digit; i++){
      numStr = "0" + numStr;
    }
    return numStr;
  }

  /**
   * 将秒转换为分钟加秒
   * @param {Number} seconds 秒数
   */
  function secondToMinuteSecond(seconds){
    let minute = addZero(parseInt(seconds / 60), 2);
    let second = addZero(parseInt(seconds % 60), 2);
    return minute + ':' + second;
  }

  return {
    secondToMinuteSecond
  };
});