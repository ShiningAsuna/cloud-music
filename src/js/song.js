require.config({
  paths: {
    "jquery": "../lib/jquery-3.5.1",
    "api": "api",
    "lyric": "lyric",
    "timing": "timing"
  }
});

define(['jquery', 'api', 'lyric', 'timing'], function($, api, Lyric, timing){

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
      let lyricRes = new Lyric(lyric);
      let lyricArr = lyricRes.toStrArr();
      let lyricHtml = lyricArr.map(function(ele){
        return `<span class="lyric">${ele}</span>
                    `;
                  }).join('<br>') 
        $( '.lyrics').append( $(lyricHtml) ) 
        $( '.lyricsWrap').append( $(lyricHtml) ) 
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
  
  //添加与展开歌词
  $('.unfold').click(function(){
    $( '.lyricsWrap').hide();
    $( '.lyrics').show(); 
    $( '.unfold').hide();   
    $( '.fold').show();  
  })

  //添加与展开歌词
  $('.fold').click(function(){
    $( '.lyricsWrap').show();
    $( '.lyrics').hide();  
    $( '.unfold').show();   
    $( '.fold').hide();  
  })

  //设置主页音频
  function setAudio(url){
    let audio = $('audio', parent.document)[0];
    audio.src = url;
    audio.oncanplay = function(){
      let duration = timing.secondToMinuteSecond(this.duration);
      $('footer .time .duration', parent.document).html(duration);
      audio.play();
    }
  }

  //设置底部播放栏信息
  function setSongInfo(data){
    let $info = $('footer .info', parent.document);
    let artists = '';
    data.ar.forEach((ele, index) => {
      let addStr = index === 0 ? ele.name : "/" + ele.name;
      artists += addStr;
    });

    //设置页面和底部播放器歌曲名称
    $info.find('.name').html(data.name);
    $('.container .name').html(data.name);

    //设置页面和底部播放器歌手名称
    $info.find('.artist').html(artists);
    $('.detail .artist').html(artists);

    //设置专辑信息
    $('.detail .album').html(data.al.name);

    //设置页面和底部播放器专辑封面
    $('footer .cover img', parent.document).attr('src', data.al.picUrl);
    $('.song-left .cd img').attr('src', data.al.picUrl);
  }

});