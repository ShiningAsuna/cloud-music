require.config({
  paths: {
    "jquery": "../lib/jquery-3.5.1",
    "api": "api"
  }
});

define(['jquery', 'api'], function($, api){

  var str = location.search.substring(1); //?songId=2222222
  var patt1 = /songId=([0-9]*)/;
  let res =  str.match(patt1);
  var songId;
  if(res){
    songId = res[1];
  }

  //获取lyric数据并渲染
  api.apiLyric(songId).then(function(res){
      if(res.code == "200"){
        let lyric = res.lrc.lyric;
        let lyricStr = `<div>${lyric}</div>`
        $(lyricStr).appendTo( '.lyrics');
      }  
  });

  //获取歌曲信息并播放
  api.apiSongUrl(songId).then(function(res){
    if(res.code == 200){
      if(res.data){
        setAudio(res.data[0].url);
      }
    }
  });

  //设置歌曲信息信息到页面
  api.apiSongDetail(songId).then(function(res){
    if(res.code == 200){
      setSongInfo(res.songs[0]);
    }
  });


  //设置主页音频
  function setAudio(url){
    let audio = $('audio', parent.document)[0];
    audio.src = url;
    audio.play();
  }

  //设置底部播放栏信息
  function setSongInfo(data){
    let $info = $('footer .info', parent.document);
    let artists = '';
    data.ar.forEach(ele => {
      artists += ele.name;
    });
    $info.find('.name').html(data.name);
    $info.find('.artist').html(artists);
    $('footer .cover img', parent.document).attr('src', data.al.picUrl);
  }

});