Page({
  data: {
    angle: '',
    unitIndex: 0,
    funcIndex: 0,
    units: ['角度(°)', '弧度(rad)'],
    functions: ['正弦(sin)', '余弦(cos)', '正切(tan)', '反正弦(arcsin)', '反余弦(arccos)', '反正切(arctan)'],
    showResult: false,
    result: ''
  },

  inputAngle(e) {
    this.setData({ angle: e.detail.value });
  },

  changeUnit(e) {
    this.setData({ unitIndex: e.detail.value });
  },

  changeFunction(e) {
    this.setData({ funcIndex: e.detail.value });
  },

  calculate() {
    const { angle, unitIndex, funcIndex } = this.data;
    if (!angle) return;

    const value = parseFloat(angle);
    let result;
    let isInverse = funcIndex >= 3;

    // 处理反三角函数
    if (isInverse) {
      // 反三角函数定义域检查
      if ((funcIndex === 3 || funcIndex === 4) && (value < -1 || value > 1)) {
        this.setData({ showResult: true, result: '输入超出定义域[-1,1]' });
        return;
      }

      switch (funcIndex) {
        case 3: // 反正弦
          result = Math.asin(value);
          break;
        case 4: // 反余弦
          result = Math.acos(value);
          break;
        case 5: // 反正切
          result = Math.atan(value);
          break;
        default:
          result = 0;
      }

      // 反三角函数结果转角度
      if (unitIndex === 0) {
        result = result * 180 / Math.PI;
      }
    } else {
      // 正三角函数计算
      let radians = value;
      // 角度转弧度
      if (unitIndex === 0) {
        radians = radians * Math.PI / 180;
      }

      switch (funcIndex) {
        case 0:
          result = Math.sin(radians);
          break;
        case 1:
          result = Math.cos(radians);
          break;
        case 2:
          // 处理正切函数的特殊情况
          if (Math.abs(radians % Math.PI) === Math.PI / 2) {
            this.setData({ showResult: true, result: '无穷大(±∞)' });
            return;
          }
          result = Math.tan(radians);
          break;
        default:
          result = 0;
      }
    }

    // 结果保留6位小数
    this.setData({
      showResult: true,
      result: typeof result === 'number' ? result.toFixed(6) : result
    });
  }
})