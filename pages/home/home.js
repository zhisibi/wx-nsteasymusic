// pages/home/home.js
const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isplay:false,
        name:"",
        author:"",
        myaudio:"",
        imagesrc:"/image/net.png",
        swplist:[],
        belllist:[],
        getscrolllist:[],
        paihangbanglist:[],
        islogin:false,
        myinfo:"",
        nickname:"",
        userId:"",
        searchword:"",
        likelist:[],
        playinginfo:[],
        songlistid:"",
        songid:""
    },
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
    getswplist(){
        var swplist=this.data.swplist
        wx.request({
          url: 'http://localhost:3000/banner',
          success:(res)=>{
            //   console.log(res.data.banners)
              swplist=res.data.banners
              this.setData({swplist})
          }
        })
    },
    getscrolllist(){
        var getscrolllist=this.data.getscrolllist
        wx.request({
          url: 'http://localhost:3000/personalized',
          success:(res)=>{
            //   console.log(res)
             getscrolllist=res.data.result
             this.setData({getscrolllist})
          }
        })
    },
    //获取导航圆形图标
    getbell(){
      var belllist=this.data.belllist
      wx.request({
        url: 'http://localhost:3000/homepage/dragon/ball',
       success:(res)=>{
        //  console.log(res)
         belllist=res.data.data
         this.setData({belllist})
       } 
      })
    },

   
    //获取排行榜数据xin
    getpaihangbangnew(){
        var paihangbanglist=this.data.paihangbanglist
       
        wx.request({
          url: 'http://localhost:3000/toplist/detail',
          
          success:(res)=>{
            // console.log(res)
           
            var ranks = res.data.list
            
            for(var i=0;i<6;i++)
            {
                wx.request({
                  url: 'http://localhost:3000/playlist/detail',
                  data:{
                      id:ranks[i].id
                  },
                  success:(res)=>{
                      // console.log(res)
                     var temp={name:res.data.playlist.name,id:res.data.playlist.id,coverImgUrl:res.data.playlist.coverImgUrl,description:res.data.playlist.description,tracks:res.data.playlist.tracks.slice(0,3)}
                     paihangbanglist.push(temp)
                     this.setData({paihangbanglist})
                  }
                })
            }
          }

        })
        
    },
    //查询登录状态
    status(){
      var islogin=this.data.islogin
      var myinfo=this.data.myinfo
      var nickname=this.data.nickname
      var userId =this.data.userId 
      wx.request({
          url: 'http://localhost:3000/login/status',
           success:(res)=>{
             var longinstatus=res.data.data.code
             if(longinstatus!=200){
                 wx.setStorageSync('myinfo', "")
                 wx.setStorageSync('mydetail', "")
                 wx.setData({islogin:false})
             }
             else if(longinstatus=200)
             {
              myinfo=wx.getStorageSync('myinfo')||[]
              nickname=myinfo.nickname
              userId=myinfo.userId
              this.setData({islogin:true,myinfo})
              this.setData({myinfo,nickname,userId})
             }
           }
        })
       
      },
    //获取喜欢列表
    getlikelist(){
      var likelist=this.data.likelist
      var userId=this.data.userId
      wx.request({
        url: 'http://localhost:3000/likelist',
        data:{
          id:userId
        },
        success:(res)=>
        {
          console.log(res)
        }
      })
    },
    //获取正在播放的列表
    getplayinginfo(){
      var name=this.data.name
      var author=this.data.autho
      var imagesrc=this.data.imagesrc
      var playinginfo=this.data.playinginfo
      
      playinginfo=wx.getStorageSync('playinginfo')||[]
      if( playinginfo!=""){
      this.setData({playinginfo})
      var isplay=this.data.isplay
      isplay=playinginfo[0].isplay1
      if(isplay==true){
        name=playinginfo[0].name
        author=playinginfo[0].author
        imagesrc=playinginfo[0].imagesrc
        this.setData({isplay,name,author,imagesrc})
        wx.setStorageSync('playinginfo', "")
      }
    }
      
  },
  toplay(e){
 
  this.setData({songid:e.currentTarget.dataset.id})
  var songid=this.data.songid
  this.addplaylist()
  wx.navigateTo({
    url: '../paly/paly?songid='+songid,
  })
  },
  addplaylist(){
    var songid=this.data.songid
    
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
        wx.setStorageSync('playlist', playlist)
      }
    })
   
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getswplist()
        this.getbell()
        this.getscrolllist()
        this.getpaihangbangnew()
        // this.getpaihangbang()
        this.status()
        var isplay=this.data.isplay
        isplay=app.globalData.ismusicplay
        this.setData({isplay})
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
      this.getplayinginfo()
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