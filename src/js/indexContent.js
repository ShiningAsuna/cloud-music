require.config({
  paths: {
    "jquery": "../lib/jquery-3.5.1",
    "slider": "slider",
    "banner": "banner",
    "throttle": "throttle",
    "api": "api"
  }
});

define(['jquery', 'banner', 'api'], function($, Banner, api){

  //获取banner数据并渲染
  api.apiBanner().then(function(res){

    if(res.code == 200){
      //渲染图片
      let html = res.banners.map( ele => {
        return `<a data-targetId="${ele.targetId}"><img src="${ele.imageUrl}" alt=""></a>`
      }).join('');
      $(html).appendTo('.img_wrap');

      //设置列表
      for(let i = 0; i<res.banners.length; i++){
        $(`<li class="list-item ${i===0?'active':''}"></li>`).appendTo('.list-wrap');
      }

      new Banner({
        imgWrap: $('.img_wrap'),
        leftBtn: $('.btn-left'),
        rightBtn: $('.btn-right'),
        listWrap: $('.list-wrap'),
        imgItems: $('.img_wrap a'),
        listItems: $('.list-wrap .list-item'),
        effect: 'roll',
        onswitch: function(index){
          $('.list-wrap .list-item').removeClass('active').eq(index).addClass('active');
        }
      });
    }
  });

  //获取歌手列表并渲染
  api.apiArtists().then(function(res){

    if(res.code == 200){
      let artistArr = res.list.artists;
      artistArr.length = 20;
      let html = artistArr.map(ele => {
        return `
            <div class="singer-wrap" data-id=${ele.id}>
              <div class="img-wrap">
                <img src="${ele.picUrl}" alt="">
              </div>
              <div class="singer-name">${ele.name}</div>
            </div>`;
      }).join('');
      $(html).appendTo('.singer-con');
    }
  });

  //获取飙升榜并渲染
  api.apiBsList().then(function(res){

    if(res.code == 200){
      let songsArr = res.playlist.tracks;
      songsArr.length = 10;
      let html = songsArr.map((ele, index) => {
        return `<li data-id="${ele.id}">
                <span class="num">${index + 1}</span>
                <span class="name">${ele.name}</span>
              </li>`;
      }).join('');
      $('.list-bs .list-content').append(html);
    }
  });

  //获取飙升榜并渲染
  api.apiXgList().then(function(res){

    if(res.code == 200){
      let songsArr = res.playlist.tracks;
      songsArr.length = 10;
      let html = songsArr.map((ele, index) => {
        return `<li data-id="${ele.id}">
                <span class="num">${index + 1}</span>
                <span class="name">${ele.name}</span>
              </li>`;
      }).join('');
      $('.list-xg .list-content').append(html);
    }
  });

  //获取飙升榜并渲染
  api.apiRgList().then(function(res){

    if(res.code == 200){
      let songsArr = res.playlist.tracks;
      songsArr.length = 10;
      let html = songsArr.map((ele, index) => {
        return `<li data-id="${ele.id}">
                <span class="num">${index + 1}</span>
                <span class="name">${ele.name}</span>
              </li>`;
      }).join('');
      $('.list-rg .list-content').append(html);
    }
  });
  
});