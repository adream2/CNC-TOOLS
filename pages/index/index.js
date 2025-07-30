Page({
  data: {
    // 首页功能导航列表
    navItems: [
      {
        icon: 'text:tolerance',
        text: '公差查询',
        subItems: [
          { name: '孔轴公差', path: '/pages/tolerance/hole-shaft' },
          { name: '自由公差', path: '/pages/tolerance/free' }
        ]
      },
      {
        icon: 'text:thread',
        text: '螺纹查询',
        subItems: [
          { name: '公制螺纹', path: '/pages/thread/metric' },
          { name: '英制螺纹', path: '/pages/thread/imperial' },
          { name: '美制螺纹', path: '/pages/thread/american' },
          { name: '英制锥螺纹', path: '/pages/thread/british-taper' },
          { name: '美制锥螺纹', path: '/pages/thread/american-taper' },
          { name: 'AG螺纹', path: '/pages/thread/ag' }
        ]
      },
      {
        icon: 'text:calculator',
        text: '常用计算',
        subItems: [
          { name: '表面粗糙度', path: '/pages/calculator/roughness' },
          { name: '切削线速度', path: '/pages/calculator/cutting-speed' },
          { name: '锥度计算', path: '/pages/calculator/taper' },
          { name: '进给量转换', path: '/pages/calculator/feed-conversion' },
          { name: '极坐标转换', path: '/pages/calculator/polar-cartesian-converter' }
        ]
      }
    ]
  },

  onLoad: function() {
    // 页面加载时初始化数据
    
  },

  // 导航到子页面
  navigateToPage: function(e) {
    const path = e.currentTarget.dataset.path;
    if (path) {
      wx.navigateTo({
        url: path
      });
    }
  },

  // 分享功能
  onShareAppMessage: function() {
    return {
      title: '数控（CNC）工具集',
      path: '/pages/index/index',
      imageUrl: ''
    };
  }
})