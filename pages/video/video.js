// pages/video/video.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchword:"",
        grouplist:[],
        active:false,
        toview:"",
        videogroupid:"",
        videoid:"",
        videolist:[]

    },
    //获取分组视频
    getvideos(){
      var videolist=this.data.videolist
      var videogroupid=this.data.videogroupid
      var cookies=wx.getStorageSync('cookies')||[]
      for(var i=0;i<cookies.length;i++){
        if(cookies[i].indexOf('MUSIC_U')!=-1){
          var cookiestemp=cookies[i]
        }
      }
      console.log(cookiestemp)
      wx.request({
        url: 'http://localhost:3000/video/group',
        data:{
          id:videogroupid
        },
        header: {
          cookie: cookiestemp
          },
        success:(res)=>{
          console.log(res)
          var templist=res.data.datas
          for(var i=0;i<templist.length;i++)
      {
        var vid=templist[i].data.vid
        var title=templist[i].data.title
        var avatarUrl=templist[i].data.creator.avatarUrl
        var name=templist[i].data.creator.nickname
        wx.request({
          url: 'http://localhost:3000/video/url',
          data:{
            id:vid
          },
          success:(res)=>{
            console.log(templist[2])
          
            var vidieurl={url:res.data.urls[0].url,id:res.data.urls[0].id,title:title
              ,avatarUrl:avatarUrl
              ,name:name}
            videolist.push(vidieurl)
            this.setData({videolist})
            console.log(videolist)
          }
        })
      }
        }
      })
      
    },
    // 该接口用于获取给用户的每日推荐数据
    getdata(){
     
      var cookies=wx.getStorageSync('cookies')||[]
      for(var i=0;i<cookies.length;i++){
        if(cookies[i].indexOf('MUSIC_U')!=-1){
          var cookiestemp=cookies[i]
        }
      }
     
      wx.request({
        url: 'http://localhost:3000/recommend/songs',
        header: {
          cookie: cookiestemp
          },
        success:(res)=>{
          console.log(res)
        }
      })
    },

    //获取官方搜索关键词
    getserchword(){
        var searchword=this.data.searchword
       wx.request({
         url: 'http://localhost:3000/search/default',
         success:(res)=>
         {
            searchword=res.data.data.realkeyword
            this.setData({searchword})
         }
       })
    },
    //获取导航
    getgrouplist(){
        var grouplist=this.data.grouplist
        var videogroupid=this.data.videogroupid
        wx.request({
          url: 'http://localhost:3000/video/group/list',
          success:(res)=>{
            // console.log(res)
            grouplist=res.data.data.slice(0,20)
            grouplist[0].active=true
            videogroupid=grouplist[0].id
            this.setData({grouplist,videogroupid})
          }
        })
    },
    //判断点击
    tapgroup(e){
      console.log(e)
      var grouplist=this.data.grouplist
      var videogroupid=this.data.id
      videogroupid=e.currentTarget.dataset.id
      this.setData({videogroupid})
      // var active=this.data.active
      var index=e.currentTarget.dataset.index
      var toview=this.data.toview
      toview='item'+index
      this.setData({toview})
      console.log(toview)
      for(var i=0;i<grouplist.length;i++)
      { grouplist[i].active=false
        grouplist[i].id=111
        // this.setData({grouplist})
        if(i==index){
          
          grouplist[index].active=true
         
        }
        this.setData({grouplist})
      }
      this. getvideos()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.getserchword()
      this.getgrouplist()
     
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
        this.getvideos()
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