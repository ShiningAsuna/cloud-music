  require.config({
    paths: {
      "jquery": "../lib/jquery-3.5.1"
    }
  });

  define(['jquery', 'api','lyric'], function($, api,Lyric){
    let search = location.search.substring(1);
    let reg = /artistId=(\d*)/;
    let res = search.match(reg);
    let artistId;
    if(res){
      artistId = res[1];
    }
    //song list
    api.apiSongsByArtist(artistId).then(function(res){
              var songs  = res.songs;
              let arr = songs.map(function(ele,i){
                let artists = '';
                ele.ar.forEach((data, index) => {
                  let addStr = index === 0 ? data.name : "/" + data.name;
                  artists += addStr;
                });
                return `<tr>
                            <td width="50px">${i+1}</td>
                            <td width="20px"><i class="iconfont icon-start"></i></td>
                            <td><a href="song.html?songId=${ele.id}">${ele.name}</a></td>
                            <td>${artists}</td>
                            <td>${ele.al.name}</td>
                        </tr>`
              }).join('');
              $(arr).appendTo( '.singer-list');
    });

    //hot singer
      api.apiArtists().then(function(res){
                var hotSinger  = res.list.artists;
                hotSinger.length = 6;
                let singer = hotSinger.map(function(ele,i){
                    return `<div>
                              <img src=${ele.picUrl} >
                              <a>${ele.name}</a>
                            </div>`;
                }).join('');
                $(singer).appendTo( '.singer-hot' );
      });

      //singer detail
      api.apiArtistDetail(artistId).then(function(res){
              let name = res.artist.name;
              let picUrl = res.artist.picUrl;
              $('.singer-name-ch').html(name);
              $('.singer-img').attr('src',picUrl);
    });

});