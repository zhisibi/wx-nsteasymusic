// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keywoed:"请输入关键字",
        searchliset:[],
        songurl:""
    },
    getserchword(){
        var keywoed=this.data.keywoed
       wx.request({
         url: 'http://localhost:3000/search/default',
         success:(res)=>
         {
            keywoed=res.data.data.realkeyword
            this.setData({keywoed})
         }
       })
    },
    clearinput(){
        this.setData({keywoed:""})
    },
    inputsearch(e){
       this.setData({keywoed:e.detail.value})
       
    },
    search(){
        var keywoed=this.data.keywoed
        var searchliset=this.data.searchliset
        wx.request({
          url: 'http://localhost:3000/search',
          data:{
            keywords:keywoed

          },
          success:(res)=>{
              console.log(res)
              searchliset=res.data.result.songs
              this.setData({searchliset})
              // wx.setStorageSync('songslist', searchliset)    
          }
        })

    },
    addtoplay(e){
        var songid=e.currentTarget.dataset.id
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
                //  wx.setStorageSync('songdetail', songdetail)
                 this.setData({songurl})
                 console.log(songurl)
                //  wx.setStorageSync('songurl', songurl)
                 wx.setStorageSync('comfrom', true)
                 wx.navigateTo({
                   url: '../paly/paly?songid='+songid,
                 })
             }
           })
       },
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
    this.getserchword()
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