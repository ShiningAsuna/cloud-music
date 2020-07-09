define(['jquery'], function($){

    /**
     * 获取banner数据
     */
    function apiBanner(){
      return $.ajax({
        url: 'api/banner?type=0',
        type: 'get',
        dataType: 'json'
      });
    }

    /**
     * 获取歌手排行榜
     */
    function apiArtists(){
      return $.ajax({
        url: 'api/toplist/artist',
        type: 'get',
        dataType: 'json'
      });
    }

    /**
     * 根据歌手id获取歌曲列表
     * @param {String} artistId 歌手id
     */
    function apiSongsByArtist(artistId){
      return $.ajax({
        url: 'api/artist/top/song',
        type: 'get',
        dataType: 'json',
        data: {
          id: artistId
        }
      });
    }
    
    /**
     * 根据歌曲id获取歌曲播放地址
     * @param {String} songId 歌曲id
     */
    function apiSongUrl(songId){
      return $.ajax({
        url: 'api/song/url',
        type: 'get',
        dataType: 'json',
        data: {
          id: songId
        }
      });
    }

    /**
     * 根据歌曲id获取歌词
     * @param {String} songId 歌曲id
     */
    function apiLyric(songId){
      return $.ajax({
        url: 'api/lyric',
        type: 'get',
        dataType: 'json',
        data: {
          id: songId
        }
      });
    }

    /**
     * 根据歌曲id获取歌曲详情
     * @param {String} songId 歌曲id
     */
    function apiSongDetail(songId){
      return $.ajax({
        url: 'api/song/detail',
        type: 'get',
        dataType: 'json',
        data: {
          ids: songId
        }
      });
    }

    /**
     * 根据歌手id获取歌手详情
     * @param {String} artistId 歌手id
     */
    function apiArtistDetail(artistId){
      return $.ajax({
        url: 'api/artists',
        type: 'get',
        dataType: 'json',
        data: {
          id: artistId
        }
      });
    }

    /**
     * 获取飙升榜数据
     */
    function apiBsList(){
      return $.ajax({
        url: 'api/playlist/detail?id=19723756',
        type: 'get',
        dataType: 'json'
      });
    }
    
    /**
     * 获取新歌榜数据
     */
    function apiXgList(){
      return $.ajax({
        url: 'api/playlist/detail?id=3779629',
        type: 'get',
        dataType: 'json'
      });
    }

    /**
     * 获取热歌榜数据
     */
    function apiRgList(){
      return $.ajax({
        url: 'api/playlist/detail?id=3778678',
        type: 'get',
        dataType: 'json'
      });
    }

     /**
     * 搜索数据接口
     */
    function apiSearchList(keyword){
      return $.ajax({
        url: 'api/search',
        type: 'get',
        dataType: 'json',
        data: {
          keywords: keyword
        }
      });
    }

    return {
      apiBanner,
      apiArtists,
      apiSongsByArtist,
      apiSongUrl,
      apiLyric,
      apiSongDetail,
      apiArtistDetail,
      apiBsList,
      apiXgList,
      apiRgList,
      apiSearchList
    }

});
