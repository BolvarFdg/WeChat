//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env:'test-2018bd',
      traceUser:true
    })
  }
})