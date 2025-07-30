Page({
  data: {
    threadSizeIndex: 0,
    pitchIndex: 0,
    accuracyIndex: 0,
    showResult: false,
    selectedThreadSize: '',
    selectedPitch: '',
    majorDiameter: '',
    pitchDiameter: '',
    minorDiameter: '',
    threadHeight: '',
    drillSize: '',
    toleranceBand: '',
    threadSizes: ['M1', 'M1.2', 'M1.4', 'M1.6', 'M1.8', 'M2', 'M2.2', 'M2.5', 'M3', 'M3.5', 'M4', 'M4.5', 'M5', 'M6', 'M7', 'M8', 'M10', 'M12', 'M14', 'M16', 'M18', 'M20', 'M22', 'M24', 'M27', 'M30', 'M33', 'M36', 'M39', 'M42', 'M45', 'M48', 'M52', 'M56', 'M60', 'M64'],
    pitches: [],
    accuracies: ['6H/6g', '6H/5g6g', '7H/6g', '7H/5g6g', '6G/6h', '5G/6h']
  },

  onLoad: function() {
    // 初始化第一个螺纹规格的螺距选项
    this.updatePitches(this.data.threadSizes[0]);
  },

  bindThreadSizeChange: function(e) {
    const index = e.detail.value;
    const selectedSize = this.data.threadSizes[index];
    this.setData({
      threadSizeIndex: index
    }, () => {
      this.updatePitches(selectedSize, () => {
        this.queryThreadData();
      });
    });
  },

  bindPitchChange: function(e) {
    this.setData({
      pitchIndex: e.detail.value
    }, () => {
      this.queryThreadData();
    });
  },

  bindAccuracyChange: function(e) {
    this.setData({
      accuracyIndex: e.detail.value
    }, () => {
      this.queryThreadData();
    });
  },

  updatePitches: function(size, callback) {
    // 根据螺纹规格获取对应的螺距选项
    const pitchData = this.getThreadPitchData(size);
    this.setData({
      pitches: pitchData.pitches,
      pitchIndex: 0
    }, callback);
  },

  queryThreadData: function() {
    const { threadSizeIndex, pitchIndex, accuracyIndex } = this.data;
    const selectedSize = this.data.threadSizes[threadSizeIndex];
    const selectedPitch = this.data.pitches[pitchIndex];
    const selectedAccuracy = this.data.accuracies[accuracyIndex];

    // 获取螺纹参数
    const threadData = this.getThreadData(selectedSize, selectedPitch);

    this.setData({
      showResult: true,
      selectedThreadSize: selectedSize,
      selectedPitch: selectedPitch,
      majorDiameter: threadData.majorDiameter.toFixed(3),
      pitchDiameter: threadData.pitchDiameter.toFixed(3),
      minorDiameter: threadData.minorDiameter.toFixed(3),
      threadHeight: threadData.threadHeight.toFixed(3),
      drillSize: threadData.drillSize.toFixed(3),
      toleranceBand: selectedAccuracy
    });
  },

  // 获取螺纹螺距数据
  getThreadPitchData: function(size) {
    // 公制螺纹标准螺距数据 (GB/T 192-2021)
    const pitchMap = {
      'M1': [0.25],
      'M1.2': [0.25],
      'M1.4': [0.3],
      'M1.6': [0.35],
      'M1.8': [0.35],
      'M2': [0.4, 0.25],
      'M2.2': [0.45, 0.25],
      'M2.5': [0.45, 0.35],
      'M3': [0.5, 0.35],
      'M3.5': [0.6, 0.35],
      'M4': [0.7, 0.5],
      'M4.5': [0.75, 0.5],
      'M5': [0.8, 0.5],
      'M6': [1, 0.75, 0.5],
      'M7': [1, 0.75],
      'M8': [1.25, 1, 0.75, 0.5],
      'M10': [1.5, 1.25, 1, 0.75, 0.5],
      'M12': [1.75, 1.5, 1.25, 1, 0.75, 0.5],
      'M14': [2, 1.5, 1.25, 1],
      'M16': [2, 1.5, 1],
      'M18': [2.5, 2, 1.5, 1],
      'M20': [2.5, 2, 1.5, 1],
      'M22': [2.5, 2, 1.5, 1],
      'M24': [3, 2, 1.5, 1],
      'M27': [3, 2, 1.5, 1],
      'M30': [3.5, 3, 2, 1.5, 1],
      'M33': [3.5, 3, 2, 1.5],
      'M36': [4, 3, 2, 1.5],
      'M39': [4, 3, 2, 1.5],
      'M42': [4.5, 3, 2, 1.5],
      'M45': [4.5, 3, 2, 1.5],
      'M48': [5, 3, 2, 1.5],
      'M52': [5, 3, 2, 1.5],
      'M56': [5.5, 4, 3, 2, 1.5],
      'M60': [5.5, 4, 3, 2, 1.5],
      'M64': [6, 4, 3, 2, 1.5]
    };

    return { pitches: pitchMap[size] || [] };
  },

  // 获取螺纹详细参数
  getThreadData: function(size, pitch) {
    // 提取公称直径数值
    const majorDiameter = parseFloat(size.substring(1));
    const pitchValue = parseFloat(pitch);

    // 计算螺纹参数 (ISO标准)
    const threadHeight = 0.54127 * pitchValue; // 牙型高度
    const pitchDiameter = majorDiameter - 0.64952 * pitchValue; // 中径
    const minorDiameter = majorDiameter - 1.08253 * pitchValue; // 小径
    const drillSize = minorDiameter + 0.1; // 推荐底孔直径(普通材料)

    return {
      majorDiameter: majorDiameter,
      pitchDiameter: pitchDiameter,
      minorDiameter: minorDiameter,
      threadHeight: threadHeight,
      drillSize: drillSize
    };
  }
})