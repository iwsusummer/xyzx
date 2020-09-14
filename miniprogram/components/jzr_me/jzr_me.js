// miniprogram/components/jzr_me/jzr_me.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    headi:'https://7879-xyzx-umkoo-1303013619.tcb.qcloud.la/my-image202081215711.png?sign=4eb53b2f92c4edbf9e7f2f6e2e046393&t=1600091863',
    userinfo:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init1(openidi) {
      // 获取用户信息
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      let userswheres = {}
      userswheres._openid = openidi
      var that = this
      db.collection('users').where(userswheres).get({
        success: res => {
          console.log(res.data.length)
          if(res.data.length>0){
            this.setData({
              userinfo: res.data[0],
              headi:res.data[0].head_url
            })
          }else{
            that.getInfo(openidi)
          }
          console.log('原始数据：',that.data.userinfo)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    },

    // 获取appid
    reqOpenid(){
      var that = this
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
          app.globalData.openid = res.result.openid
          console.log(res.result)
          that.init1(res.result.openid)
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
          alert('初始化失败')
        }
      })
    },

    /**
     * wqs_20200914 获取userinfo
     * @param {*} appid 
     */
    getInfo(appid){
      var that = this
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                console.log(res.userInfo)
                that.addinfo(res.userInfo,appid)
              }
            })
          }
        }
      })
    },

    /**
     * wqs_20200914添加数据
     */
    addinfo(wxinfo,openidi){
      const db = wx.cloud.database()
      var sexnum = wxinfo.gender
      var sexstr = ''
      if(sexnum == 1){
        sexstr = '男'
      }else{
        sexstr = '女'
      }
      db.collection('users').add({
        data: {
          '_openid':openidi,
          'cer_url':'',
          'head_url':wxinfo.avatarUrl,
          'nikename':wxinfo.nickName,
          'u_flag':'0',
          'u_name':'',
          'u_role':'',
          'u_sex':sexstr,
          'u_sfzhm':'',
          'ys_zy':''
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          wx.showToast({
            title: '新增记录成功',
          })
          // this.init1(openidi)
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }

  },

  // wqs_20200913 初始化时调用方法
  ready() {
    this.reqOpenid()
    // this.init1()
    // this.getInfo('123')
    
  },
})
