Page({
  data: {
    x0: '',
    y0: '',
    x1: '',
    y1: '',
    angle: '',
    x2: null,
    y2: null,
    showResult: false,
    formula: '',
    formulaLines: []
  },

  bindX0Input(e) {
    this.setData({ x0: e.detail.value });
  },

  bindY0Input(e) {
    this.setData({ y0: e.detail.value });
  },

  bindX1Input(e) {
    this.setData({ x1: e.detail.value });
  },

  bindY1Input(e) {
    this.setData({ y1: e.detail.value });
  },

  bindAngleInput(e) {
    this.setData({ angle: e.detail.value });
  },

  calculateRotation() {
    const { x0, y0, x1, y1, angle } = this.data;
    
    // 验证输入
    if (!x1 || !y1 || !angle) {
      wx.showToast({ title: '请输入P1坐标和旋转角度', icon: 'none' });
      return;
    }

    // 验证输入是否为有效数字
    if (isNaN(parseFloat(x1)) || isNaN(parseFloat(y1)) || isNaN(parseFloat(angle))) {
      wx.showToast({ title: '请输入有效的数字', icon: 'none' });
      return;
    }

    // 转换为数值，处理默认圆心
    const X0 = x0 ? parseFloat(x0) : 0;
    const Y0 = y0 ? parseFloat(y0) : 0;
    const X1 = parseFloat(x1);
    const Y1 = parseFloat(y1);
    const R = parseFloat(angle);
    const θ = R * Math.PI / 180; // 角度转弧度

    // 计算旋转后的坐标
    const XPrime = X1 - X0;
    const YPrime = Y1 - Y0;
    const X2 = XPrime * Math.cos(θ) - YPrime * Math.sin(θ) + X0;
    const Y2 = XPrime * Math.sin(θ) + YPrime * Math.cos(θ) + Y0;

    // 构建公式字符串
    let formula;
    if (x0 || y0) {
      formula = `X2 = (${X1}-${X0})×cos(${R}°) - (${Y1}-${Y0})×sin(${R}°) + ${X0}\nY2 = (${X1}-${X0})×sin(${R}°) + (${Y1}-${Y0})×cos(${R}°) + ${Y0}`;
    } else {
      formula = `X2 = ${X1}×cos(${R}°) - ${Y1}×sin(${R}°)\nY2 = ${X1}×sin(${R}°) + ${Y1}×cos(${R}°)`;
    }

    // 检查计算结果是否有效
    if (isNaN(X2) || isNaN(Y2)) {
      wx.showToast({ title: '计算出错，请检查输入', icon: 'none' });
      return;
    }

    
    
    // 格式化结果为四位小数
    const formattedX2 = X2.toFixed(4);
    const formattedY2 = Y2.toFixed(4);
    this.setData({
      x2: formattedX2,
      y2: formattedY2,
      showResult: true,
      formula: formula,
      formulaLines: formula.split('\n')
    });
  }
});