// components/zjzx/xy_zjzx.js
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
    yslb:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init1() {
      console.log('王青松啊啊啊')
      // 获取用户信息
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      let userswheres = {}
      userswheres.u_role = '1'
      userswheres.u_flag = '1'
      var that = this
      db.collection('users').where(userswheres).get({
        success: res => {
          this.setData({
            yslb: res.data
          })
          // console.log('[数据库] [查询记录] 成功: ', res.data)
          console.log('原始数据：',that.data.yslb)
          // that.data.yslb = res.data
          // console.log('[数据库] [查询记录] 成功res: ', that.data.yslb)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }
  },

  // wqs_20200913 初始化时调用方法
  ready() {
    this.init1()
  },
})

