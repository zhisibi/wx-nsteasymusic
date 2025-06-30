// pages/me/me.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        islogin:false,
        myinfo:[],
        mysclist:[],
        follows:[],
        likelist:[],
        songslist:[],
        recordlist:[],
        id:"",
        isplay:false,
        name:"",
        author:"",
        myaudio:"",
        src:"",
        imagesrc:"/image/net.png",
        audioduration:100,
        audiocurrentTime:0,
        slidervalue:0,  //slider的滑块值
        
        
    },
//获取用户播放记录
getrecordlist(){
    var recordlist=this.data.recordlist
    wx.request({
      url: 'http://localhost:3000/user/record',
      data:{
          uid:this.data.id
      },
      success:(res)=>{
    //    console.log(res)
          recordlist=res.data.allData.slice(0,6)
          this.setData({recordlist})
         
      }

    })
},

    //注册

//logout
logout(){
    var islogin=this.data.islogin

    wx.request({
      url: 'http://localhost:3000/logout',
      success:(res)=>
      {
          console.log(res)
          if(res.data.code=200){
                this.setData({islogin:false})
                wx.setStorageSync('myinfo', "")
              wx.showToast({
                title: '退出成功！',
              })
          }
      }
    })
},
//获取关注

//获取用户歌单
    getacoumt(){
        var myinfo=this.data.myinfo
       var mysclist=this.data.mysclist
        var id=this.data.id
        id=myinfo.userId
        this.setData({id})
        wx.request({
            url: 'http://localhost:3000/login/status',
            success:(res)=>{
                wx.request({
                    url: 'http://localhost:3000/user/playlist',
                    data:{
                       uid:id
                    },
                    success:(res)=>{
                      
                        mysclist=res.data.playlist
                        this.setData({mysclist})
                       
                    }
          
                  })
            }
  
          })
       
    },
    //获取用户电台
    getfollows(){
        var follows=this.data.follows
        var id=this.data.id
        wx.request({
          url: 'http://localhost:3000/user/follows',
          data:{
              uid:id,
              isplay:true
          },
          success:(res)=>{
            //   console.log(res)
              follows=res.data.follow
              this.setData({follows})

          }
        })
    },
    //like
    getlikelist(){
        var likelist=this.data.likelist
        var id=this.data.id
         wx.request({
           url: 'http://localhost:3000/likelist',
           data:{
               uid:id
           }
        //    success:(res)=>{
        //    console.log(res)
        //    }
         })
    },

    //查询登录状态
    status(){
    wx.request({
        url: 'http://localhost:3000/login/status',
         success:(res)=>{
           var longinstatus=res.data.data.code
           if(longinstatus!=200){
               wx.setStorageSync('myinfo', "")
               wx.setStorageSync('mydetail', "")
           }
         }
      })
     
    },
    //注册音频
    myaudio(){
        var src=this.data.src;
        var myaudio=this.data.myaudio
        var audioduration=this.data.audioduration
        myaudio=wx.createInnerAudioContext({
            useWebAudioImplement:false
        });
        myaudio.src=src;
        // audioduration=myaudio.duration
        this.setData({myaudio})
        // console.log('注册成功',audioduration,)
    },  
    //开始播放

   
    play(){
        var myaudio=this.data.myaudio
        var isplay=this.data.isplay
        var audioduration=this.data.audioduration
         myaudio.play(),
        //  myaudio.pause(),
         myaudio.play(),
           myaudio.onPlay(() => {
            this.setData({isplay:true})
          // console.log('开始播放',audioduration)
           myaudio.onTimeUpdate(()=>{
         audioduration=myaudio.duration
            this.setData({audioduration})    
            var slidervalue=this.data.slidervalue
            var audiocurrentTime=this.data.audiocurrentTime
                audiocurrentTime=myaudio.currentTime
           slidervalue= audiocurrentTime/audioduration*100
           this.setData({slidervalue})
                // console.log(slidervalue)
           })
            
           }
           ) 
           
      
     },
    //暂停播放
    pause(){
        var myaudio=this.data.myaudio
        var isplay=this.data.isplay
        myaudio.pause(),
        myaudio.onPause(()=>{
            // console.log('暂停播放')
            this.setData({isplay:false})
        })
    },
     //停止播放
     stop(){
        var myaudio=this.data.myaudio
        var isplay=this.data.isplay
        myaudio.stop(),
        myaudio.onStop(()=>{
            console.log('停止播放')
            this.setData({isplay:false})
            var audiocurrentTime=0
            this.setData({audiocurrentTime})
        })
    },

    getaddsong(){
        var src=this.data.src
        var songdetail=wx.getStorageSync('songdetail')||[]
        var songslist=this.data.songslist
            songslist=wx.getStorageSync('songslist')
            this.setData({songslist})
        var name=this.data.name
        var author=this.data.author
        var imagesrc=this.data.imagesrc
        this.setData({songslist})
        var id=songdetail.id
        for(var i=0;i<songslist.length;i++){
            if(songslist[i].id==id){
                name=songslist[i].name
                author=songslist[i].ar[0].name
                imagesrc=songslist[i].al.picUrl
                this.setData({name,author,imagesrc})
            }
        }
     
        src = wx.getStorageSync('songurl')
      
        console.log(src)
        this.setData({src})
        this.myaudio()
        this.play()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       this.status()
       this.getplayinginfo()
       
    },
    getplayinginfo(){
        var name=this.data.name
        var author=this.data.autho
        var imagesrc=this.data.imagesrc
        var isplay=this.data.isplay
        var  playinginfo=wx.getStorageSync('playinginfo')

        if(playinginfo.isplay==true){

            this.setData({isplay:playinginfo.isplay,name:playinginfo.name,author:playinginfo.author,imagesrc:playinginfo.imagesrc})
        }
        
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
        
       var myinfo=this.data.myinfo
       var islogin=this.data.islogin
      
   
        myinfo=wx.getStorageSync('myinfo')||[]
        
        this.setData({myinfo})
        if(myinfo!="")
        {
            this.setData({islogin:true})

        }
       
        this.getacoumt()
        this.getfollows()
        this.getlikelist()
        this.getplayinginfo()
        this.getrecordlist()

        
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