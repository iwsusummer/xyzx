// wqs_20200913 湘医在线数据访问 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  // console.log(event)
  // console.log(context)

  // // 可执行其他自定义逻辑
  // // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  var d = await db.collection('users')
  .where({
    u_role: "1",
    u_flag: "1"
  })
  .get()
console.log("你好："+d)

  return {
    event,
    u_name:d.u_name,
    sq:d
  }
}