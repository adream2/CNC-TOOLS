Page({
  data: {
    systems: ['Fanuc', 'Siemens', 'Haas', 'Mazak'],
    systemIndex: 0,
    codes: []
  },

  onLoad: function() {
    // 加载默认系统(Fanuc)的M代码数据
    this.loadMCodeData(0);
  },

  // 根据系统索引加载M代码数据
  loadMCodeData: function(index) {
    const systemCodes = {
      0: [ // Fanuc
        { code: 'M00', description: '程序停止' },
        { code: 'M01', description: '选择停止' },
        { code: 'M02', description: '程序结束' },
        { code: 'M03', description: '主轴正转' },
        { code: 'M04', description: '主轴反转' },
        { code: 'M05', description: '主轴停止' },
        { code: 'M06', description: '自动换刀' },
        { code: 'M07', description: '雾状冷却液开' },
        { code: 'M08', description: '液状冷却液开' },
        { code: 'M09', description: '冷却液关' },
        { code: 'M19', description: '主轴定向停止' },
        { code: 'M30', description: '程序结束并返回' },
        { code: 'M98', description: '子程序调用' },
        { code: 'M99', description: '子程序结束' }
      ],
      1: [ // Siemens
        { code: 'M00', description: '程序停止' },
        { code: 'M01', description: '选择停止' },
        { code: 'M02', description: '程序结束' },
        { code: 'M03', description: '主轴正转' },
        { code: 'M04', description: '主轴反转' },
        { code: 'M05', description: '主轴停止' },
        { code: 'M06', description: '自动换刀' },
        { code: 'M08', description: '冷却液开' },
        { code: 'M09', description: '冷却液关' },
        { code: 'M19', description: '主轴定向停止' },
        { code: 'M30', description: '程序结束并返回' },
        { code: 'M17', description: '子程序结束' },
        { code: 'M98', description: '子程序调用' }
      ],
      2: [ // Haas
        { code: 'M00', description: '程序停止' },
        { code: 'M01', description: '选择停止' },
        { code: 'M02', description: '程序结束' },
        { code: 'M03', description: '主轴正转' },
        { code: 'M04', description: '主轴反转' },
        { code: 'M05', description: '主轴停止' },
        { code: 'M06', description: '自动换刀' },
        { code: 'M07', description: '雾状冷却液开' },
        { code: 'M08', description: '液状冷却液开' },
        { code: 'M09', description: '冷却液关' },
        { code: 'M19', description: '主轴定向停止' },
        { code: 'M30', description: '程序结束并返回' },
        { code: 'M98', description: '子程序调用' },
        { code: 'M99', description: '子程序结束' }
      ],
      3: [ // Mazak
        { code: 'M00', description: '程序停止' },
        { code: 'M01', description: '选择停止' },
        { code: 'M02', description: '程序结束' },
        { code: 'M03', description: '主轴正转' },
        { code: 'M04', description: '主轴反转' },
        { code: 'M05', description: '主轴停止' },
        { code: 'M06', description: '自动换刀' },
        { code: 'M08', description: '冷却液开' },
        { code: 'M09', description: '冷却液关' },
        { code: 'M19', description: '主轴定向停止' },
        { code: 'M30', description: '程序结束并返回' },
        { code: 'M98', description: '子程序调用' },
        { code: 'M99', description: '子程序结束' }
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
    this.loadMCodeData(index);
  }
})