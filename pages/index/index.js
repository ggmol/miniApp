//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    income: Number,
    tax:0,
    untax: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  inputIncome: function (e) {
    var val = e.detail.value;
    this.setData({
      income: val
    });
  },

  calulateTax:  function(income, untaxAmount = 3500) {

    // tax list reference http://m.liuxiaoer.com/qy/1668.html
    var tax = 0;
    var untax = 0;

    untax = income - untaxAmount;

    while(untax > 0) {
      if (untax > 80000) {
        tax += (untax - 80000) * 0.45;
        untax = 80000;
      } else if (untax > 55000) {
        tax += (untax - 55000) * 0.35;
        untax = 55000;
      } else if (untax > 35000) {
        tax += (untax - 35000) * 0.30;
        untax = 35000;
      } else if (untax > 9000) {
        tax += (untax - 9000) * 0.25;
        untax = 9000;
      } else if (untax > 4500) {
        tax += (untax - 4500) * 0.20;
        untax = 4500;
      } else if (untax > 1500) {
        tax += (untax - 1500) * 0.10;
        untax = 1500;
      } else {
        tax += untax * 0.03;
        untax = 0;
      }
    }
    return tax;
  },

  tapSubmit: function(e) {
    if (isNaN(this.data.income)) {
      wx.showToast({
        title: 'Please enter a proper number',
        icon: 'none',
        duration: 2000
      })
      return;
    } else {
      this.data.tax = this.calulateTax(this.data.income);
      this.setData({
        tax: this.data.tax,
        income: this.data.income
      })
      console.log("submit clicked");
      console.log(this.data.tax);
      console.log(this.data.income);
      return;
    }
    // this.data.tax = this.data.income;
    
  },
  
  
})

