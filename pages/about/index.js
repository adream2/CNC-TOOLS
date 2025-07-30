Page({
  data: {
    showUpdateLog: false, // 控制更新日志弹窗显示
    updateLog: '' // 存储更新日志内容
  },
  onLoad: function(options) {
    // 页面加载时执行
  },
  onShareAppMessage: function() {
    // 分享功能
    return {
      title: '关于机械工具应用',
      path: '/pages/about/index'
    }
  },

  // 直接导入更新日志内容，避免文件系统权限问题
  viewUpdateLog() {
    // 设置更新日志内容并显示弹窗
    this.setData({
      updateLog: `
      2025-07-28：版本1.0.2更新：
        1、优化了文章页面解析问题，增加了评论功能。
      2025-07-22: 版本1.0.1更新：
        1、优化圆周均布点计算器功能，实现一键清空输入内容及计算结果的复制
        2、修正在Android客户端上航标查询功能无法输入小数点
        3、增加更新日志功能，用户可以查看最近的更新内容
        
      2023-07-15: 版本1.0.0发布，初始版本`,
      showUpdateLog: true
    });
  },
  
  // 关闭更新日志弹窗
  closeUpdateLog() {
    this.setData({
      showUpdateLog: false
    });
  },
});