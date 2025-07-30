Page({
  data: {
    // 极坐标输入
    radius: '',
    angle: '',
    angleUnit: 'degree', // degree or radian
    // 直角坐标输入
    x: '',
    y: '',
    // 结果
    cartesianResult: '',
    polarResult: ''
  },
  
  // 极坐标转直角坐标
  polarToCartesian() {
    const r = parseFloat(this.data.radius);
    const angle = parseFloat(this.data.angle);
    if (isNaN(r) || isNaN(angle)) {
      wx.showToast({ title: '请输入有效的数值', icon: 'none' });
      return;
    }
    
    const theta = this.data.angleUnit === 'degree' ? angle * Math.PI / 180 : angle;
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    
    this.setData({
      cartesianResult: `X: ${x.toFixed(4)}, Y: ${y.toFixed(4)}`,
      x: x.toFixed(4),
      y: y.toFixed(4)
    });
  },
  
  // 直角坐标转极坐标
  cartesianToPolar() {
    const x = parseFloat(this.data.x);
    const y = parseFloat(this.data.y);
    if (isNaN(x) || isNaN(y)) {
      wx.showToast({ title: '请输入有效的数值', icon: 'none' });
      return;
    }
    
    const r = Math.sqrt(x * x + y * y);
    let theta = Math.atan2(y, x);
    if (this.data.angleUnit === 'degree') {
      theta = theta * 180 / Math.PI;
    }
    
    this.setData({
      polarResult: `R: ${r.toFixed(4)}, θ: ${theta.toFixed(4)}${this.data.angleUnit === 'degree' ? '°' : 'rad'}`,
      radius: r.toFixed(4),
      angle: theta.toFixed(4)
    });
  },
  
  // 输入处理函数
  bindRadiusInput(e) {
    this.setData({ radius: e.detail.value });
  },
  
  bindAngleInput(e) {
    this.setData({ angle: e.detail.value });
  },
  
  bindXInput(e) {
    this.setData({ x: e.detail.value });
  },
  
  bindYInput(e) {
    this.setData({ y: e.detail.value });
  },
  
  // 切换角度单位
  switchAngleUnit() {
    this.setData({
      angleUnit: this.data.angleUnit === 'degree' ? 'radian' : 'degree'
    });
  }
});