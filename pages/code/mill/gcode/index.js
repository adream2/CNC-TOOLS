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
        { code: 'G17', description: 'XY平面选择' },
        { code: 'G18', description: 'ZX平面选择' },
        { code: 'G19', description: 'YZ平面选择' },
        { code: 'G20', description: '英寸单位' },
        { code: 'G21', description: '毫米单位' },
        { code: 'G40', description: '刀具半径补偿取消' },
        { code: 'G41', description: '刀具半径左补偿' },
        { code: 'G42', description: '刀具半径右补偿' },
        { code: 'G43', description: '刀具长度正补偿' },
        { code: 'G49', description: '刀具长度补偿取消' },
        { code: 'G54', description: '工件坐标系1选择' },
        { code: 'G55', description: '工件坐标系2选择' },
        { code: 'G80', description: '取消固定循环' },
        { code: 'G81', description: '钻孔循环' },
        { code: 'G83', description: '深孔啄钻循环' },
        { code: 'G90', description: '绝对坐标编程' },
        { code: 'G91', description: '增量坐标编程' },
        { code: 'G94', description: '每分钟进给' },
        { code: 'G95', description: '每转进给' }
      ],
      1: [ // Siemens
        { code: 'G00', description: '快速定位' },
        { code: 'G01', description: '直线插补' },
        { code: 'G02', description: '顺时针圆弧插补' },
        { code: 'G03', description: '逆时针圆弧插补' },
        { code: 'G04', description: '暂停' },
        { code: 'G17', description: 'XY平面选择' },
        { code: 'G18', description: 'ZX平面选择' },
        { code: 'G19', description: 'YZ平面选择' },
        { code: 'G70', description: '英寸单位' },
        { code: 'G71', description: '毫米单位' },
        { code: 'G40', description: '刀具半径补偿取消' },
        { code: 'G41', description: '刀具半径左补偿' },
        { code: 'G42', description: '刀具半径右补偿' },
        { code: 'G43', description: '刀具长度正补偿' },
        { code: 'G54', description: '工件坐标系1选择' },
        { code: 'CYCLE81', description: '钻孔循环' },
        { code: 'CYCLE83', description: '深孔啄钻循环' },
        { code: 'G90', description: '绝对坐标编程' },
        { code: 'G91', description: '增量坐标编程' },
        { code: 'G94', description: '每分钟进给' }
      ],
      2: [ // Haas
        { code: 'G00', description: '快速定位' },
        { code: 'G01', description: '直线插补' },
        { code: 'G02', description: '顺时针圆弧插补' },
        { code: 'G03', description: '逆时针圆弧插补' },
        { code: 'G04', description: '暂停' },
        { code: 'G17', description: 'XY平面选择' },
        { code: 'G18', description: 'ZX平面选择' },
        { code: 'G19', description: 'YZ平面选择' },
        { code: 'G20', description: '英寸单位' },
        { code: 'G21', description: '毫米单位' },
        { code: 'G40', description: '刀具半径补偿取消' },
        { code: 'G41', description: '刀具半径左补偿' },
        { code: 'G42', description: '刀具半径右补偿' },
        { code: 'G43', description: '刀具长度正补偿' },
        { code: 'G54', description: '工件坐标系1选择' },
        { code: 'G80', description: '取消固定循环' },
        { code: 'G81', description: '钻孔循环' },
        { code: 'G83', description: '深孔啄钻循环' },
        { code: 'G90', description: '绝对坐标编程' },
        { code: 'G91', description: '增量坐标编程' },
        { code: 'G94', description: '每分钟进给' }
      ],
      3: [ // Mazak
        { code: 'G00', description: '快速定位' },
        { code: 'G01', description: '直线插补' },
        { code: 'G02', description: '顺时针圆弧插补' },
        { code: 'G03', description: '逆时针圆弧插补' },
        { code: 'G04', description: '暂停' },
        { code: 'G17', description: 'XY平面选择' },
        { code: 'G18', description: 'ZX平面选择' },
        { code: 'G19', description: 'YZ平面选择' },
        { code: 'G20', description: '英寸单位' },
        { code: 'G21', description: '毫米单位' },
        { code: 'G40', description: '刀具半径补偿取消' },
        { code: 'G41', description: '刀具半径左补偿' },
        { code: 'G42', description: '刀具半径右补偿' },
        { code: 'G43', description: '刀具长度正补偿' },
        { code: 'G54', description: '工件坐标系1选择' },
        { code: 'G80', description: '取消固定循环' },
        { code: 'G81', description: '钻孔循环' },
        { code: 'G90', description: '绝对坐标编程' },
        { code: 'G91', description: '增量坐标编程' },
        { code: 'G94', description: '每分钟进给' }
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