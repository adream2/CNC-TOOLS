Page({
  data: {
    conversionType: 'mmr2mmm', // 'mmr2mmm' 转 mm/min, 'mmm2mmr' 转 mm/r
    sourceValue: '',
    rpm: '',
    showResult: false,
    conversionResult: '',
    sourceLabel: '每转进给量 (mm/r)',
    sourcePlaceholder: '每转进给量',
    targetLabel: '每分钟进给量',
    targetUnit: 'mm/min',
    formula: 'mm/min = mm/r × rpm'
  },

  bindConversionTypeChange: function(e) {
    const type = e.detail.value;
    let sourceLabel, sourcePlaceholder, targetLabel, targetUnit, formula;

    if (type === 'mmr2mmm') {
      sourceLabel = '每转进给量 (mm/r)';
      sourcePlaceholder = '每转进给量';
      targetLabel = '每分钟进给量';
      targetUnit = 'mm/min';
      formula = 'mm/min = mm/r × rpm';
    } else {
      sourceLabel = '每分钟进给量 (mm/min)';
      sourcePlaceholder = '每分钟进给量';
      targetLabel = '每转进给量';
      targetUnit = 'mm/r';
      formula = 'mm/r = mm/min ÷ rpm';
    }

    this.setData({
      conversionType: type,
      sourceLabel: sourceLabel,
      sourcePlaceholder: sourcePlaceholder,
      targetLabel: targetLabel,
      targetUnit: targetUnit,
      formula: formula,
      showResult: false
    });
  },

  bindSourceInput: function(e) {
    this.validateNumberInput(e, 'sourceValue');
    this.setData({ showResult: false });
  },

  bindRpmInput: function(e) {
    this.validateNumberInput(e, 'rpm');
    this.setData({ showResult: false });
  },

  validateNumberInput: function(e, field) {
    let value = e.detail.value.replace(/[^0-9.]/g, '');
    const dotIndex = value.indexOf('.');
    if (dotIndex !== -1) {
      value = value.slice(0, dotIndex + 1) + value.slice(dotIndex + 1).replace(/\./g, '');
    }
    this.setData({ [field]: value });
  },

  calculateConversion: function() {
    const { conversionType, sourceValue, rpm } = this.data;

    // 验证输入
    if (!sourceValue || !rpm || isNaN(parseFloat(sourceValue)) || isNaN(parseFloat(rpm)) || parseFloat(sourceValue) <= 0 || parseFloat(rpm) <= 0) {
      wx.showToast({
        title: '请输入有效的进给量和转速',
        icon: 'none'
      });
      return;
    }

    const value = parseFloat(sourceValue);
    const n = parseFloat(rpm);
    let result;

    if (conversionType === 'mmr2mmm') {
      // mm/min = mm/r × rpm
      result = value * n;
    } else {
      // mm/r = mm/min ÷ rpm
      result = value / n;
    }

    this.setData({
      showResult: true,
      conversionResult: result.toFixed(4)
    });
  }
})