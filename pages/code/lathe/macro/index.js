Page({
  data: {
    systems: ['Fanuc', 'Siemens', 'Haas', 'Mazak'],
    systemIndex: 0,
    codes: []
  },

  onLoad: function() {
    // 加载默认系统(Fanuc)的宏代码数据
    this.loadMacroData(0);
  },

  // 根据系统索引加载宏代码数据
  loadMacroData: function(index) {
    const systemCodes = {
      0: [ // Fanuc
        { code: '#1-#33', description: '局部变量' },
        { code: '#100-#149', description: '公共变量(模态)' },
        { code: '#500-#531', description: '公共变量(非模态)' },
        { code: '#6000-#6031', description: '系统变量' },
        { code: 'G65', description: '宏程序调用' },
        { code: 'G66', description: '模态宏程序调用' },
        { code: 'G67', description: '模态宏程序取消' },
        { code: 'IF[ ]GOTO n', description: '条件转移' },
        { code: 'IF[ ]THEN', description: '条件执行' },
        { code: 'WHILE[ ]DO m', description: '循环开始' },
        { code: 'END m', description: '循环结束' },
        { code: '#i=#j', description: '变量赋值' },
        { code: '#i=#j+#k', description: '加法运算' },
        { code: '#i=#j-#k', description: '减法运算' },
        { code: '#i=#j*#k', description: '乘法运算' },
        { code: '#i=#j/#k', description: '除法运算' },
        { code: '#i=SIN[#j]', description: '正弦函数' },
        { code: '#i=COS[#j]', description: '余弦函数' },
        { code: 'G76', description: '螺纹切削复合循环宏' }
      ],
      1: [ // Siemens
        { code: 'R1-R299', description: '计算参数' },
        { code: 'G107', description: '宏程序调用' },
        { code: 'IF ... GOTO', description: '条件转移' },
        { code: 'IF ... THEN ... ELSE', description: '条件分支' },
        { code: 'LOOP ... ENDLOOP', description: '循环结构' },
        { code: 'FOR ... TO ... ENDFOR', description: '计数循环' },
        { code: 'CASE ... OF ... ENDCASE', description: '分支结构' },
        { code: 'R1=R2', description: '变量赋值' },
        { code: 'R1=R2+R3', description: '加法运算' },
        { code: 'R1=R2-R3', description: '减法运算' },
        { code: 'R1=R2*R3', description: '乘法运算' },
        { code: 'R1=R2/R3', description: '除法运算' },
        { code: 'R1=SIN(R2)', description: '正弦函数' },
        { code: 'R1=COS(R2)', description: '余弦函数' },
        { code: 'CYCLE97', description: '螺纹切削循环宏' }
      ],
      2: [ // Haas
        { code: '#1-#30', description: '局部变量' },
        { code: '#100-#199', description: '公共变量' },
        { code: '#500-#599', description: '系统变量' },
        { code: 'G65', description: '宏程序调用' },
        { code: 'G66', description: '模态宏程序调用' },
        { code: 'G67', description: '模态宏程序取消' },
        { code: 'IF[ ]GOTO', description: '条件转移' },
        { code: 'IF[ ]THEN', description: '条件执行' },
        { code: 'WHILE[ ]DO', description: '循环开始' },
        { code: 'END', description: '循环结束' },
        { code: '#i=#j', description: '变量赋值' },
        { code: '#i=#j+#k', description: '加法运算' },
        { code: '#i=#j-#k', description: '减法运算' },
        { code: '#i=#j*#k', description: '乘法运算' },
        { code: '#i=#j/#k', description: '除法运算' },
        { code: 'G76', description: '螺纹切削复合循环宏' }
      ],
      3: [ // Mazak
        { code: 'V1-V30', description: '局部变量' },
        { code: 'V100-V199', description: '公共变量' },
        { code: 'G65', description: '宏程序调用' },
        { code: 'IF ... THEN', description: '条件语句' },
        { code: 'IF ... THEN ... ELSE', description: '条件分支' },
        { code: 'DO ... LOOP', description: '循环结构' },
        { code: 'FOR ... NEXT', description: '计数循环' },
        { code: 'JMP LBL', description: '跳转语句' },
        { code: 'V1=V2', description: '变量赋值' },
        { code: 'V1=V2+V3', description: '加法运算' },
        { code: 'V1=V2-V3', description: '减法运算' },
        { code: 'V1=V2*V3', description: '乘法运算' },
        { code: 'V1=V2/V3', description: '除法运算' },
        { code: 'G76', description: '螺纹切削复合循环宏' }
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
    this.loadMacroData(index);
  }
})