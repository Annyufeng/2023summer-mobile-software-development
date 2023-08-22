// index.js
// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['山东省','青岛市','黄岛区'],
    now:{
      temp:0,
      text:'未知',
      icon:'100',
      humidity:0,
      pressure:0,
      vis:0,
      windDir:0,
      windSpeed:0,
      windScale:0,
    },
    id:0,
  },

  regionChange:function(e){
    this.setData({region:e.detail.value});
    this.getloc();
  },
  getweather:function()
  {
    var that=this;
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      data:{
        location:that.data.id,
        key:'80131c60282f400eb20074df714c59c1',
      },
      success:function(res){
        that.data.now=res;
          console.log(that.data.now);
          that.setData({now:res.data.now})
      }
    })
  },
  getloc:function(){
    var that = this;
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup',
      data:{location:that.data.region[1],
      key:'80131c60282f400eb20074df714c59c1'
      },
      success:function(res){
        that.data.id=res.data.location[0].id;
        console.log(that.id);
        that.getweather();
      },
      
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getloc();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})