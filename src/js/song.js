require.config({
  paths: {
    "jquery": "../lib/jquery-3.5.1",
    "api": "api"
  }
});

define(['jquery', 'api'], function($, api){

  var str = location.search //?songId=2222222
  var patt1 = /\?songId=([0-9]*)/;
  var songId = str.match(patt1)[1];
  console.log(songId);


  //获取lyric数据并渲染
  api.apiLyric("31311140").then(function(res){
      if(res.code == "200"){
        let lyric = res.lrc.lyric;
        let lyricStr = `<div>${lyric}</div>`
        $(lyricStr).appendTo( '.lyrics');
      }  
  });


  
});