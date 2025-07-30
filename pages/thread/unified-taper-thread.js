// 美制锥螺纹(ANSI/ASME B1.20.1)数据模型及计算逻辑
Page({
  data: {
    specifications: [
      { name: 'NPT 1/16', size: '1/16', d: 7.895, pitch: 0.907, toothHeight: 0.581, threadsPerInch: 27 },
      { name: 'NPT 1/8', size: '1/8', d: 10.242, pitch: 0.907, toothHeight: 0.581, threadsPerInch: 27 },
      { name: 'NPT 1/4', size: '1/4', d: 13.616, pitch: 1.337, toothHeight: 0.856, threadsPerInch: 18 },
      { name: 'NPT 3/8', size: '3/8', d: 17.055, pitch: 1.337, toothHeight: 0.856, threadsPerInch: 18 },
      { name: 'NPT 1/2', size: '1/2', d: 21.223, pitch: 1.814, toothHeight: 1.162, threadsPerInch: 14 },
      { name: 'NPT 3/4', size: '3/4', d: 26.568, pitch: 1.814, toothHeight: 1.162, threadsPerInch: 14 },
      { name: 'NPT 1', size: '1', d: 33.228, pitch: 2.209, toothHeight: 1.411, threadsPerInch: 11.5 },
      { name: 'NPT 1 1/4', size: '1 1/4', d: 41.985, pitch: 2.209, toothHeight: 1.411, threadsPerInch: 11.5 },
      { name: 'NPT 1 1/2', size: '1 1/2', d: 48.054, pitch: 2.209, toothHeight: 1.411, threadsPerInch: 11.5 },
      { name: 'NPT 2', size: '2', d: 60.092, pitch: 2.309, toothHeight: 1.479, threadsPerInch: 11.5 }
    ],
    specNames: [],
    selectedIndex: 0,
    threadParams: null
  },

  onLoad() {
    // 初始化规格数据并设置threadParams
    const specs = [
      { name: 'NPT 1/16', d: 7.937, pitch: 0.941, toothHeight: 0.603, threadsPerInch: 27 },
      { name: 'NPT 1/8', d: 10.287, pitch: 0.941, toothHeight: 0.603, threadsPerInch: 27 },
      { name: 'NPT 1/4', d: 13.716, pitch: 1.411, toothHeight: 0.903, threadsPerInch: 18 },
      { name: 'NPT 3/8', d: 17.145, pitch: 1.411, toothHeight: 0.903, threadsPerInch: 18 },
      { name: 'NPT 1/2', d: 21.336, pitch: 1.814, toothHeight: 1.162, threadsPerInch: 14 },
      { name: 'NPT 3/4', d: 26.670, pitch: 1.814, toothHeight: 1.162, threadsPerInch: 14 },
      { name: 'NPT 1', d: 33.401, pitch: 2.209, toothHeight: 1.414, threadsPerInch: 11.5 },
      { name: 'NPT 1 1/4', d: 42.164, pitch: 2.209, toothHeight: 1.414, threadsPerInch: 11.5 },
      { name: 'NPT 1 1/2', d: 48.260, pitch: 2.209, toothHeight: 1.414, threadsPerInch: 11.5 },
      { name: 'NPT 2', d: 60.325, pitch: 2.209, toothHeight: 1.414, threadsPerInch: 11.5 },
      { name: 'NPT 2 1/2', d: 72.644, pitch: 3.175, toothHeight: 2.011, threadsPerInch: 8 },
      { name: 'NPT 3', d: 88.900, pitch: 3.175, toothHeight: 2.011, threadsPerInch: 8 },
      { name: 'NPT 3 1/2', d: 101.600, pitch: 3.175, toothHeight: 2.011, threadsPerInch: 8 },
      { name: 'NPT 4', d: 114.300, pitch: 3.175, toothHeight: 2.011, threadsPerInch: 8 },
      { name: 'NPT 5', d: 139.700, pitch: 4.233, toothHeight: 2.709, threadsPerInch: 6 },
      { name: 'NPT 6', d: 165.100, pitch: 4.233, toothHeight: 2.709, threadsPerInch: 6 },
      { name: 'NPT 8', d: 215.900, pitch: 4.233, toothHeight: 2.709, threadsPerInch: 6 },
      { name: 'NPT 10', d: 273.050, pitch: 4.233, toothHeight: 2.709, threadsPerInch: 6 },
      { name: 'NPT 12', d: 323.850, pitch: 5.080, toothHeight: 3.251, threadsPerInch: 5 },
      { name: 'NPT 14', d: 355.600, pitch: 5.080, toothHeight: 3.251, threadsPerInch: 5 },
      { name: 'NPT 16', d: 406.400, pitch: 5.080, toothHeight: 3.251, threadsPerInch: 5 },
      { name: 'NPT 18', d: 457.200, pitch: 5.080, toothHeight: 3.251, threadsPerInch: 5 },
      { name: 'NPT 20', d: 508.000, pitch: 5.080, toothHeight: 3.251, threadsPerInch: 5 },
      { name: 'NPT 24', d: 609.600, pitch: 5.080, toothHeight: 3.251, threadsPerInch: 5 }
    ];
    this.setData({
      specifications: specs,
      specNames: specs.map(item => item.name),
        debugSpecNames: JSON.stringify(['NPT 1/16', 'NPT 1/8', 'NPT 1/4', 'NPT 3/8']),
      selectedIndex: 0,
      threadParams: specs[0]
    });
  },

  // 处理规格选择变更
 onSpecificationChange(e) {
    const index = e.detail.value;
    const spec = this.data.specifications[index];
    if (spec) {
      this.setData({
        selectedIndex: index,
        threadParams: spec
      });
    }
  },

  formatDimension(value) {
    // 确保值为数字并格式化
    const num = parseFloat(value);
    return !isNaN(num) ? num.toFixed(3) + ' mm' : '-';
  }
});