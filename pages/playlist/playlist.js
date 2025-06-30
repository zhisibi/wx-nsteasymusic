// pages/playlist/playlist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        playlistdetail:[],
        playlist:[],
        songurl:""
    },
 addtoplay(e){
        var songid=e.currentTarget.dataset.id
        var songurl=this.data.url
        var playlist=this.data.playlist
        wx.setStorageSync('songslist', playlist)
        wx.request({
            url: 'http://localhost:3000/song/url',
            data:{
                id:songid
            },
            success:(res)=>{
              console.log(res)
                songurl=res.data.data[0].url
                // var songdetail=res.data.data[0]
                // wx.setStorageSync('songdetail', songdetail)
                this.setData({songurl})
                console.log(songurl)
                wx.setStorageSync('songurl', songurl)
                wx.setStorageSync('comfrom', true)
                wx.navigateTo({
                    url: '../paly/paly?songid='+songid,
                })
            }
            
          })
 },
//获取播放列表
 getsonglist(){
        var playlistdetail=this.data.playlistdetail
        var playlist=this.data.playlist
        playlist=wx.getStorageSync('playlist')
        this.setData({playlist})
        if(playlist.length!="")
        {
            // playlist.length
            for(var i=0;i<playlist.length;i++){
                var songid=playlist[i].id
                wx.request({
                    url: 'http://localhost:3000/song/url',
                    data:{
                        id:songid
                    },
                    success:(res)=>{
                        // console.log(res)
                        var temp=res
                    }
                })
           
        }
        }    
    },
//remove,从播放列表中删除
remove(e){
var playlist=this.data.playlist
var index=e.currentTarget.dataset.id
playlist.splice(index,1)
this.setData({playlist})
wx.setStorageSync('playlist', playlist)
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
        this.getsonglist()
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