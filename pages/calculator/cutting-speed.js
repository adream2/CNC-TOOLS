Page({
  data: {
    calculationType: 'speed', // 'speed' 计算线速度, 'rpm' 计算转速
    materialIndex: 0,
    diameter: '',
    rpm: '',
    speed: '',
    showResult: false,
    resultLabel: '',
    resultValue: '',
    resultUnit: '',
    showRecommendation: false,
    recommendationText: '',
    materials: ['低碳钢', '中碳钢', '高碳钢', '不锈钢', '铸铁', '铝合金', '铜合金', '钛合金']
  },

  bindCalculationTypeChange: function(e) {
    this.setData({
      calculationType: e.detail.value,
      showResult: false
    });
  },

  bindMaterialChange: function(e) {
    this.setData({
      materialIndex: e.detail.value,
      showResult: false
    });
  },

  validateNumberInput(e, field) {
    let value = e.detail.value.replace(/[^0-9.]/g, '');
    const dotIndex = value.indexOf('.');
    if (dotIndex !== -1) {
      value = value.slice(0, dotIndex + 1) + value.slice(dotIndex + 1).replace(/\./g, '');
    }
    this.setData({ [field]: value, showResult: false });
  },

  bindDiameterInput(e) { this.validateNumberInput(e, 'diameter'); },
  bindRpmInput(e) { this.validateNumberInput(e, 'rpm'); },
  bindSpeedInput(e) { this.validateNumberInput(e, 'speed'); },

  calculateResult: function() {
    const { calculationType, diameter, rpm, speed, materialIndex } = this.data;
    const material = this.data.materials[materialIndex];

    // 验证直径输入
    if (!diameter || isNaN(diameter) || parseFloat(diameter) <= 0) {
      wx.showToast({
        title: '请输入有效的直径',
        icon: 'none'
      });
      return;
    }

    const D = parseFloat(diameter); // 直径 mm
    let result;

    if (calculationType === 'speed') {
      // 计算线速度 V = (π × D × N) / 1000 (m/min)
      if (!rpm || isNaN(rpm) || parseFloat(rpm) <= 0) {
        wx.showToast({
          title: '请输入有效的转速',
          icon: 'none'
        });
        return;
      }

      const N = parseFloat(rpm); // 转速 rpm
      result = (Math.PI * D * N) / 1000;

      this.setData({
        showResult: true,
        resultLabel: '切削线速度',
        resultValue: result.toFixed(2),
        resultUnit: 'm/min'
      });
    } else {
      // 计算转速 N = (V × 1000) / (π × D) (rpm)
      if (!speed || isNaN(speed) || parseFloat(speed) <= 0) {
        wx.showToast({
          title: '请输入有效的线速度',
          icon: 'none'
        });
        return;
      }

      const V = parseFloat(speed); // 线速度 m/min
      result = (V * 1000) / (Math.PI * D);

      this.setData({
        showResult: true,
        resultLabel: '主轴转速',
        resultValue: Math.round(result),
        resultUnit: 'rpm'
      });
    }

    // 获取推荐切削参数
    this.getRecommendation(material, result, calculationType);
  },

  // 获取材料推荐切削参数
  getRecommendation: function(material, value, type) {
    // 不同材料的推荐切削速度范围 (m/min) - 硬质合金刀具
    const speedRecommendations = {
      '低碳钢': { min: 100, max: 200 },
      '中碳钢': { min: 80, max: 150 },
      '高碳钢': { min: 60, max: 120 },
      '不锈钢': { min: 50, max: 100 },
      '铸铁': { min: 70, max: 140 },
      '铝合金': { min: 300, max: 600 },
      '铜合金': { min: 200, max: 400 },
      '钛合金': { min: 30, max: 80 }
    };

    let recommendation = '';
    const materialData = speedRecommendations[material];

    if (type === 'speed') {
      // 当前计算的是线速度
      if (value < materialData.min) {
        recommendation = `当前速度(${value.toFixed(2)}m/min)低于推荐范围(${materialData.min}-${materialData.max}m/min)，可适当提高转速。`;
      } else if (value > materialData.max) {
        recommendation = `当前速度(${value.toFixed(2)}m/min)高于推荐范围(${materialData.min}-${materialData.max}m/min)，可能导致刀具过快磨损。`;
      } else {
        recommendation = `当前速度(${value.toFixed(2)}m/min)在推荐范围内(${materialData.min}-${materialData.max}m/min)。`;
      }
    } else {
      // 当前计算的是转速，需要转换为线速度进行推荐
      const speed = value * Math.PI * parseFloat(this.data.diameter) / 1000;
      if (speed < materialData.min) {
        recommendation = `当前转速对应线速度约${speed.toFixed(2)}m/min，低于${material}推荐范围(${materialData.min}-${materialData.max}m/min)。`;
      } else if (speed > materialData.max) {
        recommendation = `当前转速对应线速度约${speed.toFixed(2)}m/min，高于${material}推荐范围(${materialData.min}-${materialData.max}m/min)。`;
      } else {
        recommendation = `当前转速对应线速度约${speed.toFixed(2)}m/min，在${material}推荐范围内(${materialData.min}-${materialData.max}m/min)。`;
      }
    }

    this.setData({
      showRecommendation: true,
      recommendationText: recommendation
    });
  }
})