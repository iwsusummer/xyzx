// miniprogram/pages/xy_jzrhome/xy_jzrhome.js
import sqinfo from "../xy_shequ/xy_shequ";
// import xy_chat from "../xy_chat/xy_chat";
// import doc from "../xy_doctorList/xy_doctorList";

//console.log(doc)
Page({
  data: {
    active: 2,
   //  pages:"../xy_1/msg",
    // pages:"../xy_chat/xy_chat",
    pagedata:{msg:"1111"},
    value:"",
    // yslb:doc.yslb, // 医生列表
    sqlb:sqinfo.sqlb // 社区列表
    // xy_chat:xy_chat.msglist
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
    console.log(event.detail ,this.data.msg)
  },
});