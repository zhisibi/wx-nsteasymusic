// pages/me/me.js
const  myaudio=wx.getBackgroundAudioManager()
const app=getApp()

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
        id:"",
        isplay:false,
        name:"",
        author:"",
        // myaudio:"",
        src:"",
        imagesrc:"/image/net.png",
        audioduration:"",
        audiocurrentTime:"",
        slidervalue:0,  //slider的滑块值
        iscomfrom:false,
        isdestroy:false,
        songid:""
    },

    myaudio(){
        var src=this.data.src;
        var audioduration=this.data.audioduration
        myaudio.src	=src;
        myaudio.title=this.data.name
        audioduration=myaudio.duration
        console.log(audioduration)
        this.play()
    },  
    //开始播放或者暂停
   
    play(){
        var audioduration=this.data.audioduration
        audioduration=myaudio.duration
        console.log(audioduration)
        var isplay=this.data.isplay
        isplay=true
        this.setData({isplay})
        app.globalData.ismusicplay=isplay
        var audioduration=this.data.audioduration
        
         myaudio.src= this.data.src;
        //  myaudio.title="歌曲"
        myaudio.title=this.data.name
          myaudio.play()  
             console.log("play") 

       
         
     
        
         
      
     },
    //暂停播放
    pause(){
        // var myaudio=this.data.myaudio
        var isplay=this.data.isplay
        this.setData({isplay:false})
        app.globalData.ismusicplay=isplay
        myaudio.pause(),
        myaudio.onPause(()=>{
            // console.log('暂停播放')
            this.setData({isplay:false})
        })
    },
     //停止播放
     stop(){
               var isplay=this.data.isplay
        myaudio.stop(),
        myaudio.onStop(()=>{
            console.log('停止播放')
            isplay=false
            app.globalData.ismusicplay=isplay
            this.setData({isplay})
           
            var audiocurrentTime=0
            this.setData({audiocurrentTime})
            // myaudio.destroy()
           
            console.log('运行到此')
        })
    },
    //下一首
    nextsong(){
        var songid=this.data.songid
        var playlist=wx.getStorageSync('playlist')||[]
      
        if(playlist.length>=1)
        {
            for(var i=0;i<playlist.length;i++)
            {
                if(songid==playlist[i].id)
                {
                    if(i<playlist.length-1)
                    {
                    var songidtemp=playlist[i+1].id
                    console.log(i,'if')
                    }
                    else
                    {
                        var songidtemp=playlist[0].id
                        console.log(i,'else')  
                    }
                }
              
              
            }

            songid= songidtemp
            this.setData({songid})
            this.getaddsong()

        }
       else
       {wx.showToast({
         title: '列表为空请添加!',
         icon:'error'
       })}
    },
 //上一首
 previoussong(){
    var songid=this.data.songid
    var playlist=wx.getStorageSync('playlist')||[]
   
    if(playlist.length>=1)
    {
        for(var i=0;i<playlist.length;i++)
        {
            if(songid==playlist[i].id)
            {
                if(i>0)
                {
                var songidtemp=playlist[i-1].id
                console.log(i,'if')
                }
                else
                {
                    var songidtemp=playlist[playlist.length-1].id
                    console.log(i,'else')  
                }
            }
            
            
            
          
        }
        songid= songidtemp
        this.setData({songid})
        this.getaddsong()

    }
   else
   {wx.showToast({
     title: '列表为空请添加!',
     icon:'error'
   })}
},


    getaddsong(){
        var songid=this.data.songid
        var name=this.data.name
        var author=this.data.author
        var imagesrc=this.data.imagesrc
        wx.request({
          url: 'http://localhost:3000/song/detail',
          data:{
              ids:songid
          },
          success:(res)=>{
              console.log(res)
              author=res.data.songs[0].ar[0].name
              imagesrc=res.data.songs[0].al.picUrl
              name=res.data.songs[0].name
              this.setData({author,imagesrc,name})

          }
        })
        var src=this.data.src
        wx.request({
          url: 'http://localhost:3000/song/url',
          data:{
              id:songid
          },
          success:(res)=>{
             src=res.data.data[0].url
             this.setData({src})
          }

        })
        var songdetail=wx.getStorageSync('songdetail')||[]
        var songslist=this.data.songslist
            songslist=wx.getStorageSync('songslist')
            this.setData({songslist})
        var name=this.data.name
        var author=this.data.author
        var imagesrc=this.data.imagesrc
        this.setData({songslist})
        var id=songdetail.id
       setTimeout(() => {
        this.play() 
       }, 1000);
        
       
    },
    //进度条快进
    gototimeplay(e){
        var audioduration=this.data.audioduration
        let playtime=e.detail.value/100*audioduration
        myaudio.seek(playtime)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({songid:options.songid})
        
        var isplay=this.data.isplay
       
        myaudio.onPlay(()=>{
            isplay=true
            app.globalData.ismusicplay=isplay
            this.setData({isplay})
            
        })
        myaudio.onPause(()=>{
           isplay=false
           app.globalData.ismusicplay=isplay
            this.setData({isplay})
        })
        myaudio.onEnded(()=>{
            this.nextsong()
        })
        myaudio.onTimeUpdate(()=>{
            var audioduration=this.data.audioduration
            var audiocurrentTime=this.data.audiocurrentTime
            var slidervalue=this.data.slidervalue
          
            audioduration=parseInt(myaudio.duration)
            audiocurrentTime=parseInt(myaudio.currentTime)
         
            slidervalue=audiocurrentTime/audioduration*100
            this.setData({slidervalue, audiocurrentTime,audioduration})
            // console.log(slidervalue)
        })
       
       
       
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
       console.log("show")
       let iscomefrom=wx.getStorageSync('comfrom')
       wx.setStorageSync('comfrom', false)
    //    var src=this.data.src
    //    src=wx.getStorageSync('songurl')
    //    this.setData({src})
      
        this.getaddsong()
       
      
   
      
       
    },
    

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        // var src=this.data.src
        // wx.setStorageSync('songurl', src)
      
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