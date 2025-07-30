Page({
  data: {
    systems: ['Fanuc', 'Siemens', 'Haas', 'Mazak'],
    systemIndex: 0,
    codes: []
  },

  onLoad: function() {
    // 加载默认系统(Fanuc)的G代码数据
    this.loadGCodeData(0);
  },

  // 根据系统索引加载G代码数据
  loadGCodeData: function(index) {
    const systemCodes = {
      0: [ // Fanuc
        { code: 'G00', description: '快速定位' },
        { code: 'G01', description: '直线插补' },
        { code: 'G02', description: '顺时针圆弧插补' },
        { code: 'G03', description: '逆时针圆弧插补' },
        { code: 'G04', description: '暂停' },
        { code: 'G18', description: 'ZX平面选择' },
        { code: 'G20', description: '英寸单位' },
        { code: 'G21', description: '毫米单位' },
        { code: 'G32', description: '螺纹切削' },
        { code: 'G40', description: '刀具半径补偿取消' },
        { code: 'G41', description: '刀具半径左补偿' },
        { code: 'G42', description: '刀具半径右补偿' },
        { code: 'G43', description: '刀具长度正补偿' },
        { code: 'G70', description: '精车循环' },
        { code: 'G71', description: '粗车循环' },
        { code: 'G72', description: '端面粗车循环' },
        { code: 'G73', description: '封闭轮廓粗车循环' },
        { code: 'G90', description: '外径/内径切削循环' },
        { code: 'G92', description: '螺纹切削循环' },
        { code: 'G94', description: '端面切削循环' },
        { code: 'G96', description: '恒线速度控制' },
        { code: 'G97', description: '主轴转速恒定' },
        { code: 'G98', description: '每分钟进给' },
        { code: 'G99', description: '每转进给' }
      ],
      1: [ // Siemens
        { code: 'G00', description: '快速定位' },
        { code: 'G01', description: '直线插补' },
        { code: 'G02', description: '顺时针圆弧插补' },
        { code: 'G03', description: '逆时针圆弧插补' },
        { code: 'G04', description: '暂停' },
        { code: 'G18', description: 'ZX平面选择' },
        { code: 'G70', description: '英寸单位' },
        { code: 'G71', description: '毫米单位' },
        { code: 'G33', description: '螺纹切削' },
        { code: 'G40', description: '刀具半径补偿取消' },
        { code: 'G41', description: '刀具半径左补偿' },
        { code: 'G42', description: '刀具半径右补偿' },
        { code: 'G43', description: '刀具长度正补偿' },
        { code: 'CYCLE95', description: '精车循环' },
        { code: 'CYCLE97', description: '粗车循环' },
        { code: 'CYCLE82', description: '钻孔循环' },
        { code: 'G90', description: '外径/内径切削循环' },
        { code: 'G94', description: '端面切削循环' },
        { code: 'G96', description: '恒线速度控制' },
        { code: 'G97', description: '主轴转速恒定' },
        { code: 'G98', description: '每分钟进给' },
        { code: 'G99', description: '每转进给' }
      ],
      2: [ // Haas
        { code: 'G00', description: '快速定位' },
        { code: 'G01', description: '直线插补' },
        { code: 'G02', description: '顺时针圆弧插补' },
        { code: 'G03', description: '逆时针圆弧插补' },
        { code: 'G04', description: '暂停' },
        { code: 'G18', description: 'ZX平面选择' },
        { code: 'G20', description: '英寸单位' },
        { code: 'G21', description: '毫米单位' },
        { code: 'G32', description: '螺纹切削' },
        { code: 'G40', description: '刀具半径补偿取消' },
        { code: 'G41', description: '刀具半径左补偿' },
        { code: 'G42', description: '刀具半径右补偿' },
        { code: 'G43', description: '刀具长度正补偿' },
        { code: 'G70', description: '精车循环' },
        { code: 'G71', description: '粗车循环' },
        { code: 'G72', description: '端面粗车循环' },
        { code: 'G73', description: '封闭轮廓粗车循环' },
        { code: 'G90', description: '外径/内径切削循环' },
        { code: 'G92', description: '螺纹切削循环' },
        { code: 'G94', description: '端面切削循环' },
        { code: 'G96', description: '恒线速度控制' },
        { code: 'G97', description: '主轴转速恒定' },
        { code: 'G98', description: '每分钟进给' },
        { code: 'G99', description: '每转进给' }
      ],
      3: [ // Mazak
        { code: 'G00', description: '快速定位' },
        { code: 'G01', description: '直线插补' },
        { code: 'G02', description: '顺时针圆弧插补' },
        { code: 'G03', description: '逆时针圆弧插补' },
        { code: 'G04', description: '暂停' },
        { code: 'G18', description: 'ZX平面选择' },
        { code: 'G20', description: '英寸单位' },
        { code: 'G21', description: '毫米单位' },
        { code: 'G32', description: '螺纹切削' },
        { code: 'G40', description: '刀具半径补偿取消' },
        { code: 'G41', description: '刀具半径左补偿' },
        { code: 'G42', description: '刀具半径右补偿' },
        { code: 'G43', description: '刀具长度正补偿' },
        { code: 'G70', description: '精车循环' },
        { code: 'G71', description: '粗车循环' },
        { code: 'G72', description: '端面粗车循环' },
        { code: 'G90', description: '外径/内径切削循环' },
        { code: 'G92', description: '螺纹切削循环' },
        { code: 'G94', description: '端面切削循环' },
        { code: 'G96', description: '恒线速度控制' },
        { code: 'G97', description: '主轴转速恒定' },
        { code: 'G98', description: '每分钟进给' },
        { code: 'G99', description: '每转进给' }
      ]
    };

    this.setData({
      codes: systemCodes[index]
    });
  },

  // 切换数控系统
  bindSystemChange: function(e) {
    const index = e.detail.value;
    this.setData({
      systemIndex: index
    });
    this.loadGCodeData(index);
  }
})