Page({
  data: {
    baseX: '',
    baseY: '',
    radius: '',
    holeCount: '',
    startAngle: '',
    showResult: false,
    points: []
  },

  validateNumberInput(e) {
    let value = e.detail.value.replace(/[^0-9.]/g, '');
    const dotIndex = value.indexOf('.');
    if (dotIndex !== -1) {
      value = value.slice(0, dotIndex + 1) + value.slice(dotIndex + 1).replace(/\./g, '');
    }
    return value;
  },

  bindBaseXInput(e) {
    this.setData({ baseX: this.validateNumberInput(e) });
  },

  bindBaseYInput(e) {
    this.setData({ baseY: this.validateNumberInput(e) });
  },

  bindRadiusInput(e) {
    this.setData({ radius: this.validateNumberInput(e) });
  },

  bindHoleCountInput(e) {
    let value = e.detail.value.replace(/[^0-9]/g, '');
    this.setData({ holeCount: value });
  },

  bindStartAngleInput(e) {
    this.setData({ startAngle: this.validateNumberInput(e) });
  },

  calculate() {
    const { baseX, baseY, radius, holeCount, startAngle } = this.data;
    const points = [];

    // 验证输入
    if (!baseX || !baseY || !radius || !holeCount || !startAngle) {
      console.log('验证失败: 缺少参数');
      wx.showToast({ title: '请填写所有参数', icon: 'none' });
      return;
    }

    const baseXNum = parseFloat(baseX);
    const baseYNum = parseFloat(baseY);
    const radiusNum = parseFloat(radius);
    const holeCountNum = parseInt(holeCount);
    const startAngleNum = parseFloat(startAngle);

    if (isNaN(baseXNum) || isNaN(baseYNum) || isNaN(radiusNum) || isNaN(holeCountNum) || isNaN(startAngleNum)) {
      wx.showToast({ title: '输入参数格式错误', icon: 'none' });
      return;
    }

    if (holeCountNum < 1) {
      wx.showToast({ title: '孔数必须大于0', icon: 'none' });
      return;
    }

    // 计算每个孔的坐标
    const angleStep = 360 / holeCountNum;
    for (let i = 0; i < holeCountNum; i++) {
      const currentAngle = startAngleNum + angleStep * i;
      const angleRad = currentAngle * Math.PI / 180;
      const x = baseXNum + radiusNum * Math.cos(angleRad);
      const y = baseYNum + radiusNum * Math.sin(angleRad);

      points.push({ x: x.toFixed(4), y: y.toFixed(4) });
    }

    this.setData({ points, showResult: true });
  },

  clearInput() {
    this.setData({
      baseX: '',
      baseY: '',
      radius: '',
      holeCount: '',
      startAngle: '',
      showResult: false,
      points: []
    });
  },

  copyResult() {
    const { points } = this.data;
    if (!points.length) {
      wx.showToast({ title: '暂无结果可复制', icon: 'none' });
      return;
    }
    
    // 构建复制文本
    let text = '';
    points.forEach((point) => {
      text += `X${point.x} Y${point.y}\n`;
    });
    
    // 复制到剪贴板
    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({ title: '复制成功', icon: 'success' });
      },
      fail: () => {
        wx.showToast({ title: '复制失败', icon: 'none' });
      }
    });
  }
})