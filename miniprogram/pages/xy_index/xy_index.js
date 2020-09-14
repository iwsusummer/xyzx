// miniprogram/pages/xy_index/xy_index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result)
        app.globalData.openid = res.result.openid
        if("医生" === res.result.sq){
          wx.navigateTo({
            url: '../userConsole/userConsole',
          })
        }else{
          wx.navigateTo({
            url: '../xy_doctorLogin/xy_doctorLogin',
          })
        }
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../xy_doctorLogin/xy_doctorLogin',
        })
      }
    })
  },
})