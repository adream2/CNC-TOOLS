// angle-converter.js
Page({
  data: {
    // 度分秒转角度
    degrees: '',
    minutes: '',
    seconds: '',
    decimalAngle: '',
    // 角度转度分秒
    inputAngle: '',
    convertedDegrees: '',
    convertedMinutes: '',
    convertedSeconds: ''
  },

  validateNumberInput(e, field) {
    let value = e.detail.value.replace(/[^0-9.]/g, '');
    const dotIndex = value.indexOf('.');
    if (dotIndex !== -1) {
      value = value.slice(0, dotIndex + 1) + value.slice(dotIndex + 1).replace(/\./g, '');
    }
    this.setData({ [field]: value });
  },

  bindDegreesInput(e) { this.validateNumberInput(e, 'degrees'); },
  bindMinutesInput(e) { this.validateNumberInput(e, 'minutes'); },
  bindSecondsInput(e) { this.validateNumberInput(e, 'seconds'); },
  bindAngleInput(e) { this.validateNumberInput(e, 'inputAngle'); },

  // 度分秒转角度
  dmsToDecimal() {
    const { degrees, minutes, seconds } = this.data;
    const d = parseFloat(degrees) || 0;
    const m = parseFloat(minutes) || 0;
    const s = parseFloat(seconds) || 0;

    // 验证输入
    if (m < 0 || m >= 60 || s < 0 || s >= 60) {
      wx.showToast({ title: '分和秒必须在0-60之间', icon: 'none' });
      return;
    }

    const decimal = d + m / 60 + s / 3600;
    this.setData({
      decimalAngle: decimal.toFixed(6)
    });
  },

  // 角度转度分秒
  decimalToDms() {
    const { inputAngle } = this.data;
    let angle = parseFloat(inputAngle) || 0;

    const d = Math.floor(angle);
    const remaining = (angle - d) * 60;
    const m = Math.floor(remaining);
    const s = (remaining - m) * 60;

    this.setData({
      convertedDegrees: d,
      convertedMinutes: m,
      convertedSeconds: s.toFixed(2)
    });
  },

  // 输入绑定
  bindDegreesInput(e) { this.setData({ degrees: e.detail.value }); },
  bindMinutesInput(e) { this.setData({ minutes: e.detail.value }); },
  bindSecondsInput(e) { this.setData({ seconds: e.detail.value }); },
  bindAngleInput(e) { this.setData({ inputAngle: e.detail.value }); }
});