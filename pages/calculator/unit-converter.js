// 多领域单位换算核心逻辑
// 单位数据模型遵循GB 3100-1993和ISO 1000标准
Page({
  data: {
    // 领域分类：机械/日常/计算机
    domains: ['机械工程', '日常生活', '计算机科学'],
    selectedDomain: 0,
    
    // 单位类别（动态加载）
    categories: [],
    selectedCategory: 0,
    
    // 单位列表（动态加载）
    fromUnits: [],
    toUnits: [],
    selectedFromUnit: 0,
    selectedToUnit: 1,
    
    // 转换数据
    inputValue: '',
    resultValue: '0.000',
    precision: 3
  },

  onLoad() {
    // 初始化单位数据库
    this.unitDatabase = this.initUnitDatabase();
    // 默认加载机械工程领域单位
    this.loadDomainUnits(0);
  },

  // 初始化多领域单位数据库
  initUnitDatabase() {
    return {
      // 机械工程领域单位
      mechanical: [
        {
          category: '长度',
          units: [
            { name: '毫米(mm)', factor: 1, system: 'metric' },
            { name: '厘米(cm)', factor: 10, system: 'metric' },
            { name: '米(m)', factor: 1000, system: 'metric' },
            { name: '英寸(in)', factor: 25.4, system: 'imperial' },
            { name: '英尺(ft)', factor: 304.8, system: 'imperial' },
            { name: '码(yd)', factor: 914.4, system: 'imperial' }
          ]
        },
        {
          category: '质量',
          units: [
            { name: '克(g)', factor: 1, system: 'metric' },
            { name: '千克(kg)', factor: 1000, system: 'metric' },
            { name: '吨(t)', factor: 1e6, system: 'metric' },
            { name: '盎司(oz)', factor: 28.3495, system: 'imperial' },
            { name: '磅(lb)', factor: 453.592, system: 'imperial' }
          ]
        },
        {
          category: '力',
          units: [
            { name: '牛(N)', factor: 1, system: 'metric' },
            { name: '千牛(kN)', factor: 1000, system: 'metric' },
            { name: '磅力(lbf)', factor: 4.44822, system: 'imperial' },
            { name: '千克力(kgf)', factor: 9.80665, system: 'metric' }
          ]
        },
        {
          category: '扭矩',
          units: [
            { name: '牛·米(N·m)', factor: 1, system: 'metric' },
            { name: '千克·米(kg·m)', factor: 9.80665, system: 'metric' },
            { name: '磅·英尺(lb·ft)', factor: 1.35582, system: 'imperial' },
            { name: '磅·英寸(lb·in)', factor: 0.112985, system: 'imperial' }
          ]
        },

        {
          category: '功率',
          units: [
            { name: '瓦特(W)', factor: 1, system: 'metric' },
            { name: '千瓦(kW)', factor: 1000, system: 'metric' },
            { name: '马力(HP)', factor: 745.7, system: 'imperial' },
            { name: '英尺·磅/秒(ft·lb/s)', factor: 1.35582, system: 'imperial' }
          ]
        },
        {
          category: '能量',
          units: [
            { name: '焦耳(J)', factor: 1, system: 'metric' },
            { name: '千焦(kJ)', factor: 1000, system: 'metric' },
            { name: '千卡(kcal)', factor: 4184, system: 'metric' },
            { name: '英尺·磅(ft·lb)', factor: 1.35582, system: 'imperial' }
          ]
        },
        {
          category: '角速度',
          units: [
            { name: '转/分钟(rpm)', factor: 1 },
            { name: '弧度/秒(rad/s)', factor: 0.104719755 },
            { name: '度/秒(°/s)', factor: 6 },
            { name: '转/秒(rps)', factor: 60 }
          ]
        },
        {
          category: '流量',
          units: [
            { name: '立方米/小时(m³/h)', factor: 1 },
            { name: '升/分钟(L/min)', factor: 16.6667 },
            { name: '加仑/分钟(美)(gal/min)', factor: 4.40287 },
            { name: '立方英尺/分钟(ft³/min)', factor: 0.588578 }
          ]
        },
        {
          category: '密度',
          units: [
            { name: '千克/立方米(kg/m³)', factor: 1, system: 'metric' },
            { name: '克/立方厘米(g/cm³)', factor: 1000, system: 'metric' },
            { name: '吨/立方米(t/m³)', factor: 1000, system: 'metric' },
            { name: '磅/立方英尺(lb/ft³)', factor: 16.0185, system: 'imperial' }
          ]
        },
        {
          category: '粘度',
          units: [
            { name: '帕斯卡·秒(Pa·s)', factor: 1, system: 'metric' },
            { name: '厘泊(cP)', factor: 0.001, system: 'metric' },
            { name: '泊(P)', factor: 0.1, system: 'metric' },
            { name: '磅/(英尺·秒)(lb/(ft·s))', factor: 1.48816, system: 'imperial' }
          ]
        },
        {
          category: '电学',
          units: [
            { name: '伏特(V)', factor: 1, system: 'metric' },
            { name: '千伏(kV)', factor: 1000, system: 'metric' },
            { name: '毫伏(mV)', factor: 0.001, system: 'metric' },
            { name: '安培(A)', factor: 1, system: 'metric' },
            { name: '毫安(mA)', factor: 0.001, system: 'metric' },
            { name: '欧姆(Ω)', factor: 1, system: 'metric' },
            { name: '千欧(kΩ)', factor: 1000, system: 'metric' }
          ]
        },
        {
          category: '热传导',
          units: [
            { name: '瓦特/(米·开尔文)(W/(m·K))', factor: 1, system: 'metric' },
            { name: 'BTU/(小时·英尺·华氏度)(BTU/(h·ft·°F))', factor: 0.577789, system: 'imperial' },
            { name: '卡路里/(秒·厘米·摄氏度)(cal/(s·cm·°C))', factor: 418.68, system: 'metric' },
            { name: '热通量(W/m²)', factor: 1, system: 'metric' },
            { name: 'BTU/(小时·平方英尺)(BTU/(h·ft²))', factor: 3.15459, system: 'imperial' }
          ]
        },
        {
          category: '表面粗糙度',
          units: [
            { name: '微米(μm)', factor: 1, system: 'metric' },
            { name: '微英寸(μin)', factor: 0.0254, system: 'imperial' },
            { name: 'RMS微米', factor: 1, system: 'metric' },
            { name: 'RMS微英寸', factor: 0.0254, system: 'imperial' }
          ]
        },
        {
          category: '材料力学',
          units: [
            { name: '帕斯卡(Pa)', factor: 1, system: 'metric' },
            { name: '兆帕(MPa)', factor: 1e6, system: 'metric' },
            { name: '千兆帕(GPa)', factor: 1e9, system: 'metric' },
            { name: '磅力/平方英寸(psi)', factor: 6894.76, system: 'imperial' },
            { name: '千磅力/平方英寸(kpsi)', factor: 6.89476e6, system: 'imperial' },
            { name: '应变(%)', factor: 0.01, system: 'metric' },
            { name: '杨氏模量(Pa)', factor: 1, system: 'metric' },
            { name: '杨氏模量(GPa)', factor: 1e9, system: 'metric' },
            { name: '杨氏模量(psi)', factor: 6894.76, system: 'imperial' },
            { name: '巴(bar)', factor: 1e5, system: 'metric' },
            { name: '标准大气压(atm)', factor: 101325, system: 'metric' },
            { name: '毫米汞柱(mmHg)', factor: 133.322, system: 'metric' }
          ]
        },
        {
          category: '振动',
          units: [
            { name: '毫米/秒(mm/s)', factor: 1, system: 'metric' },
            { name: '英寸/秒(in/s)', factor: 25.4, system: 'imperial' },
            { name: '重力加速度(g)', factor: 9806.65, system: 'metric' },
            { name: '微米(μm)', factor: 1, system: 'metric' },
            { name: '密耳(mil)', factor: 25.4, system: 'imperial' }
          ]
        },
        {
          category: '温度',
          units: [
            { name: '摄氏度(°C)', factor: 1, converter: (v) => v, reverseConverter: (v) => v },
            { name: '华氏度(°F)', factor: 1, converter: (v) => (v - 32) * 5/9, reverseConverter: (v) => v * 9/5 + 32 },
            { name: '开尔文(K)', factor: 1, converter: (v) => v - 273.15, reverseConverter: (v) => v + 273.15 }
          ]
        },
        {
          category: '扭矩',
          units: [
            { name: '牛顿·米(N·m)', factor: 1, system: 'metric' },
            { name: '磅·英尺(lb·ft)', factor: 1.35582, system: 'imperial' },
            { name: '千克力·米(kgf·m)', factor: 0.101972, system: 'metric' }
          ]
        }
      ],
      
      // 日常生活领域单位
      daily: [
        {
          category: '温度',
          units: [
            { name: '摄氏度(°C)', factor: 1, converter: (v) => v, reverseConverter: (v) => v },
            { name: '华氏度(°F)', factor: 1, converter: (v) => v * 9/5 + 32, reverseConverter: (v) => (v - 32) * 5/9 },
            { name: '开尔文(K)', factor: 1, converter: (v) => v + 273.15, reverseConverter: (v) => v - 273.15 }
          ]
        },
        {
          category: '面积',
          units: [
            { name: '平方米(m²)', factor: 1, system: 'metric' },
            { name: '平方分米(dm²)', factor: 0.01, system: 'metric' },
            { name: '平方厘米(cm²)', factor: 0.0001, system: 'metric' },
            { name: '平方英寸(in²)', factor: 0.00064516, system: 'imperial' },
            { name: '平方英尺(ft²)', factor: 0.092903, system: 'imperial' }
          ]
        },
        {
          category: '体积',
          units: [
            { name: '立方米(m³)', factor: 1, system: 'metric' },
            { name: '升(L)', factor: 0.001, system: 'metric' },
            { name: '毫升(mL)', factor: 1e-6, system: 'metric' },
            { name: '加仑(美)(gal)', factor: 0.00378541, system: 'imperial' },
            { name: '加仑(英)(gal)', factor: 0.00454609, system: 'imperial' }
          ]
        },
        {
          category: '速度',
          units: [
            { name: '千米/小时(km/h)', factor: 1 },
            { name: '米/秒(m/s)', factor: 3.6 },
            { name: '英里/小时(mph)', factor: 1.60934 },
            { name: '英尺/秒(ft/s)', factor: 1.09728 }
          ]
        },
        {
          category: '烹饪体积',
          units: [
            { name: '茶匙(tsp)', factor: 1 },
            { name: '汤匙(tbsp)', factor: 3 },
            { name: '杯(cup)', factor: 48 },
            { name: 'fluid盎司(fl oz)', factor: 6 },
            { name: '毫升(mL)', factor: 0.202884 }
          ]
        },
        {
          category: '时间',
          units: [
            { name: '秒(s)', factor: 1 },
            { name: '分钟(min)', factor: 60 },
            { name: '小时(h)', factor: 3600 },
            { name: '天(d)', factor: 86400 },
            { name: '周(week)', factor: 604800 }
          ]
        },
        {
          category: '烹饪重量',
          units: [
            { name: '克(g)', factor: 1 },
            { name: '千克(kg)', factor: 1000 },
            { name: '盎司(oz)', factor: 28.3495 },
            { name: '磅(lb)', factor: 453.592 },
            { name: '毫克(mg)', factor: 0.001 }
          ]
        },
        {
          category: '燃料消耗',
          units: [
            { name: '升/100公里(L/100km)', factor: 1, converter: (v) => v, reverseConverter: (v) => v },
            { name: '公里/升(km/L)', factor: 1, converter: (v) => 100 / v, reverseConverter: (v) => 100 / v },
            { name: '英里/加仑(美)(mpg)', factor: 1, converter: (v) => 235.215 / v, reverseConverter: (v) => 235.215 / v },
            { name: '英里/加仑(英)(mpg)', factor: 1, converter: (v) => 282.481 / v, reverseConverter: (v) => 282.481 / v }
          ]
        }
      ],
      
      // 计算机科学领域单位
      computer: [
        {
          category: '数据存储',
          units: [
            { name: '字节(B)', factor: 1 },
            { name: '千字节(KB)', factor: 1024 },
            { name: '兆字节(MB)', factor: 1024**2 },
            { name: '吉字节(GB)', factor: 1024**3 },
            { name: '太字节(TB)', factor: 1024**4 }
          ]
        },
        {
          category: '数据传输',
          units: [
            { name: '比特/秒(bps)', factor: 1 },
            { name: '千比特/秒(kbps)', factor: 1000 },
            { name: '兆比特/秒(Mbps)', factor: 1e6 },
            { name: '吉比特/秒(Gbps)', factor: 1e9 }
          ]
        },
        {
          category: '频率',
          units: [
            { name: '赫兹(Hz)', factor: 1 },
            { name: '千赫兹(kHz)', factor: 1000 },
            { name: '兆赫兹(MHz)', factor: 1e6 },
            { name: '吉赫兹(GHz)', factor: 1e9 }
          ]
        },
        {
          category: '角度',
          units: [
            { name: '度(°)', factor: 1, converter: (v) => v, reverseConverter: (v) => v },
            { name: '弧度(rad)', factor: 1, converter: (v) => v * (180 / Math.PI), reverseConverter: (v) => v * (Math.PI / 180) },
            { name: '梯度(grad)', factor: 1, converter: (v) => v * 0.9, reverseConverter: (v) => v / 0.9 }
          ]
        },
        {
          category: '显示分辨率',
          units: [
            { name: '像素/英寸(PPI)', factor: 1 },
            { name: '像素/厘米(PPCM)', factor: 0.3937 },
            { name: '点/英寸(DPI)', factor: 1 },
            { name: '点/厘米(DPCM)', factor: 0.3937 }
          ]
        }
      ]
    };
  },

  // 加载指定领域的单位类别
  loadDomainUnits(domainIndex) {
    const domainKey = ['mechanical', 'daily', 'computer'][domainIndex];
    const categories = this.unitDatabase[domainKey].map(item => item.category);
    
    this.setData({
      selectedDomain: domainIndex,
      categories: categories,
      selectedCategory: 0
    }, () => {
      // 加载第一个类别的单位
      this.loadCategoryUnits(0);
    });
  },

  // 加载指定类别的单位列表
  loadCategoryUnits(categoryIndex) {
    const domainKey = ['mechanical', 'daily', 'computer'][this.data.selectedDomain];
    const categoryData = this.unitDatabase[domainKey][categoryIndex];
    const unitNames = categoryData.units.map(unit => unit.name);
    
    this.setData({
      selectedCategory: categoryIndex,
      fromUnits: unitNames,
      toUnits: unitNames,
      selectedFromUnit: 0,
      selectedToUnit: 1
    }, () => {
      // 如果有输入值，重新计算
      if (this.data.inputValue) {
        this.calculateConversion();
      }
    });
  },

  // 领域选择变更
  onDomainChange(e) {
    this.loadDomainUnits(e.detail.value);
  },

  // 类别选择变更
  onCategoryChange(e) {
    this.loadCategoryUnits(e.detail.value);
  },

  // 单位选择变更
  onFromUnitChange(e) {
    this.setData({ selectedFromUnit: e.detail.value }, () => {
      this.calculateConversion();
    });
  },

  onToUnitChange(e) {
    this.setData({ selectedToUnit: e.detail.value }, () => {
      this.calculateConversion();
    });
  },

  // 小数精度变更处理
  onPrecisionChange(e) {
    this.setData({ precision: parseInt(e.detail.value) }, () => {
      this.calculateConversion();
    });
  },

  // 输入值变化
  onInputChange(e) {
    const value = e.detail.value;
    this.setData({ inputValue: value }, () => {
      this.calculateConversion();
    });
  },

  // 精度选择变更
  onPrecisionChange(e) {
    this.setData({ precision: parseInt(e.detail.value) }, () => {
      this.calculateConversion();
    });
  },

  // 执行单位转换计算
  calculateConversion() {
    const { inputValue, selectedDomain, selectedCategory, selectedFromUnit, selectedToUnit, precision } = this.data;
    
    if (!inputValue || isNaN(inputValue)) {
      this.setData({ resultValue: '0.000' });
      return;
    }
    
    const value = parseFloat(inputValue);
    const domainKey = ['mechanical', 'daily', 'computer'][selectedDomain];
    const categoryData = this.unitDatabase[domainKey][selectedCategory];
    const fromUnit = categoryData.units[selectedFromUnit];
    const toUnit = categoryData.units[selectedToUnit];
    
    let result;
    // 特殊单位（如温度）使用自定义转换函数
    if (fromUnit.converter && toUnit.reverseConverter) {
      // 温度转换：先转为摄氏度，再转为目标单位
      if (selectedDomain === 1 && selectedCategory === 0) {
        const celsius = fromUnit.reverseConverter(value);
        result = toUnit.converter(celsius);
      } else {
        result = value;
      }
    } else {
      // 通用单位转换：value * (fromFactor / toFactor)
      result = value * (fromUnit.factor / toUnit.factor);
    }
    
    // 格式化结果显示
    const formatTemplate = `%.${precision}f`;
    this.setData({
      resultValue: result.toFixed(precision)
    });
  },

  // 交换单位
  swapUnits() {
    const { selectedFromUnit, selectedToUnit } = this.data;
    this.setData({
      selectedFromUnit: selectedToUnit,
      selectedToUnit: selectedFromUnit
    }, () => {
      this.calculateConversion();
    });
  }
});