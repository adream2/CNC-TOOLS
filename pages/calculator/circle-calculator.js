Page({
  data: {
    p1x: '',
    p1y: '',
    p2x: '',
    p2y: '',
    p3x: '',
    p3y: '',
    centerX: '',
    centerY: '',
    radius: ''
  },
  bindP1XInput(e) { this.validateNumberInput(e, 'p1x'); },
  bindP1YInput(e) { this.validateNumberInput(e, 'p1y'); },
  bindP2XInput(e) { this.validateNumberInput(e, 'p2x'); },
  bindP2YInput(e) { this.validateNumberInput(e, 'p2y'); },
  bindP3XInput(e) { this.validateNumberInput(e, 'p3x'); },
  bindP3YInput(e) { this.validateNumberInput(e, 'p3y'); },
  
  validateNumberInput(e, field) {
    // 仅允许数字、小数点和负号，并确保格式正确
    let value = e.detail.value.replace(/[^-0-9.]/g, '');
    // 确保负号只能出现在开头
    if (value.indexOf('-') > 0) {
      value = value.replace(/-/g, '');
    }
    // 确保只有一个小数点
    const dotIndex = value.indexOf('.');
    if (dotIndex !== -1) {
      value = value.slice(0, dotIndex + 1) + value.slice(dotIndex + 1).replace(/\./g, '');
    }
    this.setData({ [field]: value });
  },

  calculateCircle() {
    const { p1x, p1y, p2x, p2y, p3x, p3y } = this.data;
    if (!p1x || !p1y || !p2x || !p2y || !p3x || !p3y) {
      wx.showToast({ title: '请输入所有坐标值', icon: 'none' });
      return;
    }
    const x1 = parseFloat(p1x), y1 = parseFloat(p1y);
    const x2 = parseFloat(p2x), y2 = parseFloat(p2y);
    const x3 = parseFloat(p3x), y3 = parseFloat(p3y);
    if ([x1, y1, x2, y2, x3, y3].some(isNaN)) {
      wx.showToast({ title: '请输入有效的数字', icon: 'none' });
      return;
    }
    // 计算圆心坐标 (x, y)
    const A = 2 * (x2 - x1);
    const B = 2 * (y2 - y1);
    const C = x2*x2 + y2*y2 - x1*x1 - y1*y1;
    const D = 2 * (x3 - x2);
    const E = 2 * (y3 - y2);
    const F = x3*x3 + y3*y3 - x2*x2 - y2*y2;
    const denominator = A * E - B * D;
    if (Math.abs(denominator) < 1e-6) {
      wx.showToast({ title: '三点共线，无法确定圆', icon: 'none' });
      this.setData({ centerX: '', centerY: '', radius: '' });
      return;
    }
    const centerX = (C * E - B * F) / denominator;
    const centerY = (A * F - C * D) / denominator;
    const radius = Math.sqrt(Math.pow(centerX - x1, 2) + Math.pow(centerY - y1, 2));
    this.setData({
      centerX: centerX.toFixed(4),
      centerY: centerY.toFixed(4),
      radius: radius.toFixed(4)
    });
  }
});