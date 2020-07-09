define(function(){

  class Lyric {
    constructor(str){
      this.source = str;
    }

    toArr(){
      return this.source.split('\n');
    }

    parse(){
      let arr = this.toArr();
      let reg = /\[(\d*\:\d*\.\d*)\]\s*(\S+)/;
      let lyricArr = [];
      for(let i = 0; i<arr.length; i++){
        let res = arr[i].match(reg);
        if(res){
          lyricArr.push({
            time: res[1],
            word: res[2]
          })
        }
      }
      return lyricArr;
    }

    toStrArr(){
      let arr = this.parse();
      return arr.map( ele => {
        return ele.word;
      });
    }

    getLyricByTime(){

    }
  }

  return Lyric;
});