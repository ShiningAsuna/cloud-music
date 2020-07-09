require.config({
  paths: {
    "jquery": "../lib/jquery-3.5.1",
    "api": "api"
  }
});

define(['jquery', 'api','lyric'], function($, api,Lyric){

  // var str = location.search //?songId=2222222
  // var patt1 = /\?songId=([0-9]*)/;
  // var songId = str.match(patt1)[1];
  // console.log(songId);


  //获取lyric数据并渲染
  api.apiLyric("31311140").then(function(res){
      if(res.code == "200"){
        let lyric = res.lrc.lyric;
        let lyricRes = new Lyric(lyric);
        let lyricArr = lyricRes.toStrArr();
        let lyricHtml = lyricArr.map(function(ele,i){
            return `<span class="lyric">${ele}</span>
                    `;
        }).join('<br>') 
        $( '.lyrics').append( $(lyricHtml) ) 
        $( '.lyricsWrap').append( $(lyricHtml) ) 
      }  
  });



  $('.unfold').click(function(){
    $( '.lyricsWrap').hide();
    $( '.lyrics').show(); 
    $( '.unfold').hide();   
    $( '.fold').show();  
  })

  $('.fold').click(function(){
    $( '.lyricsWrap').show();
    $( '.lyrics').hide();  
    $( '.unfold').show();   
    $( '.fold').hide();  
  })


});