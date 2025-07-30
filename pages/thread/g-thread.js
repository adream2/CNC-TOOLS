Page({
  data: {
    specificationList: [
      { label: 'G1/16', value: '1/16' },
      { label: 'G1/8', value: '1/8' },
      { label: 'G1/4', value: '1/4' },
      { label: 'G3/8', value: '3/8' },
      { label: 'G1/2', value: '1/2' },
      { label: 'G5/8', value: '5/8' },
      { label: 'G3/4', value: '3/4' },
      { label: 'G7/8', value: '7/8' },
      { label: 'G1', value: '1' },
      { label: 'G11/8', value: '11/8' },
      { label: 'G11/4', value: '11/4' },
      { label: 'G11/2', value: '11/2' },
      { label: 'G13/4', value: '13/4' },
      { label: 'G2', value: '2' },
      { label: 'G21/4', value: '21/4' },
      { label: 'G21/2', value: '21/2' },
      { label: 'G23/4', value: '23/4' },
      { label: 'G3', value: '3' },
      { label: 'G31/2', value: '31/2' },
      { label: 'G4', value: '4' },
      { label: 'G41/2', value: '41/2' },
      { label: 'G5', value: '5' },
      { label: 'G51/2', value: '51/2' },
      { label: 'G6', value: '6' }
    ],
    toleranceList: ['A级', 'B级'],
    specificationIndex: 0,
    toleranceIndex: 0,
    threadData: null,
    threadDataMap: {
      '1/16': { n: 28, p: 0.907, h: 0.581, d: 7.723, d2: 7.142, d1: 6.561, internal: { major: { es: 0.282, ei: 0 }, pitch: { es: 0.107, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.107, ei: -0.214 }, pitch: { es: -0.053, ei: -0.107 }, minor: { es: -0.141, ei: -0.282 } }, 'B级': { major: { es: -0.214, ei: -0.428 }, pitch: { es: -0.107, ei: -0.214 }, minor: { es: -0.282, ei: -0.564 } } } },
      '1/8': { n: 28, p: 0.907, h: 0.581, d: 9.728, d2: 9.147, d1: 8.566, internal: { major: { es: 0.282, ei: 0 }, pitch: { es: 0.107, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.107, ei: -0.214 }, pitch: { es: -0.053, ei: -0.107 }, minor: { es: -0.141, ei: -0.282 } }, 'B级': { major: { es: -0.214, ei: -0.428 }, pitch: { es: -0.107, ei: -0.214 }, minor: { es: -0.282, ei: -0.564 } } } },
      '1/4': { n: 19, p: 1.337, h: 0.856, d: 13.157, d2: 12.301, d1: 11.445, internal: { major: { es: 0.445, ei: 0 }, pitch: { es: 0.125, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.125, ei: -0.250 }, pitch: { es: -0.063, ei: -0.125 }, minor: { es: -0.222, ei: -0.445 } }, 'B级': { major: { es: -0.250, ei: -0.500 }, pitch: { es: -0.125, ei: -0.250 }, minor: { es: -0.445, ei: -0.890 } } } },
      '3/8': { n: 19, p: 1.337, h: 0.856, d: 16.662, d2: 15.806, d1: 14.950, internal: { major: { es: 0.445, ei: 0 }, pitch: { es: 0.125, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.125, ei: -0.250 }, pitch: { es: -0.063, ei: -0.125 }, minor: { es: -0.222, ei: -0.445 } }, 'B级': { major: { es: -0.250, ei: -0.500 }, pitch: { es: -0.125, ei: -0.250 }, minor: { es: -0.445, ei: -0.890 } } } },
      '1/2': { n: 14, p: 1.814, h: 1.162, d: 20.955, d2: 19.793, d1: 18.631, internal: { major: { es: 0.541, ei: 0 }, pitch: { es: 0.142, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.142, ei: -0.284 }, pitch: { es: -0.071, ei: -0.142 }, minor: { es: -0.270, ei: -0.541 } }, 'B级': { major: { es: -0.284, ei: -0.568 }, pitch: { es: -0.142, ei: -0.284 }, minor: { es: -0.541, ei: -1.082 } } } },
      '5/8': { n: 14, p: 1.814, h: 1.162, d: 22.911, d2: 21.749, d1: 20.587, internal: { major: { es: 0.541, ei: 0 }, pitch: { es: 0.142, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.142, ei: -0.284 }, pitch: { es: -0.071, ei: -0.142 }, minor: { es: -0.270, ei: -0.541 } }, 'B级': { major: { es: -0.284, ei: -0.568 }, pitch: { es: -0.142, ei: -0.284 }, minor: { es: -0.541, ei: -1.082 } } } },
      '3/4': { n: 14, p: 1.814, h: 1.162, d: 26.441, d2: 25.279, d1: 24.117, internal: { major: { es: 0.541, ei: 0 }, pitch: { es: 0.142, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.142, ei: -0.284 }, pitch: { es: -0.071, ei: -0.142 }, minor: { es: -0.270, ei: -0.541 } }, 'B级': { major: { es: -0.284, ei: -0.568 }, pitch: { es: -0.142, ei: -0.284 }, minor: { es: -0.541, ei: -1.082 } } } },
        '7/8': { n: 14, p: 1.814, h: 1.162, d: 30.201, d2: 29.039, d1: 27.877, internal: { major: { es: 0.541, ei: 0 }, pitch: { es: 0.142, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.142, ei: -0.284 }, pitch: { es: -0.071, ei: -0.142 }, minor: { es: -0.270, ei: -0.541 } }, 'B级': { major: { es: -0.284, ei: -0.568 }, pitch: { es: -0.142, ei: -0.284 }, minor: { es: -0.541, ei: -1.082 } } } },
      '1': { n: 11, p: 2.309, h: 1.479, d: 33.249, d2: 31.770, d1: 30.291, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.180, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.180, ei: -0.360 }, pitch: { es: -0.090, ei: -0.180 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.360, ei: -0.720 }, pitch: { es: -0.180, ei: -0.360 }, minor: { es: -0.640, ei: -1.280 } } } },
        '11/8': { n: 11, p: 2.309, h: 1.479, d: 37.897, d2: 36.418, d1: 34.939, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.180, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.180, ei: -0.360 }, pitch: { es: -0.090, ei: -0.180 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.360, ei: -0.720 }, pitch: { es: -0.180, ei: -0.360 }, minor: { es: -0.640, ei: -1.280 } } } },
        '11/4': { n: 11, p: 2.309, h: 1.479, d: 41.910, d2: 40.431, d1: 38.952, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.180, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.180, ei: -0.360 }, pitch: { es: -0.090, ei: -0.180 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.360, ei: -0.720 }, pitch: { es: -0.180, ei: -0.360 }, minor: { es: -0.640, ei: -1.280 } } } },
        '11/2': { n: 11, p: 2.309, h: 1.479, d: 47.803, d2: 46.324, d1: 44.845, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.180, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.180, ei: -0.360 }, pitch: { es: -0.090, ei: -0.180 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.360, ei: -0.720 }, pitch: { es: -0.180, ei: -0.360 }, minor: { es: -0.640, ei: -1.280 } } } },
        '13/4': { n: 11, p: 2.309, h: 1.479, d: 53.746, d2: 52.267, d1: 50.788, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.180, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.180, ei: -0.360 }, pitch: { es: -0.090, ei: -0.180 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.360, ei: -0.720 }, pitch: { es: -0.180, ei: -0.360 }, minor: { es: -0.640, ei: -1.280 } } } },
        '2': { n: 11, p: 2.309, h: 1.479, d: 59.614, d2: 58.135, d1: 56.656, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.180, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.180, ei: -0.360 }, pitch: { es: -0.090, ei: -0.180 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.360, ei: -0.720 }, pitch: { es: -0.180, ei: -0.360 }, minor: { es: -0.640, ei: -1.280 } } } },
        '21/4': { n: 11, p: 2.309, h: 1.479, d: 65.710, d2: 64.231, d1: 62.752, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.127, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.217, ei: -0.434 }, pitch: { es: -0.108, ei: -0.217 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.434, ei: -0.868 }, pitch: { es: -0.217, ei: -0.434 }, minor: { es: -0.640, ei: -1.280 } } } },
        '21/2': { n: 11, p: 2.309, h: 1.479, d: 75.184, d2: 73.705, d1: 72.226, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.127, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.217, ei: -0.434 }, pitch: { es: -0.108, ei: -0.217 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.434, ei: -0.868 }, pitch: { es: -0.217, ei: -0.434 }, minor: { es: -0.640, ei: -1.280 } } } },
        '23/4': { n: 11, p: 2.309, h: 1.479, d: 81.534, d2: 80.055, d1: 78.576, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.127, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.217, ei: -0.434 }, pitch: { es: -0.108, ei: -0.217 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.434, ei: -0.868 }, pitch: { es: -0.217, ei: -0.434 }, minor: { es: -0.640, ei: -1.280 } } } },
        '3': { n: 11, p: 2.309, h: 1.479, d: 87.884, d2: 86.405, d1: 84.926, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.127, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.217, ei: -0.434 }, pitch: { es: -0.108, ei: -0.217 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.434, ei: -0.868 }, pitch: { es: -0.217, ei: -0.434 }, minor: { es: -0.640, ei: -1.280 } } } },
        '31/2': { n: 11, p: 2.309, h: 1.479, d: 100.330, d2: 98.851, d1: 97.372, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.127, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.217, ei: -0.434 }, pitch: { es: -0.108, ei: -0.217 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.434, ei: -0.868 }, pitch: { es: -0.217, ei: -0.434 }, minor: { es: -0.640, ei: -1.280 } } } },
        '4': { n: 11, p: 2.309, h: 1.479, d: 113.030, d2: 111.551, d1: 110.072, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.127, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.217, ei: -0.434 }, pitch: { es: -0.108, ei: -0.217 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.434, ei: -0.868 }, pitch: { es: -0.217, ei: -0.434 }, minor: { es: -0.640, ei: -1.280 } } } },
        '41/2': { n: 11, p: 2.309, h: 1.479, d: 125.730, d2: 124.251, d1: 122.772, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.127, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.217, ei: -0.434 }, pitch: { es: -0.108, ei: -0.217 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.434, ei: -0.868 }, pitch: { es: -0.217, ei: -0.434 }, minor: { es: -0.640, ei: -1.280 } } } },
        '5': { n: 11, p: 2.309, h: 1.479, d: 138.430, d2: 136.951, d1: 135.472, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.127, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.217, ei: -0.434 }, pitch: { es: -0.108, ei: -0.217 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.434, ei: -0.868 }, pitch: { es: -0.217, ei: -0.434 }, minor: { es: -0.640, ei: -1.280 } } } },
        '51/2': { n: 11, p: 2.309, h: 1.479, d: 151.130, d2: 149.651, d1: 148.172, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.127, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.217, ei: -0.434 }, pitch: { es: -0.108, ei: -0.217 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.434, ei: -0.868 }, pitch: { es: -0.217, ei: -0.434 }, minor: { es: -0.640, ei: -1.280 } } } },
        '6': { n: 11, p: 2.309, h: 1.479, d: 163.830, d2: 162.351, d1: 160.872, internal: { major: { es: 0.640, ei: 0 }, pitch: { es: 0.127, ei: 0 }, minor: { es: 0, ei: 0 } }, external: { 'A级': { major: { es: -0.217, ei: -0.434 }, pitch: { es: -0.108, ei: -0.217 }, minor: { es: -0.320, ei: -0.640 } }, 'B级': { major: { es: -0.434, ei: -0.868 }, pitch: { es: -0.217, ei: -0.434 }, minor: { es: -0.640, ei: -1.280 } } } }
    }
  },
  bindSpecificationChange(e) {
    this.setData({ specificationIndex: e.detail.value }, this.queryThreadData);
  },
  bindToleranceChange(e) {
    this.setData({ toleranceIndex: parseInt(e.detail.value) }, this.queryThreadData);
  },
  queryThreadData() {
    const { specificationList, toleranceList, specificationIndex, toleranceIndex, threadDataMap } = this.data;
    const specificationValue = specificationList[specificationIndex].value;
    const toleranceValue = toleranceList[toleranceIndex];
    const threadData = threadDataMap[specificationValue];
    this.setData({ threadData });
  },
  onLoad() {
    this.queryThreadData();
  }
})