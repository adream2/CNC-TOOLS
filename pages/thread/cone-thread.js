// 锥螺纹(GB/T 7306.1-2000)数据模型及计算逻辑
Page({
  data: {
    specifications: [
      { name: 'R1/16', d: 7.723, pitch: 0.907, toothHeight: 0.581, threadsPerInch: 28 },
      { name: 'R1/8', d: 9.728, pitch: 0.907, toothHeight: 0.581, threadsPerInch: 28 },
      { name: 'R1/4', d: 13.157, pitch: 1.337, toothHeight: 0.856, threadsPerInch: 19 },
      { name: 'R3/8', d: 16.662, pitch: 1.337, toothHeight: 0.856, threadsPerInch: 19 },
      { name: 'R1/2', d: 20.955, pitch: 1.814, toothHeight: 1.162, threadsPerInch: 14 },
      { name: 'R3/4', d: 26.441, pitch: 1.814, toothHeight: 1.162, threadsPerInch: 14 },
      { name: 'R1', d: 33.249, pitch: 2.309, toothHeight: 1.479, threadsPerInch: 11 },
      { name: 'R1 1/4', d: 41.910, pitch: 2.309, toothHeight: 1.479, threadsPerInch: 11 },
      { name: 'R1 1/2', d: 47.803, pitch: 2.309, toothHeight: 1.479, threadsPerInch: 11 },
      { name: 'R2', d: 59.614, pitch: 2.309, toothHeight: 1.479, threadsPerInch: 11 }
    ],
    specNames: [],
    selectedIndex: 0,
    threadParams: null
  },

  onLoad() {
    // 初始化规格名称列表和默认选中项
    if (this.data.specifications.length > 0) {
      const specNames = this.data.specifications.map(item => item.name);
      this.setData({
        specNames: specNames,
        selectedIndex: 0,
        threadParams: this.data.specifications[0]
      })
    } else {
      // 手动加载规格数据
      const testSpecs = [
        { name: 'R1/8', d: 9.728, pitch: 0.907, toothHeight: 0.581, threadsPerInch: 28 },
        { name: 'R1/4', d: 13.157, pitch: 1.337, toothHeight: 0.856, threadsPerInch: 19 },
        { name: 'R3/8', d: 16.662, pitch: 1.337, toothHeight: 0.856, threadsPerInch: 19 }
      ];
      this.setData({
        specifications: testSpecs,
        specNames: testSpecs.map(item => item.name),
        selectedIndex: 0,
        threadParams: testSpecs[0]
      });
    }
  },

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
    
    if (typeof value !== 'number' || isNaN(value)) return '-';
    return value.toFixed(3) + ' mm';
  }
})