// hole-shaft.js
// 基于GB/T 1800.2-2020标准的公差数据表
const toleranceData = {
  // 尺寸分段(单位:mm)
  sizeRanges: [
    { min: 0, max: 3 },
    { min: 3, max: 6 },
    { min: 6, max: 10 },
    { min: 10, max: 18 },
    { min: 18, max: 30 },
    { min: 30, max: 50 },
    { min: 50, max: 80 },
    { min: 80, max: 120 },
    { min: 120, max: 180 },
    { min: 180, max: 250 },
    { min: 250, max: 315 },
    { min: 315, max: 400 },
    { min: 400, max: 500 }
  ],
  
  // 标准公差值(单位:μm)
  standardTolerances: {
    IT01: [0.3, 0.4, 0.4, 0.5, 0.6, 0.6, 0.8, 1, 1.2, 1.6, 2, 2.5, 3],
    IT0: [0.5, 0.6, 0.6, 0.8, 1, 1, 1.2, 1.5, 2, 2.5, 3, 4, 4.5],
    IT1: [0.8, 1, 1, 1.2, 1.5, 1.5, 2, 2.5, 3, 4, 4.5, 5, 6],
    IT2: [1.2, 1.5, 1.5, 2, 2.5, 2.5, 3, 4, 5, 6, 7, 8, 9],
    IT3: [2, 2.5, 2.5, 3, 4, 4, 5, 6, 8, 10, 12, 13, 15],
    IT4: [3, 4, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20],
    IT5: [4, 5, 6, 8, 9, 11, 13, 15, 18, 20, 23, 25, 27],
    IT6: [6, 8, 9, 11, 13, 16, 19, 22, 25, 29, 32, 36, 40],
    IT7: [10, 12, 15, 18, 21, 25, 30, 35, 40, 46, 52, 57, 63],
    IT8: [14, 18, 22, 27, 33, 39, 46, 54, 63, 72, 81, 89, 97],
    IT9: [25, 30, 36, 43, 52, 62, 74, 87, 100, 115, 130, 140, 155],
    IT10: [40, 48, 58, 70, 84, 100, 120, 140, 160, 185, 210, 230, 250],
    IT11: [60, 75, 90, 110, 130, 160, 190, 220, 250, 290, 320, 360, 400],
    IT12: [100, 120, 150, 180, 210, 250, 300, 350, 400, 460, 520, 570, 630],
    IT13: [140, 180, 220, 270, 330, 390, 460, 540, 630, 720, 810, 890, 970],
    IT14: [250, 300, 360, 430, 520, 620, 740, 870, 1000, 1150, 1300, 1400, 1550],
    IT15: [400, 480, 580, 700, 840, 1000, 1200, 1400, 1600, 1850, 2100, 2300, 2500],
    IT16: [600, 750, 900, 1100, 1300, 1600, 1900, 2200, 2500, 2900, 3200, 3600, 4000],
    IT17: [1000, 1200, 1500, 1800, 2100, 2500, 3000, 3500, 4000, 4600, 5200, 5700, 6300],
    IT18: [1400, 1800, 2200, 2700, 3300, 3900, 4600, 5400, 6300, 7200, 8100, 8900, 9700]
  },
  
  // 孔的基本偏差表(单位:μm)
  holeFundamentalDeviations: {
    A: [330, 345, 350, 355, 360, 370, 380, 390, 400, 410, 420, 435, 450],
    B: [200, 205, 210, 215, 220, 230, 240, 250, 260, 280, 300, 330, 360],
    C: [120, 130, 140, 150, 160, 170, 180, 195, 210, 230, 240, 260, 280],
    CD: [65, 70, 75, 80, 85, 95, 110, 125, 130, 145, 160, 170, 180],
    D: [45, 50, 56, 65, 80, 95, 110, 125, 145, 170, 190, 210, 230],
    E: [29, 30, 32, 36, 43, 50, 60, 72, 85, 100, 110, 125, 135],
    EF: [18, 20, 22, 24, 28, 34, 40, 48, 55, 65, 75, 85, 95],
    F: [14, 16, 18, 20, 24, 28, 34, 40, 46, 54, 60, 70, 80],
    FG: [8, 9, 10, 11, 13, 16, 20, 25, 30, 36, 40, 44, 50],
    G: [6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 25, 27],
    H: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    JS: [-3, -4, -4, -5, -6, -6, -8, -10, -12, -14, -16, -18, -20],
    J: [-2, -2, -2, -2, -3, -3, -4, -5, -6, -7, -8, -9, -10],
    K: [0, 0, 0, 0, -1, -1, -2, -2, -3, -3, -4, -4, -5],
    M: [-2, -2, -2, -2, -3, -4, -4, -5, -6, -7, -8, -9, -10],
    N: [-4, -4, -5, -6, -8, -9, -11, -13, -15, -17, -20, -23, -27],
    P: [-6, -8, -10, -12, -15, -18, -22, -26, -30, -35, -40, -45, -52],
    R: [-10, -13, -16, -20, -24, -29, -35, -43, -50, -60, -70, -80, -92],
    S: [-14, -16, -20, -25, -30, -36, -43, -53, -64, -77, -91, -104, -122],
    T: [0, 0, 0, 0, -36, -45, -54, -66, -80, -94, -110, -127, -146],
    U: [-18, -20, -24, -30, -37, -47, -60, -75, -92, -114, -132, -151, -175],
    V: [0, 0, 0, 0, 0, 0, -70, -89, -108, -133, -155, -179, -208],
    X: [-20, -23, -28, -34, -41, -50, -62, -78, -98, -122, -144, -168, -194],
    Y: [0, 0, 0, 0, 0, 0, -73, -94, -118, -148, -174, -200, -232],
    Z: [-26, -30, -36, -43, -53, -64, -78, -98, -122, -152, -180, -210, -240],
    ZA: [-32, -37, -45, -54, -66, -80, -97, -122, -150, -185, -218, -252, -292],
    ZB: [-40, -47, -56, -67, -81, -97, -118, -148, -180, -220, -258, -300, -348],
    ZC: [-50, -60, -71, -85, -102, -122, -148, -180, -218, -268, -310, -360, -415]
  },
  
  // 轴的基本偏差表(单位:μm)
  shaftFundamentalDeviations: {
    a: [-270, -270, -270, -260, -260, -260, -240, -240, -240, -220, -220, -200, -200],
    b: [-140, -140, -140, -130, -130, -130, -120, -120, -120, -110, -110, -95, -95],
    c: [-60, -70, -80, -95, -110, -120, -130, -145, -160, -170, -190, -200, -210],
    cd: [-34, -46, -56, -65, -80, -95, -110, -125, -130, -145, -160, -170, -180],
    d: [-20, -30, -40, -50, -65, -80, -95, -110, -125, -145, -160, -170, -180],
    e: [-14, -20, -25, -32, -40, -50, -60, -72, -85, -100, -110, -125, -135],
    ef: [-10, -14, -18, -22, -28, -34, -40, -48, -55, -65, -75, -85, -95],
    f: [-6, -10, -13, -16, -20, -25, -30, -36, -43, -50, -56, -62, -70],
    fg: [-4, -6, -8, -10, -13, -16, -20, -25, -30, -36, -40, -44, -50],
    g: [-2, -4, -5, -6, -7, -9, -10, -12, -14, -15, -17, -18, -20],
    h: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    js: [+2, +2, +2, +3, +4, +4, +5, +6, +7, +8, +9, +10, +12],
    j: [0, 0, 0, 0, -1, -1, -2, -2, -3, -3, -4, -4, -5],
    k: [+2, +2, +2, +3, +4, +5, +6, +7, +9, +10, +12, +13, +15],
    m: [+4, +5, +6, +8, +10, +12, +15, +18, +21, +24, +28, +33, +39],
    n: [+6, +8, +10, +13, +16, +19, +23, +28, +33, +39, +45, +52, +62],
    p: [+10, +12, +15, +19, +23, +28, +33, +41, +48, +58, +70, +80, +94],
    r: [+14, +17, +20, +25, +31, +37, +45, +54, +63, +77, +93, +106, +126],
    s: [+18, +20, +24, +30, +36, +43, +53, +64, +75, +93, +113, +130, +150],
    t: [0, 0, 0, 0, +41, +51, +64, +78, +93, +114, +138, +158, +187],
    u: [+22, +25, +30, +36, +43, +53, +66, +81, +97, +117, +142, +162, +192],
    v: [0, 0, 0, 0, 0, 0, +81, +97, +117, +142, +172, +195, +232],
    x: [+28, +34, +41, +50, +60, +73, +88, +108, +131, +159, +191, +220, +258],
    y: [0, 0, 0, 0, 0, 0, +94, +114, +139, +169, +203, +236, +274],
    z: [+35, +43, +53, +65, +80, +97, +118, +144, +174, +210, +252, +292, +340],
    za: [+43, +54, +67, +81, +97, +118, +144, +174, +210, +252, +300, +340, +390],
    zb: [+52, +64, +80, +97, +118, +144, +174, +214, +260, +310, +365, +415, +475],
    zc: [+62, +77, +97, +118, +144, +174, +214, +260, +310, +380, +440, +500, +570]
  }
};

