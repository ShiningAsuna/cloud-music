
  require.config({
    paths: {
      "jquery": "../lib/jquery-3.5.1"
    }
  });

  define(['jquery'], function($){
    let search = location.search.substring(1);
    let reg = /artistId=(\d*)/;
    let res = search.match(reg);
    let artistId;
    if(res){
      artistId = res[1];
    }

    $.ajax({
        url : 'http://localhost:3000/artist/top/song?id=12429072' ,
        success(data){
            var songs  = data.songs;
            let arr = songs.map(function(ele,i){
                // console.log(ele.al.picUrl) //singer's picture
                return `<tr>
                            <td width="50px">${i+1}</td>
                            <td width="20px"><i class="iconfont icon-start"></i></td>
                            <td>${ele.name}</td>//song's name
                            <td>歌曲时长</td>
                            <td>${ele.al.name}</td>//album ' name
                        </tr>`
            }).join('');
            $(arr).appendTo( '.singer-list');
        },
        error(err){  
          console.log("err");
      }
  })
  
  //hot singer
  $.ajax({
    url : 'http://localhost:3000/top/artists' ,
    success(data){
        var hotSinger  = data.artists;
        hotSinger.length = 6;
        let singer = hotSinger.map(function(ele,i){
            return `<div>
                      <img src=${ele.picUrl} >
                      <a>${ele.name}</a>
                    </div>`;
        }).join('');
        $(singer).appendTo( '.singer-hot' );
    },
    error(err){  
      console.log("err");
  }
})

    
  });