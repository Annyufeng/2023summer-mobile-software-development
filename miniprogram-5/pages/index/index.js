// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    levels :[
      'pic01.jpg',
      'pic02.jpg',
      'pic03.jpg',
      'pic04.jpg',
      'pic05.jpg',
      'pic06.jpg'
    ]
  },
  chooseLevel: function(e){
    let level = e.currentTarget.dataset.level
    wx.navigateTo({
      url: '../game/game?level=' + level ,
    })
  },
})