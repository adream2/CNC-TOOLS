Page({
  // 导航到机床类型代码页面
  navigateToMachine: function(e) {
    const machineType = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `./${machineType}/index`
    });
  },

  onLoad: function() {
    
  }
})