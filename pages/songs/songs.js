// pages/songs/songs.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      id:0,
      songslist:[],
      songurl:"",
      gdname:"",
      playlist:[],
      songid:""
    },
    getsongs(){
     var id= this.data.id
     var songslist=this.data.songslist
     var gdname=this
     wx.request({
       url: 'http://localhost:3000/playlist/detail',
       data:{
           id:id
       },
       success:(res)=>{
         console.log(res.data.playlist.tracks[0].al.name)
         gdname=res.data.playlist.tracks[0].al.name
         songslist=res.data.playlist.tracks
           this.setData({songslist,gdname})
          //  wx.setStorageSync('songslist', songslist)
          
       }
     })

    },
    addtoplay(e){
     var songid=this.data.songid
     songid=e.currentTarget.dataset.id
     this.setData({songid})
     var songurl=this.data.url
     this.addplaylist(e)
        wx.request({
          url: 'http://localhost:3000/song/url',
          data:{
              id:songid
          },
          success:(res)=>{
            console.log(res)
              songurl=res.data.data[0].url
              var songdetail=res.data.data[0]
              // wx.setStorageSync('songdetail', songdetail)
              this.setData({songurl})
              console.log(songurl)
              // wx.setStorageSync('songurl', songurl)
              // wx.setStorageSync('comfrom', true)
              wx.navigateTo({
                url: '../paly/paly?songid='+songid,
              })
          }
        })
    },
    //添加到播放列表
    addplaylist(e){
      var songid=e.currentTarget.dataset.id
     
      var playlist=wx.getStorageSync('playlist')||[]
      wx.request
      ({
        url: 'http://localhost:3000/song/detail',
        data:{
            ids:songid
        },
        success:(res)=>{
          console.log(res)
        var temp={id:songid,name:res.data.songs[0].name}
          playlist.unshift(temp)
          this.setData({playlist})
          wx.showToast({
            title: '添加成功',
            icon:'success'
            })
            wx.setStorageSync('playlist', playlist)
        }
      })
     
    },
    //addallsongtoplaylist
    addallsongtoplaylist(){
      var songslist=this.data.songslist
      var playlist=wx.getStorageSync('playlist')||[]
    
      for(var i=0;i<songslist.length;i++)
      {
         var temp={id:songslist[i].id,name:songslist[i].name}
        playlist.unshift(temp)
        this.setData({playlist})
      }

      wx.setStorageSync('playlist', playlist)
      wx.showToast({
        title: '添加成功',
        icon:'success'
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       
        var id= this.data.id
        id=options.id
        this.setData({id})
        this.getsongs()
       
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})