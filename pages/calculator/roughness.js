Page({
  data: {
    methodIndex: 0,
    toolIndex: 0,
    feed: '',
    radius: '',
    showResult: false,
    roughnessRa: '',
    actualRa: '',
    roughnessGrade: '',
    methods: ['车削', '铣削', '钻孔', '磨削', '研磨', '珩磨', '电火花加工', '线切割'],
    tools: ['硬质合金刀具', '高速钢刀具', '陶瓷刀具', '立方氮化硼(CBN)', '金刚石刀具']
  },

  bindMethodChange: function(e) {
    this.setData({
      methodIndex: e.detail.value
    });
  },

  bindToolChange: function(e) {
    this.setData({
      toolIndex: e.detail.value
    });
  },

  validateNumberInput(e, field) {
    let value = e.detail.value.replace(/[^0-9.]/g, '');
    const dotIndex = value.indexOf('.');
    if (dotIndex !== -1) {
      value = value.slice(0, dotIndex + 1) + value.slice(dotIndex + 1).replace(/\./g, '');
    }
    this.setData({ [field]: value });
  },

  bindFeedInput(e) { this.validateNumberInput(e, 'feed'); },
  bindRadiusInput(e) { this.validateNumberInput(e, 'radius'); },

  calculateRoughness: function() {
    const { methodIndex, toolIndex, feed, radius } = this.data;
    const method = this.data.methods[methodIndex];
    const tool = this.data.tools[toolIndex];

    // 验证输入
    if (!feed || !radius || isNaN(feed) || isNaN(radius) || parseFloat(feed) <= 0 || parseFloat(radius) <= 0) {
      wx.showToast({
        title: '请输入有效的进给量和刀尖半径',
        icon: 'none'
      });
      return;
    }

    const f = parseFloat(feed); // 进给量 mm/r
    const r = parseFloat(radius); // 刀尖圆弧半径 mm

    // 计算理论粗糙度 Ra (μm)
    // 公式: Ra = (f²) / (8r) * 1000 (转换为μm)
    let theoreticalRa = (f * f) / (8 * r) * 1000;

    // 根据加工方法和刀具类型应用修正系数
    const correctionFactors = this.getCorrectionFactors(method, tool);
    theoreticalRa *= correctionFactors.methodFactor * correctionFactors.toolFactor;

    // 计算实际参考粗糙度 (考虑其他因素)
    const actualRa = theoreticalRa * 1.5; // 实际值通常比理论值大

    // 确定粗糙度等级
    const roughnessGrade = this.getRoughnessGrade(actualRa);

    this.setData({
      showResult: true,
      roughnessRa: theoreticalRa.toFixed(2),
      actualRa: actualRa.toFixed(2),
      roughnessGrade: roughnessGrade
    });
  },

  // 获取加工方法和刀具的修正系数
  getCorrectionFactors: function(method, tool) {
    // 加工方法修正系数
    const methodFactors = {
      '车削': 1.0,
      '铣削': 1.2,
      '钻孔': 1.8,
      '磨削': 0.3,
      '研磨': 0.1,
      '珩磨': 0.2,
      '电火花加工': 2.0,
      '线切割': 1.5
    };

    // 刀具修正系数
    const toolFactors = {
      '硬质合金刀具': 1.0,
      '高速钢刀具': 1.1,
      '陶瓷刀具': 0.9,
      '立方氮化硼(CBN)': 0.7,
      '金刚石刀具': 0.6
    };

    return {
      methodFactor: methodFactors[method] || 1.0,
      toolFactor: toolFactors[tool] || 1.0
    };
  },

  // 根据Ra值确定表面粗糙度等级 (GB/T 1031-2009)
  getRoughnessGrade: function(raValue) {
    const grades = [
      { grade: 'N1', maxRa: 0.012 },
      { grade: 'N2', maxRa: 0.025 },
      { grade: 'N3', maxRa: 0.05 },
      { grade: 'N4', maxRa: 0.1 },
      { grade: 'N5', maxRa: 0.2 },
      { grade: 'N6', maxRa: 0.4 },
      { grade: 'N7', maxRa: 0.8 },
      { grade: 'N8', maxRa: 1.6 },
      { grade: 'N9', maxRa: 3.2 },
      { grade: 'N10', maxRa: 6.3 },
      { grade: 'N11', maxRa: 12.5 },
      { grade: 'N12', maxRa: 25 },
      { grade: 'N13', maxRa: 50 },
      { grade: 'N14', maxRa: 100 }
    ];

    // 找到最匹配的粗糙度等级
    for (let i = 0; i < grades.length; i++) {
      if (raValue <= grades[i].maxRa) {
        return grades[i].grade;
      }
    }

    return 'N14+ (>100μm)';
  }
})