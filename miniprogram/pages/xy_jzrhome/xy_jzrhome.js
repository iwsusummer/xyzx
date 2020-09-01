// miniprogram/pages/xy_jzrhome/xy_jzrhome.js
Page({
  data: {
    active: 0,
    pages:"../xy_1/msg",
    pagedata:{msg:"1111"},
    value:""
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
    console.log(event.detail ,this.data.msg)
  },
});