Page({
  data: {
    currentType: '孔',
    gradeList: [],
    currentGrade: 'IT6',
    toleranceGrade: '6',
    holeToleranceList: [],
    shaftToleranceList: [],
    toleranceList: [],
    currentTolerance: 'H',
    basicSize: '',
    showResult: false,
    upperDeviation: '',
    lowerDeviation: '',
    toleranceValue: '',
    dimensionDisplay: '',
    maxSize: '',
    minSize: '',
    upperTypeDisplay: '',
    lowerTypeDisplay: ''
  },
  
  onLoad: function() {
    // 初始化公差等级列表
    const gradeList = [];
    for (let i = 0; i <= 18; i++) {
      gradeList.push(`IT${i}`);
    }
    this.setData({
      gradeList: gradeList
    });
    
    // 初始化孔和轴的公差带列表
    const holeToleranceList = [];
    const shaftToleranceList = [];
    
    // 生成孔的公差带(A~ZC)
    for (let code = 65; code <= 90; code++) { // A-Z
      holeToleranceList.push(String.fromCharCode(code));
    }
    holeToleranceList.push('CD');
    holeToleranceList.push('EF');
    holeToleranceList.push('FG');
    holeToleranceList.push('JS');
    holeToleranceList.push('J');
    holeToleranceList.push('K');
    holeToleranceList.push('M');
    holeToleranceList.push('N');
    holeToleranceList.push('P');
    holeToleranceList.push('R');
    holeToleranceList.push('S');
    holeToleranceList.push('T');
    holeToleranceList.push('U');
    holeToleranceList.push('V');
    holeToleranceList.push('X');
    holeToleranceList.push('Y');
    holeToleranceList.push('Z');
    holeToleranceList.push('ZA');
    holeToleranceList.push('ZB');
    holeToleranceList.push('ZC');
    
    // 生成轴的公差带(a~zc)
    for (let code = 97; code <= 122; code++) { // a-z
      shaftToleranceList.push(String.fromCharCode(code));
    }
    shaftToleranceList.push('cd');
    shaftToleranceList.push('ef');
    shaftToleranceList.push('fg');
    shaftToleranceList.push('js');
    shaftToleranceList.push('j');
    shaftToleranceList.push('k');
    shaftToleranceList.push('m');
    shaftToleranceList.push('n');
    shaftToleranceList.push('p');
    shaftToleranceList.push('r');
    shaftToleranceList.push('s');
    shaftToleranceList.push('t');
    shaftToleranceList.push('u');
    shaftToleranceList.push('v');
    shaftToleranceList.push('x');
    shaftToleranceList.push('y');
    shaftToleranceList.push('z');
    shaftToleranceList.push('za');
    shaftToleranceList.push('zb');
    shaftToleranceList.push('zc');
    
    this.setData({
      holeToleranceList: holeToleranceList,
      shaftToleranceList: shaftToleranceList,
      toleranceList: holeToleranceList // 默认显示孔的公差带
    });
  },
  
  onBasicSizeInput: function(e) {
    this.setData({
      basicSize: e.detail.value
    });
  },
  
  onTypeChange: function(e) {
    const newType = e.detail.value;
    let newToleranceList = newType === '孔' ? this.data.holeToleranceList : this.data.shaftToleranceList;
    let newCurrentTolerance = newType === '孔' ? 'H' : 'h';
    
    this.setData({
      currentType: newType,
      toleranceList: newToleranceList,
      currentTolerance: newCurrentTolerance
    });
    // 切换类型后自动重新查询
    if (this.data.basicSize) {
      this.queryTolerance();
    }
  },
  
  onGradeChange: function(e) {
    const newGrade = this.data.gradeList[e.detail.value];
    this.setData({
      currentGrade: newGrade,
      toleranceGrade: newGrade.replace('IT', '')
    });
  },
  
  onToleranceChange: function(e) {
    this.setData({
      currentTolerance: this.data.toleranceList[e.detail.value]
    });
  },
  
  queryTolerance: function() {
    const basicSize = parseFloat(this.data.basicSize);
    const currentType = this.data.currentType;
    const currentGrade = this.data.currentGrade;
    const currentTolerance = this.data.currentTolerance;
    
    if (isNaN(basicSize) || basicSize <= 0) {
      wx.showToast({
        title: '请输入有效的基本尺寸',
        icon: 'none'
      });
      return;
    }
    
    // 查找尺寸分段
    let sizeRangeIndex = -1;
    for (let i = 0; i < toleranceData.sizeRanges.length; i++) {
      const range = toleranceData.sizeRanges[i];
      if (basicSize > range.min && basicSize <= range.max) {
        sizeRangeIndex = i;
        break;
      }
    }
    
    if (sizeRangeIndex === -1) {
      wx.showToast({
        title: '基本尺寸超出查询范围',
        icon: 'none'
      });
      return;
    }
    
    // 获取标准公差值(转换为mm)
    const standardTolerance = toleranceData.standardTolerances[currentGrade] 
      ? toleranceData.standardTolerances[currentGrade][sizeRangeIndex] / 1000 
      : 0;
    
    // 获取基本偏差(转换为mm)
    let fundamentalDeviation = 0;
    if (currentType === '孔') {
      if (toleranceData.holeFundamentalDeviations[currentTolerance]) {
        fundamentalDeviation = toleranceData.holeFundamentalDeviations[currentTolerance][sizeRangeIndex] / 1000;
      }
    } else {
      if (toleranceData.shaftFundamentalDeviations[currentTolerance]) {
        fundamentalDeviation = toleranceData.shaftFundamentalDeviations[currentTolerance][sizeRangeIndex] / 1000;
      }
    }
    
    // 计算上下偏差
    let upperDeviation, lowerDeviation;
    if (currentType === '孔') {
      upperDeviation = fundamentalDeviation + standardTolerance;
      lowerDeviation = fundamentalDeviation;
    } else {
      upperDeviation = fundamentalDeviation;
      lowerDeviation = fundamentalDeviation - standardTolerance;
    }
    
    // 生成上下偏差显示文本
    const upperTypeDisplay = upperDeviation >= 0 ? `+${upperDeviation.toFixed(3)}` : upperDeviation.toFixed(3);
    const lowerTypeDisplay = lowerDeviation >= 0 ? `+${lowerDeviation.toFixed(3)}` : lowerDeviation.toFixed(3);
    
    // 更新数据
    this.setData({
      showResult: true,
      upperDeviation: upperDeviation.toFixed(3),
      lowerDeviation: lowerDeviation.toFixed(3),
      toleranceValue: standardTolerance.toFixed(3),
      upperTypeDisplay: upperTypeDisplay,
      lowerTypeDisplay: lowerTypeDisplay,
      maxSize: '',
      minSize: ''
    });
    
    // 计算最大最小尺寸
    this.computeMaxMinSize();
  },
  
  computeMaxMinSize: function() {
    const basicSize = parseFloat(this.data.basicSize);
    const upperDeviation = parseFloat(this.data.upperDeviation);
    const lowerDeviation = parseFloat(this.data.lowerDeviation);
    
    if (!isNaN(basicSize) && !isNaN(upperDeviation) && !isNaN(lowerDeviation)) {
      this.setData({
        maxSize: (basicSize + upperDeviation).toFixed(3),
        minSize: (basicSize + lowerDeviation).toFixed(3)
      });
    }
  }
});