Page({
  data: {
    largeDiameter: '',
    smallDiameter: '',
    length: '',
    showResult: false,
    taperRatio: '',
    taperAngle: '',
    resultLabel: '',
    resultValue: ''
  },

  validateNumberInput(e, field) {
    let value = e.detail.value.replace(/[^0-9.]/g, '');
    const dotIndex = value.indexOf('.');
    if (dotIndex !== -1) {
      value = value.slice(0, dotIndex + 1) + value.slice(dotIndex + 1).replace(/\./g, '');
    }
    return value;
  },

  bindLargeDiameterInput: function(e) {
    const value = this.validateNumberInput(e, 'largeDiameter');
    if (value && (isNaN(value) || parseFloat(value) <= 0)) {
      wx.showToast({ title: '请输入有效的大端直径', icon: 'none' });
      return;
    }
    // 当输入第三个参数时自动清空第四个
      const hasThreeParams = [value, this.data.smallDiameter, this.data.length, this.data.taperRatio].filter(v => v).length >= 3;
      this.setData({
        largeDiameter: value,
        showResult: false,
        // 如果已有三个参数，清空锥度比
        // 当小端直径和锥长都存在时，清空锥度比
        taperRatio: this.data.smallDiameter && this.data.length ? '' : this.data.taperRatio
      }, () => {
      // 输入三个参数后自动计算
      const { smallDiameter, length, taperRatio } = this.data;
      const nonEmptyParams = [value, smallDiameter, length, taperRatio].filter(v => v);
      if (nonEmptyParams.length >= 3) {
        this.calculateTaper();
      }
    });
  },

  bindSmallDiameterInput: function(e) {
    const value = this.validateNumberInput(e, 'smallDiameter');
    if (value && (isNaN(value) || parseFloat(value) <= 0)) {
      wx.showToast({ title: '请输入有效的小端直径', icon: 'none' });
      return;
    }
    // 当输入第三个参数时自动清空第四个
      const hasThreeParams = [this.data.largeDiameter, value, this.data.length, this.data.taperRatio].filter(v => v).length >= 3;
      this.setData({
        smallDiameter: value,
        showResult: false,
        // 如果已有三个参数，清空锥度比
        // 当大端直径和锥长都存在时，清空锥度比
        taperRatio: this.data.largeDiameter && this.data.length ? '' : this.data.taperRatio
      }, () => {
      // 输入三个参数后自动计算
      const { largeDiameter, length, taperRatio } = this.data;
      const nonEmptyParams = [largeDiameter, value, length, taperRatio].filter(v => v);
      if (nonEmptyParams.length >= 3) {
        this.calculateTaper();
      }
    });
  },

  bindLengthInput: function(e) {
    const value = this.validateNumberInput(e, 'length');
    if (value && (isNaN(value) || parseFloat(value) <= 0)) {
      wx.showToast({ title: '请输入有效的锥长', icon: 'none' });
      return;
    }
    // 当输入第三个参数时自动清空第四个
      const hasThreeParams = [this.data.largeDiameter, this.data.smallDiameter, value, this.data.taperRatio].filter(v => v).length >= 3;
      this.setData({
        length: value,
        showResult: false,
        // 如果已有三个参数，清空锥度比
        // 当大端直径和小端直径都存在时，清空锥度比
        taperRatio: this.data.largeDiameter && this.data.smallDiameter ? '' : this.data.taperRatio
      });
  },

  bindManualTaperRatioInput: function(e) {
    const value = this.validateNumberInput(e, 'taperRatio');
    let formattedRatio = '';
    
    // 支持两种输入格式: 直接输入比值(如50)或完整格式(如1:50)
    if (value) {
      if (value.includes(':')) {
        const parts = value.split(':');
        if (parts.length === 2 && !isNaN(parseFloat(parts[0])) && !isNaN(parseFloat(parts[1])) && parseFloat(parts[0]) > 0 && parseFloat(parts[1]) > 0) {
          formattedRatio = value;
        } else {
          wx.showToast({ title: '锥度比格式应为X:Y', icon: 'none' });
          return;
        }
      } else if (!isNaN(value) && parseFloat(value) > 0) {
        formattedRatio = `1:${value}`;
      } else {
        wx.showToast({ title: '请输入有效的锥度比', icon: 'none' });
        return;
      }
    }
    
    // 当输入第三个参数时自动清空第四个
      const hasThreeParams = [this.data.largeDiameter, this.data.smallDiameter, this.data.length, formattedRatio].filter(v => v).length >= 3;
      const clearFields = hasThreeParams ? {
        // 保留当前输入的锥度比，清空其他三个参数中的一个
        ...(this.data.largeDiameter && this.data.smallDiameter ? { length: '' } : {}),
        ...(this.data.largeDiameter && this.data.length ? { smallDiameter: '' } : {}),
        ...(this.data.smallDiameter && this.data.length ? { largeDiameter: '' } : {})
      } : {};
      this.setData({
        taperRatio: formattedRatio,
        showResult: false,
        ...clearFields
      }, () => {
      // 输入三个参数后自动计算
      const { largeDiameter, smallDiameter, length } = this.data;
      const nonEmptyParams = [largeDiameter, smallDiameter, length, this.data.taperRatio].filter(v => v);
      if (nonEmptyParams.length >= 3) {
        this.calculateTaper();
      }
    });
  },

  calculateTaper: function() {
    // 解析输入参数
    const D = this.data.largeDiameter && !isNaN(parseFloat(this.data.largeDiameter)) ? parseFloat(this.data.largeDiameter) : null;
    const d = this.data.smallDiameter && !isNaN(parseFloat(this.data.smallDiameter)) ? parseFloat(this.data.smallDiameter) : null;
    const L = this.data.length && !isNaN(parseFloat(this.data.length)) ? parseFloat(this.data.length) : null;
    let K = null;
    let taperAngle = null;

    let simplifiedNumerator, simplifiedDenominator;
    // 解析锥度比
    if (this.data.taperRatio) {
      const ratioParts = this.data.taperRatio.split(':');
      if (ratioParts.length === 2 && !isNaN(parseFloat(ratioParts[0])) && !isNaN(parseFloat(ratioParts[1])) && parseFloat(ratioParts[0]) > 0 && parseFloat(ratioParts[1]) > 0) {
        K = parseFloat(ratioParts[0]) / parseFloat(ratioParts[1]);
        // 简化输入的锥度比
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const num = parseFloat(ratioParts[0]);
        const den = parseFloat(ratioParts[1]);
        
        // 简化比例
        const commonDivisor = gcd(Math.round(num * 1000), Math.round(den * 1000)) / 1000;
        simplifiedNumerator = num / commonDivisor;
        simplifiedDenominator = den / commonDivisor;
        
        // 确保分子为1（锥度比标准表示法）
        if (simplifiedNumerator !== 1) {
          simplifiedDenominator = simplifiedDenominator / simplifiedNumerator;
          simplifiedNumerator = 1;
        }
      } else {
        wx.showToast({ title: '锥度比格式不正确，应为X:Y', icon: 'none' });
        return;
      }
    }

    // 检查参数数量
    const paramCount = [D, d, L, K].filter(v => v !== null).length;
    if (paramCount < 3) {
      wx.showToast({ title: '请至少输入三个参数', icon: 'none' });
      return;
    }

    // 确保大端直径大于小端直径（如果两者都提供）
    if (D !== null && d !== null && D <= d) {
      wx.showToast({ title: '大端直径必须大于小端直径', icon: 'none' });
      return;
    }

    let resultLabel = '';
    let resultValue = 0;

    // 根据已知参数计算未知参数
    if (D === null) {
      // 计算大端直径 D = d + K * L
      resultValue = d + K * L;
      resultLabel = '大端直径 D (mm)';
    } else if (d === null) {
      // 计算小端直径 d = D - K * L
      resultValue = D - K * L;
      resultLabel = '小端直径 d (mm)';
    } else if (L === null) {
      // 计算锥长 L = (D - d) / K
      resultValue = (D - d) / K;
      resultLabel = '锥长 L (mm)';
    } else if (K === null) {
      // 计算锥度比 K = (D - d) / L
      K = (D - d) / L;
      
      // 锥度比通常表示为 1:X 形式（X = 1/K）
      simplifiedNumerator = 1;
      simplifiedDenominator = Number((1 / K).toFixed(1));
      
      // 格式化显示标准锥度比
      resultValue = `1:${simplifiedDenominator}`;
      resultLabel = '锥度比';
    }

    // 计算锥度角（如果D、d、L都已知）
    if (D !== null && d !== null && L !== null) {
      taperAngle = 2 * Math.atan((D - d) / (2 * L)) * (180 / Math.PI);
    }

    // 更新结果
    this.setData({
      showResult: true,
      resultLabel: resultLabel,
      resultValue: typeof resultValue === 'number' ? resultValue.toFixed(2) : resultValue,
      taperRatio: K !== null ? `${simplifiedNumerator}:${simplifiedDenominator}` : this.data.taperRatio,
      taperAngle: taperAngle !== null ? taperAngle.toFixed(2) : this.data.taperAngle
    });
  }
})