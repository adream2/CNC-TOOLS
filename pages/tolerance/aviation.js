Page({
  data: {
    diameter: '',
    toleranceClassIndex: 0,
    toleranceClasses: ['I级', 'II级'],
    type: 'length',
    showResult: false,
    upperDeviation: '',
    lowerDeviation: '',
    toleranceRange: ''
  },

  bindDiameterInput(e) {
    this.setData({
      diameter: e.detail.value
    });
  },

  bindToleranceClassChange(e) {
    this.setData({
      toleranceClassIndex: parseInt(e.detail.value)
    }, () => {
      this.calculateAviationTolerance();
    });
  },

  bindTypeChange(e) {
    this.setData({
      type: e.detail.value
    }, () => {
      this.calculateAviationTolerance();
    });
  },

  calculateAviationTolerance() {
    const { diameter, toleranceClassIndex, type } = this.data;
    const toleranceClass = this.data.toleranceClasses[toleranceClassIndex];

    if (!diameter || isNaN(diameter) || parseFloat(diameter) <= 0) {
      wx.showToast({
        title: '请输入有效的基本尺寸',
        icon: 'none'
      });
      return;
    }

    const d = parseFloat(diameter);
    let upperDeviation, lowerDeviation, toleranceRange;

    if (type === 'length') {
      [upperDeviation, lowerDeviation] = this.calculateLengthTolerance(d, toleranceClass);
    } else if (type === 'outer') {
      [upperDeviation, lowerDeviation] = this.calculateOuterDiameterTolerance(d, toleranceClass);
    } else {
      [upperDeviation, lowerDeviation] = this.calculateInnerDiameterTolerance(d, toleranceClass);
    }

    if (upperDeviation === Math.abs(lowerDeviation)) {
      toleranceRange = `±${upperDeviation.toFixed(3)} mm`;
    } else if (upperDeviation === 0) {
      toleranceRange = `+0/-${Math.abs(lowerDeviation).toFixed(3)} mm`;
    } else if (lowerDeviation === 0) {
      toleranceRange = `+${upperDeviation.toFixed(3)}/-0 mm`;
    } else {
      toleranceRange = `+${upperDeviation.toFixed(3)}/-${Math.abs(lowerDeviation).toFixed(3)} mm`;
    }

    this.setData({
      showResult: true,
      upperDeviation: upperDeviation.toFixed(3),
      lowerDeviation: lowerDeviation.toFixed(3),
      toleranceRange: toleranceRange
    });
  },

  // HB5800-2022 长度尺寸公差计算
  calculateLengthTolerance(d, classType) {
    const classes = {
      'I级': [0.08, 0.12, 0.18, 0.25, 0.4, 0.6],
      'II级': [0.15, 0.25, 0.4, 0.6, 1.0, 1.6]
    };

    let index;
    if (d <= 3) index = 0;
    else if (d <= 6) index = 1;
    else if (d <= 30) index = 2;
    else if (d <= 120) index = 3;
    else if (d <= 400) index = 4;
    else index = 5;

    const tolerance = classes[classType][index];
    return [tolerance, -tolerance];
  },

  // HB5800-2022 外径尺寸公差计算
  calculateOuterDiameterTolerance(d, classType) {
    const classes = {
      'I级': [0, 0, -0.08, -0.15, -0.25, -0.4],
      'II级': [0, 0, -0.15, -0.3, -0.5, -0.8]
    };

    let index;
    if (d <= 3) index = 0;
    else if (d <= 6) index = 1;
    else if (d <= 30) index = 2;
    else if (d <= 120) index = 3;
    else if (d <= 400) index = 4;
    else index = 5;

    return [0, classes[classType][index]];
  },

  // HB5800-2022 内径尺寸公差计算
  calculateInnerDiameterTolerance(d, classType) {
    const classes = {
      'I级': [0.08, 0.12, 0.18, 0.25, 0.4, 0.6],
      'II级': [0.15, 0.25, 0.4, 0.6, 1.0, 1.6]
    };

    let index;
    if (d <= 3) index = 0;
    else if (d <= 6) index = 1;
    else if (d <= 30) index = 2;
    else if (d <= 120) index = 3;
    else if (d <= 400) index = 4;
    else index = 5;

    return [classes[classType][index], 0];
  }
})