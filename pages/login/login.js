// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isphone:true,
        phone:"请输入手机号",
        yzhm:"",
        email:"请输入邮箱",
        password:"",
        id:"",
        myinfo:[],
        mydetail:[],
        islogin:false
    },
    zhhdl(){
        var isphone=this.data.isphone
        isphone=false
        this.setData({isphone})
    },
    shjhdl(){
        var isphone=this.data.isphone
        isphone=true
        this.setData({isphone})
    },
    clearphone(){
        var phone=this.data.phone
        phone=""
        this.setData({phone})

    },
    phoneinput(e){
       
        var phone=this.data.phone
        phone=e.detail.value
        this.setData({phone})
        console.log(phone)
    },
    clearyzm(){
        var yzhm=this.data.yzhm
        yzhm=""
        this.setData({yzhm})
    },
    yzminput(e){
        var yzhm=this.data.yzhm
        yzhm=e.detail.value
        this.setData({yzhm})
    },
    getyzhm(){
        var phone=this.data.phone
        console.log( phone)
        wx.request({
          url: 'http://localhost:3000/captcha/sent',
          data:{
            phone:this.data.phone
          },
          success:(res)=>{
              console.log(res)
              if(res.data.code==200)
              {
                  wx.showToast({
                    title: '获取成功',
                    icon:'success'
                                  })
              }
              else
              {
                wx.showToast({
                  title: '获取失败',
                  icon:'error'
                                })
            }
          },
          fail:()=>{
            wx.showToast({
                title: '获取失败',
                icon:'error'
                              })
          }
        })
    },
    dl(){
        var  phone=this.data.phone
        var yzhm=this.data.yzhm
        var id=this.data.id
        var myinfo=this.data.myinfo
        var mydetail=this.data.mydetail
        var islogin=this.data.islogin 
            wx.request({
              url: 'http://localhost:3000/login/cellphone',
             data:{
                phone:this.data.phone,
                password:this.data.yzhm
            },
            success:(res)=>{
                console.log(res)
                wx.setStorageSync('cookies', res.cookies)
                id=res.data.account.id
                myinfo=res.data.profile
                this.setData({id})
                this.setData({myinfo})
                wx.setStorageSync('myinfo', myinfo)
                console.log(id,myinfo)
                wx.request({
                  url: 'http://localhost:3000/login/refresh',
                  success:(res)=>{
                    console.log(res)
                }
                })
                wx.request({
                  url: 'http://localhost:3000/user/detail',
                  data:
                  {uid:id},
                  success:(res)=>{
                    mydetail=res.data
                    islogin=true
                    this.setData({mydetail,islogin})
                    wx.setStorageSync('mydetail', mydetail)
                    // wx.setStorageSync('islogin', mydetail)

                  }
                })
                if(islogin==true){
                  wx.showToast({
                    title: '登录成功',
                    icon:'success'
                  })

                }
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1,
                  })  
                  
                }, 2000);
                             
              }
            
        })
        
        
    },
    clearemail(){
      var  email=this.data.email
      this.setData({email:""})
    },
    inputemail(e){
      var  email=this.data.email
      this.setData({email:e.detail.value})
    },
    clearpassword(){
      var  password=this.data.password
      this.setData({password:""})
    },
    inptupassword(e){
      var  password=this.data.password
      console.log(e)
      this.setData({password:e.detail.value})
    },
    emaillogin(){
      var email=this.data.email
      var password=this.data.password
      var id=this.data.id
      var myinfo=this.data.myinfo
        wx.request({
          url: 'http://localhost:3000/login',
          data:{
            email:email,
            password:password
          },
          success:(res)=>{
            console.log(res)
            id=res.data.account.id
            myinfo=res.data.profile
            this.setData({id})
            this.setData({myinfo})
            wx.setStorageSync('myinfo', myinfo)
            // console.log(id,myinfo)
           
                         
          
            
          }
        

        })
      setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })  
          
        }, 2000)
     
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