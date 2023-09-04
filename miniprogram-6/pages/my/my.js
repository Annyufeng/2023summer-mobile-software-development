var common = require("../../utils/common")
Page({
  //获取授权信息
  getUserInfo: function(){
    wx.getUserProfile({
      desc: '获取授权信息',
      success: (res) => {
        let info = res.userInfo
        this.setData({
          isLogin: true,
          src: info.avatarUrl,
          nickName: info.nickName
        })
        this.getMyFavorites()
      }
    })
  },

  //跳转到详情页
  goToDetail: function(e){
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },

  getMyFavorites: function(){
    //读取所有本地信息
    let info = wx.getStorageInfoSync()
    
    if (!info){
      console.log("未获取到信息")
    } else {
      let keys = info.keys
      console.log("keys = " + keys)
      let num = keys.length
      console.log("num = " + num)
      let myList = []
      for (var i = 0; i < num; i++){
        let obj = wx.getStorageSync(keys[i])
        myList.push(obj)
      }

      this.setData({
        newsList: myList,
        num: num
      })
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    num: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    console.log(this.data.isLogin)
    if (this.data.isLogin){
      //更新收藏列表
      this.getMyFavorites()
    }
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