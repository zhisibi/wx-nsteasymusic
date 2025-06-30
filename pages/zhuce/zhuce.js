// pages/zhuce/zhuce.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone:"",
        password:"",
        nikename:"",
        captcha:""
    },
    inputphone(e){
        var phone=this.data.phone
        
        phone=e.detail.value
        this.setData({phone})
    },
    inputpassword(e){
        var password=this.data.password
       
        password=e.detail.value
        this.setData({password})
    },
    inputnickname(e){
        var nikename=this.data.nikename
        
        nikename=e.detail.value
        this.setData({nikename})
    },
   
    inputcaptcha(e){
        var captcha=this.data.captcha
        
        captcha=e.detail.value
        this.setData({captcha})
    },
    phonecheck(){
        var phone=this.data.phone
       
        wx.request({
          url: 'http://localhost:3000/cellphone/existence/check',
          data:{
           phone:phone
          },
          success:(res)=>{
            console.log(res)
            if(res.data.exist=1){ 
                wx.showToast({
                  title: '该手机号已注册',
                  icon:'error'
                })
            }
          }
        })
    },
    getcaptcha(){
        var captcha=this.data.captcha
        var phone=this.data.phone
        wx.request({
          url: 'http://localhost:3000/captcha/sent',
          data:{
              phone:phone
          },
          success:(res)=>{
             if(res.data.code=200)
             {
                 console.log(res)
               wx.showToast({
                 title: '发送成功',
               })
             }
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