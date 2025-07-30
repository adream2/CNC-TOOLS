Page({
  data: {
    systems: ['Fanuc', 'Siemens', 'Haas', 'Mazak'],
    systemIndex: 0,
    variables: []
  },

  onLoad: function() {
    // 加载默认系统(Fanuc)的宏变量数据
    this.loadVariableData(0);
  },

  // 根据系统索引加载宏变量数据
  loadVariableData: function(index) {
    const systemVariables = {
      0: [ // Fanuc
        { variable: '#1-#33', description: '局部变量 - 子程序专用' },
        { variable: '#100-#149', description: '公共变量 - 断电保持' },
        { variable: '#500-#531', description: '公共变量 - 断电清除' },
        { variable: '#6000-#6031', description: '系统变量 - 刀具补偿值' },
        { variable: '#6050-#6059', description: '系统变量 - 当前模态G代码' },
        { variable: '#6100-#6115', description: '系统变量 - 工件坐标系偏移' },
        { variable: '#6700-#6709', description: '系统变量 - 主轴转速' },
        { variable: '#6800-#6809', description: '系统变量 - 进给速度' },
        { variable: '#6900-#6909', description: '系统变量 - 当前位置坐标' },
        { variable: '#7000-#7009', description: '系统变量 - 剩余移动量' }
      ],
      1: [ // Siemens
        { variable: 'R1-R99', description: '计算参数 - 自由使用' },
        { variable: 'R100-R199', description: '计算参数 - 断电保持' },
        { variable: 'R200-R249', description: '计算参数 - 循环专用' },
        { variable: '$AA_IM[axis]', description: '系统变量 - 实际位置' },
        { variable: '$AA_SP[axis]', description: '系统变量 - 设定位置' },
        { variable: '$TC_DP1[tool]', description: '系统变量 - 刀具半径补偿' },
        { variable: '$TC_LD1[tool]', description: '系统变量 - 刀具长度补偿' },
        { variable: '$MA_SPIND_MAX', description: '系统变量 - 最大主轴转速' },
        { variable: '$AC_OVR[axis]', description: '系统变量 - 轴倍率' },
        { variable: '$MA_FEEDRATE_MAX', description: '系统变量 - 最大进给速度' }
      ],
      2: [ // Haas
        { variable: '#1-#30', description: '局部变量 - 子程序专用' },
        { variable: '#100-#199', description: '公共变量 - 断电保持' },
        { variable: '#500-#599', description: '系统变量 - 机床状态' },
        { variable: '#5220-#5223', description: '系统变量 - 当前位置(X/Y/Z/A)' },
        { variable: '#5240-#5243', description: '系统变量 - 程序位置(X/Y/Z/A)' },
        { variable: '#700-#749', description: '系统变量 - 刀具长度补偿' },
        { variable: '#800-#849', description: '系统变量 - 刀具半径补偿' },
        { variable: '#900-#909', description: '系统变量 - 主轴参数' },
        { variable: '#1000-#1009', description: '系统变量 - 进给速度参数' }
      ],
      3: [ // Mazak
        { variable: 'V1-V30', description: '局部变量 - 子程序专用' },
        { variable: 'V100-V199', description: '公共变量 - 断电保持' },
        { variable: 'V200-V299', description: '公共变量 - 断电清除' },
        { variable: 'V5000-V5100', description: '系统变量 - 机床参数' },
        { variable: 'V5200-V5203', description: '系统变量 - 当前位置(X/Y/Z/C)' },
        { variable: 'V5300-V5303', description: '系统变量 - 指令位置(X/Y/Z/C)' },
        { variable: 'V7000-V7099', description: '系统变量 - 刀具补偿值' },
        { variable: 'V8000-V8009', description: '系统变量 - 主轴控制参数' },
        { variable: 'V8100-V8109', description: '系统变量 - 进给控制参数' }
      ]
    };

    this.setData({
      variables: systemVariables[index]
    });
  },

  // 切换数控系统
  bindSystemChange: function(e) {
    const index = e.detail.value;
    this.setData({
      systemIndex: index
    });
    this.loadVariableData(index);
  }
})