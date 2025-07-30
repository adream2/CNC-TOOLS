Page({
  data: {
    p1x: '',
    p1y: '',
    p2x: '',
    p2y: '',
    distance: ''
  },

  validateCoordinateInput(e, field) {
    let value = e.detail.value.replace(/[^-0-9.]/g, '');
    // 确保负号只出现一次且在开头
    if (value.indexOf('-') > 0) value = value.replace(/-/g, '');
    // 确保只有一个小数点
    const dotIndex = value.indexOf('.');
    if (dotIndex !== -1) {
      value = value.slice(0, dotIndex + 1) + value.slice(dotIndex + 1).replace(/\./g, '');
    }
    this.setData({ [field]: value });
  },
  bindP1XInput(e) {
    this.validateCoordinateInput(e, 'p1x');
  },
  bindP1YInput(e) {
    this.validateCoordinateInput(e, 'p1y');
  },
  bindP2XInput(e) {
    this.validateCoordinateInput(e, 'p2x');
  },
  bindP2YInput(e) {
    this.validateCoordinateInput(e, 'p2y');
  },
  calculateDistance() {
    const { p1x, p1y, p2x, p2y } = this.data;
    if (!p1x || !p1y || !p2x || !p2y) {
      wx.showToast({ title: '请输入所有坐标值', icon: 'none' });
      return;
    }
    const x1 = parseFloat(p1x), y1 = parseFloat(p1y);
    const x2 = parseFloat(p2x), y2 = parseFloat(p2y);
    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
      wx.showToast({ title: '请输入有效的数字', icon: 'none' });
      return;
    }
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy).toFixed(4);
    this.setData({ distance });
  }
});