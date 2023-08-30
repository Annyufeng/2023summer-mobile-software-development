var num = [
  ['00', '01', '02'],
  ['10', '11', '12'],
  ['20', '21', '22']
]

var w = 100

var url = "/images/pic01.jpg"

// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWin: false
  },

  restartGame: function(){
    this.setData({isWin: false})
    this.shuffle()
    this.drawCanvas()
  },

  //判断游戏是否成功
  isWin: function(){
    for (var i = 0; i < 3; i++){
      for ( var j = 0; j < 3; j++){
        if (num[i][j] != i * 10 + j){
          return false
        }
      }
    }

    this.setData({isWin:true})
    return true
  },

  // 随机打乱函数
  shuffle: function(){
    num = [
      ['00', '01', '02'],
      ['10', '11', '12'],
      ['20', '21', '22']
    ]
    var row = 2
    var col = 2
    //打乱方块顺序100次
    for (var i = 0; i < 100; i++){
      var direction = Math.round(Math.random() * 3)
      if (direction == 0){
        if (row != 0){
          num[row][col] = num[row - 1][col]
          num[row - 1][col] = '22'
          row -= 1
        }
      }
      else if (direction == 1){
        if (row != 2){
          num[row][col] = num[row + 1][col]
          num[row + 1][col] = '22'
          row += 1
        }
      }
      else if (direction == 2){
        if (col != 0){
          num[row][col] = num[row][col - 1]
          num[row][col - 1] = '22'
          col -= 1
        }
      }
      else if (direction == 3){
        if (col != 2){
          num[row][col] = num[row][col + 1]
          num[row][col + 1] = '22'
          col += 1
        }
      }
    }
  },

  // 绘制画布内容
  drawCanvas: function(){
    let ctx = this.ctx

    //清空画布
    ctx.clearRect(0, 0, 300, 300)

    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
        if (num[i][j] != '22'){
          var row = parseInt(num[i][j] / 10)
          var col = num[i][j] % 10
          ctx.drawImage(url, col * w, row * w, w, w, j * w, i * w, w, w)
        }
      }
    }

    ctx.draw()
  },

  // 监听点击方块事件
  touchBox: function(e){
    //如果游戏已经成功，则不做任何操作
    if (this.data.isWin){
      return
    }

    var x = e.changedTouches[0].x
    var y = e.changedTouches[0].y
    var row = parseInt(y / w)
    var col = parseInt(x / w)

    if (num[row][col] != '22'){
      this.moveBox(row, col)
      this.drawCanvas()

      //判断游戏是否成功
      if (this.isWin()){
        let ctx = this.ctx

        ctx.drawImage(url, 0, 0)

        ctx.setFillStyle("#e64340")
        ctx.setTextAlign("center")
        ctx.setFontSize(60)
        ctx.fillText("游戏成功", 150, 150)
        ctx.draw()
      }
    }
  },

  //移动被点击的方块
  moveBox: function(i, j){
    if (i > 0){
      if (num[i - 1][j] == '22'){
        num[i - 1][j] = num[i][j]
        num[i][j] = '22'
        return
      }
    }
    if (i < 2){
      if (num[i + 1][j] == '22'){
        num[i + 1][j] = num[i][j]
        num[i][j] = '22'
        return
      }
    }
    if (j > 0){
      if (num[i][j - 1] == '22'){
        num[i][j - 1] = num[i][j]
        num[i][j] = '22'
        return
      }
    }
    if (j < 2){
      if (num[i][j + 1] == '22'){
        num[i][j + 1] = num[i][j]
        num[i][j] = '22'
        return
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //更新图片路径地址提示图
    url = '/images/'+options.level
    //更新提示图的地址
    this.setData({url:url})
    //创建画布上下文
    this.ctx=wx.createCanvasContext('myCanvas')
    //打乱方块顺序
    this.shuffle()
    //绘制画布内容
    this.drawCanvas()
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