Page({
  data: {
    triangleType: 'right', // right, isosceles, general
    inputs: {
      a: '', // 角A的对边
      b: '', // 角B的对边
      c: '', // 角C的对边
      angleA: '', // 角A（顶点A的角度）
      angleB: '', // 角B（顶点B的角度）
      angleC: ''  // 角C（顶点C的角度）
    },
    showDiagram: true,
    calculating: false // 计算状态标志
  },

  // 格式化数字：保留4位小数，尾数为0时省略
  formatNumber(num) {
    if (num === '' || num === null || num === undefined) return '';
    const number = parseFloat(num);
    if (isNaN(number) || !isFinite(number)) return '';
    const fixed = number.toFixed(4);
    return fixed.replace(/\.?0+$/, '');
  },

  onLoad() {},

  // 切换三角形类型
  bindTriangleTypeChange(e) {
    this.setData({
      triangleType: e.detail.value,
      inputs: {
        a: '',
        b: '',
        c: '',
        angleA: '',
        angleB: '',
        angleC: ''
      },
      showDiagram: true,
      calculating: false
    });
  },

  // 输入处理（增强过滤）
  bindInputChange(e) {
    const { name } = e.currentTarget.dataset;
    let value = e.detail.value;
    
    // 过滤非法字符（只允许数字和小数点）
    value = value.replace(/[^\d.]/g, '');
    
    // 防止多个小数点
    const dotCount = value.split('.').length - 1;
    if (dotCount > 1) {
      value = value.substring(0, value.lastIndexOf('.'));
    }
    
    this.setData({
      [`inputs.${name}`]: value
    });
  },

  // 清空所有输入
  resetInputs() {
    this.setData({
      inputs: {
        a: '',
        b: '',
        c: '',
        angleA: '',
        angleB: '',
        angleC: ''
      },
      calculating: false
    });
  },

  // 计算三角形
  calculateTriangle() {
    this.setData({ calculating: true });
    wx.showLoading({ title: '计算中...', mask: true });
    
    // 使用setTimeout确保UI更新
    setTimeout(() => {
      try {
        const { triangleType, inputs } = this.data;
        
        // 转换输入值为数字
        const processedInputs = {};
        for (const key in inputs) {
          const value = inputs[key];
          if (value === '') {
            processedInputs[key] = '';
          } else {
            const num = parseFloat(value);
            processedInputs[key] = isNaN(num) ? '' : num;
          }
        }
        
        // 过滤无效输入
        const validInputs = {};
        for (const key in processedInputs) {
          if (processedInputs[key] !== '' && !isNaN(processedInputs[key])) {
            validInputs[key] = processedInputs[key];
          }
        }
        
        // 检查有效参数数量
        const inputCount = Object.keys(validInputs).length;
        if (inputCount < 2) {
          wx.showToast({
            title: '至少需要2个参数',
            icon: 'none',
            duration: 2000
          });
          return;
        }

        // 角度和验证 (如果提供了两个或三个角度)
        const angles = [];
        if (validInputs.angleA !== undefined) angles.push(validInputs.angleA);
        if (validInputs.angleB !== undefined) angles.push(validInputs.angleB);
        if (validInputs.angleC !== undefined) angles.push(validInputs.angleC);

        if (angles.length >= 2) {
          const sum = angles.reduce((a, b) => a + b, 0);
          if (angles.length === 3 && Math.abs(sum - 180) > 1e-8) {
            throw new Error('角度和必须为180°');
          } else if (angles.length === 2 && sum >= 180 - 1e-8) {
            throw new Error('角度和必须小于180°');
          }
        }
        
        let results = null;
    switch (triangleType) {
      case 'right':
        results = this.calculateRightTriangle(validInputs);
        break;
      case 'isosceles':
        results = this.calculateIsoscelesTriangle(validInputs);
        break;
      case 'general':
        results = this.calculateGeneralTriangle(validInputs);
        break;
    }

    if (!results) {
      throw new Error('无法计算，请检查输入参数');
    }

    // 统一验证三角形条件
    const { a, b, c } = results;
    const EPSILON = 1e-8;
    if (a + b <= c + EPSILON || a + c <= b + EPSILON || b + c <= a + EPSILON) {
      throw new Error('两边之和必须大于第三边');
    }
        
        // 只更新用户未输入的字段
        const newInputs = {...this.data.inputs};
        let updated = false;
        
        for (const key in results) {
          if (this.data.inputs[key] === '') {
            newInputs[key] = this.formatNumber(results[key]);
            updated = true;
          }
        }
        
        if (updated) {
          this.setData({ inputs: newInputs });
        } else {
          wx.showToast({
            title: '所有字段已填写',
            icon: 'none',
            duration: 2000
          });
        }
      } catch (e) {
        console.error('计算出错:', e);
        wx.showToast({ 
          title: e.message || '计算错误，请检查输入', 
          icon: 'none',
          duration: 3000
        });
      } finally {
        wx.hideLoading();
        this.setData({ calculating: false });
      }
    }, 300);
  },

  // 等腰三角形计算 - 严格遵循边角关系
  calculateIsoscelesTriangle(inputs) {
    const { a, b, c, angleA, angleB, angleC } = inputs;
    const toRadian = (angle) => angle * Math.PI / 180;
    const toDegree = (radian) => radian * 180 / Math.PI;
    const inputKeys = Object.keys(inputs);
    const EPSILON = 1e-8;

    // 等腰三角形约定：AB = AC (即b = c), 角B = 角C
    // 因此：边a是底边，边b和边c是腰（相等），角A是顶角，角B和角C是底角（相等）

    // 已知腰长和底边 (b, c, a) - 腰b=c，底a
    if (inputKeys.includes('b') && inputKeys.includes('a')) {
      const bVal = b; // 腰长 (AB)
      const aVal = a; // 底边 (BC)
      
      // 验证三角形条件
      if (2 * bVal <= aVal + EPSILON) throw new Error('两边之和必须大于第三边');
      if (aVal <= 0 || bVal <= 0) throw new Error('边长必须大于0');

      // 计算高度
      const height = Math.sqrt(bVal * bVal - (aVal * aVal) / 4);
      
      // 计算底角 (角B和角C)
      const angleBVal = toDegree(Math.atan((2 * height) / aVal));
      
      // 计算顶角 (角A)
      const angleAVal = 180 - 2 * angleBVal;



    return {
        a: aVal,
        b: bVal,
        c: bVal, // 等腰，所以c = b
        angleA: angleAVal,
        angleB: angleBVal,
        angleC: angleBVal  // 底角相等
      };
    }
    // 已知腰长和顶角 (b, angleA) - 腰b=c，顶角A
    else if (inputKeys.includes('b') && inputKeys.includes('angleA')) {
      const bVal = b; // 腰长 (AB)
      const angleAVal = angleA; // 顶角 (角A)
      if (angleAVal <= 0 || angleAVal >= 180) throw new Error('顶角必须在0-180°之间');

      // 计算底角
      const angleBVal = (180 - angleAVal) / 2;
      
      // 计算底边 (BC = a)
      const aVal = 2 * bVal * Math.sin(toRadian(angleAVal / 2));

      return {
        a: aVal,
        b: bVal,
        c: bVal, // 等腰，所以c = b
        angleA: angleAVal,
        angleB: angleBVal,
        angleC: angleBVal  // 底角相等
      };
    }
    // 已知腰长和底角 (b, angleB) - 腰b=c，底角B
    else if (inputKeys.includes('b') && inputKeys.includes('angleB')) {
      const bVal = b; // 腰长 (AB)
      const angleBVal = angleB; // 底角 (角B)
      if (angleBVal <= 0 || angleBVal >= 90) throw new Error('底角必须在0-90°之间');

      // 计算顶角
      const angleAVal = 180 - 2 * angleBVal;
      
      // 计算底边 (BC = a)
      const aVal = 2 * bVal * Math.sin(toRadian(angleBVal));

      return {
        a: aVal,
        b: bVal,
        c: bVal, // 等腰，所以c = b
        angleA: angleAVal,
        angleB: angleBVal,
        angleC: angleBVal  // 底角相等
      };
    }
    // 已知底边和底角 (a, angleB) - 底边a，底角B
    else if (inputKeys.includes('a') && inputKeys.includes('angleB')) {
      const aVal = a; // 底边 (BC)
      const angleBVal = angleB; // 底角 (角B)
      if (angleBVal <= 0 || angleBVal >= 90) throw new Error('底角必须在0-90°之间');

      // 计算顶角
      const angleAVal = 180 - 2 * angleBVal;
      
      // 计算腰长 (AB = b = c)
      const bVal = aVal / (2 * Math.sin(toRadian(angleBVal)));

      return {
        a: aVal,
        b: bVal,
        c: bVal, // 等腰，所以c = b
        angleA: angleAVal,
        angleB: angleBVal,
        angleC: angleBVal  // 底角相等
      };
    } else {
      throw new Error('输入参数组合无法计算');
    }
  },

// 一般三角形计算 - 严格遵循边角关系
calculateGeneralTriangle(inputs) {
  const { a, b, c, angleA, angleB, angleC } = inputs;
  const toRadian = (angle) => angle * Math.PI / 180;
  const toDegree = (radian) => radian * 180 / Math.PI;
  const EPSILON = 1e-8;
  const inputKeys = Object.keys(inputs);

  // 已知三边(SSS) - 边a, b, c
  if (inputKeys.includes('a') && inputKeys.includes('b') && inputKeys.includes('c')) {
    const aVal = a;
    const bVal = b;
    const cVal = c;
    
    // 严格验证三角形条件
      if (aVal + bVal <= cVal + EPSILON || 
          aVal + cVal <= bVal + EPSILON || 
          bVal + cVal <= aVal + EPSILON) {
        throw new Error('两边之和必须大于第三边');
      }
    
    if (aVal <= 0 || bVal <= 0 || cVal <= 0) {
      throw new Error('边长必须大于0');
    }

    // 使用余弦定理计算角度
    const cosA = (bVal * bVal + cVal * cVal - aVal * aVal) / (2 * bVal * cVal);
    const cosB = (aVal * aVal + cVal * cVal - bVal * bVal) / (2 * aVal * cVal);
    
    // 处理浮点精度问题
    const clamp = (value) => Math.max(-1, Math.min(1, value));
    const clampedCosA = clamp(cosA);
    const clampedCosB = clamp(cosB);
    
    const angleAVal = toDegree(Math.acos(clampedCosA));
    const angleBVal = toDegree(Math.acos(clampedCosB));
    const angleCVal = 180 - angleAVal - angleBVal;

    return {
      a: aVal,
      b: bVal,
      c: cVal,
      angleA: angleAVal,
      angleB: angleBVal,
      angleC: angleCVal
    };
  }
  // 已知两边及夹角 (SAS)
  // 情况1: 已知边b, c和夹角A (求边a)
  else if (inputKeys.includes('b') && inputKeys.includes('c') && inputKeys.includes('angleA')) {
    const bVal = b;
    const cVal = c;
    const angleAVal = angleA;
    const angleARad = toRadian(angleAVal);
    
    // 余弦定理求边a (对边)
    const aVal = Math.sqrt(bVal * bVal + cVal * cVal - 2 * bVal * cVal * Math.cos(angleARad));

    // 使用余弦定理计算角度（替代正弦定理）
    const cosB = (aVal * aVal + cVal * cVal - bVal * bVal) / (2 * aVal * cVal);
    const cosC = (aVal * aVal + bVal * bVal - cVal * cVal) / (2 * aVal * bVal);
    
    const clamp = (value) => Math.max(-1, Math.min(1, value));
    const clampedCosB = clamp(cosB);
    const clampedCosC = clamp(cosC);
    
    const angleBVal = toDegree(Math.acos(clampedCosB));
    const angleCVal = toDegree(Math.acos(clampedCosC));
    
    return {
      a: aVal,
      b: bVal,
      c: cVal,
      angleA: angleAVal,
      angleB: angleBVal,
      angleC: angleCVal
    };
  }
  // 情况2: 已知边a, c和夹角B (求边b)
  else if (inputKeys.includes('a') && inputKeys.includes('c') && inputKeys.includes('angleB')) {
    const aVal = a;
    const cVal = c;
    const angleBVal = angleB;
    const angleBRad = toRadian(angleBVal);
    
    // 余弦定理求边b (对边)
    const bVal = Math.sqrt(aVal * aVal + cVal * cVal - 2 * aVal * cVal * Math.cos(angleBRad));

    // 使用余弦定理计算角度
    const cosA = (bVal * bVal + cVal * cVal - aVal * aVal) / (2 * bVal * cVal);
    const cosC = (aVal * aVal + bVal * bVal - cVal * cVal) / (2 * aVal * bVal);
    
    const clamp = (value) => Math.max(-1, Math.min(1, value));
    const clampedCosA = clamp(cosA);
    const clampedCosC = clamp(cosC);
    
    const angleAVal = toDegree(Math.acos(clampedCosA));
    const angleCVal = toDegree(Math.acos(clampedCosC));
    
    return {
      a: aVal,
      b: bVal,
      c: cVal,
      angleA: angleAVal,
      angleB: angleBVal,
      angleC: angleCVal
    };
  }
  // 情况3: 已知边a, b和夹角C (求边c)
  else if (inputKeys.includes('a') && inputKeys.includes('b') && inputKeys.includes('angleC')) {
    const aVal = a;
    const bVal = b;
    const angleCVal = angleC;
    const angleCRad = toRadian(angleCVal);
    
    // 余弦定理求边c (对边)
    const cVal = Math.sqrt(aVal * aVal + bVal * bVal - 2 * aVal * bVal * Math.cos(angleCRad));

    // 使用余弦定理计算角度
    const cosA = (bVal * bVal + cVal * cVal - aVal * aVal) / (2 * bVal * cVal);
    const cosB = (aVal * aVal + cVal * cVal - bVal * bVal) / (2 * aVal * cVal);
    
    const clamp = (value) => Math.max(-1, Math.min(1, value));
    const clampedCosA = clamp(cosA);
    const clampedCosB = clamp(cosB);
    
    const angleAVal = toDegree(Math.acos(clampedCosA));
    const angleBVal = toDegree(Math.acos(clampedCosB));
    
    return {
      a: aVal,
      b: bVal,
      c: cVal,
      angleA: angleAVal,
      angleB: angleBVal,
      angleC: angleCVal
    };
  }
  // 已知两角及夹边 (ASA)
  else if (
    (inputKeys.includes('angleA') && inputKeys.includes('angleB') && inputKeys.includes('c')) || // 夹边c
    (inputKeys.includes('angleA') && inputKeys.includes('angleC') && inputKeys.includes('b')) || // 夹边b
    (inputKeys.includes('angleB') && inputKeys.includes('angleC') && inputKeys.includes('a'))   // 夹边a
  ) {
    let angleAVal, angleBVal, angleCVal, aVal, bVal, cVal;

    if (inputKeys.includes('angleA') && inputKeys.includes('angleB') && inputKeys.includes('c')) {
      angleAVal = angleA;
      angleBVal = angleB;
      cVal = c; // 夹边c (角C的对边)
      
      // 验证角度和
      if (angleAVal + angleBVal >= 180 - EPSILON) {
        throw new Error('角度和必须小于180°');
      }
      
      angleCVal = 180 - angleAVal - angleBVal;
    } 
    else if (inputKeys.includes('angleA') && inputKeys.includes('angleC') && inputKeys.includes('b')) {
      angleAVal = angleA;
      angleCVal = angleC;
      bVal = b; // 夹边b (角B的对边)
      
      // 验证角度和
      if (angleAVal + angleCVal >= 180 - EPSILON) {
        throw new Error('角度和必须小于180°');
      }
      
      angleBVal = 180 - angleAVal - angleCVal;
    } 
    else { // angleB && angleC && a
      angleBVal = angleB;
      angleCVal = angleC;
      aVal = a; // 夹边a (角A的对边)
      
      // 验证角度和
      if (angleBVal + angleCVal >= 180 - EPSILON) {
        throw new Error('角度和必须小于180°');
      }
      
      angleAVal = 180 - angleBVal - angleCVal;
    }
    
    // 正弦定理求其他边
    if (typeof cVal === 'number') {
      aVal = cVal * Math.sin(toRadian(angleAVal)) / Math.sin(toRadian(angleCVal));
      bVal = cVal * Math.sin(toRadian(angleBVal)) / Math.sin(toRadian(angleCVal));
    } 
    else if (typeof bVal === 'number') {
      aVal = bVal * Math.sin(toRadian(angleAVal)) / Math.sin(toRadian(angleBVal));
      cVal = bVal * Math.sin(toRadian(angleCVal)) / Math.sin(toRadian(angleBVal));
    } 
    else { // aVal defined
      bVal = aVal * Math.sin(toRadian(angleBVal)) / Math.sin(toRadian(angleAVal));
      cVal = aVal * Math.sin(toRadian(angleCVal)) / Math.sin(toRadian(angleAVal));
    }

    return {
      a: aVal,
      b: bVal,
      c: cVal,
      angleA: angleAVal,
      angleB: angleBVal,
      angleC: angleCVal
    };
  }
  // 已知两角及非夹边 (AAS)
  else if (
    (inputKeys.includes('angleA') && inputKeys.includes('angleB') && inputKeys.includes('a')) ||
    (inputKeys.includes('angleA') && inputKeys.includes('angleB') && inputKeys.includes('b')) ||
    (inputKeys.includes('angleA') && inputKeys.includes('angleC') && inputKeys.includes('a')) ||
    (inputKeys.includes('angleA') && inputKeys.includes('angleC') && inputKeys.includes('c')) ||
    (inputKeys.includes('angleB') && inputKeys.includes('angleC') && inputKeys.includes('b')) ||
    (inputKeys.includes('angleB') && inputKeys.includes('angleC') && inputKeys.includes('c'))
  ) {
    let angleAVal, angleBVal, angleCVal, aVal, bVal, cVal;

    // 确定已知的两个角和一条边
    if (inputKeys.includes('angleA') && inputKeys.includes('angleB')) {
      angleAVal = angleA;
      angleBVal = angleB;
      
      // 验证角度和
      if (angleAVal + angleBVal >= 180 - EPSILON) {
        throw new Error('角度和必须小于180°');
      }
      
      angleCVal = 180 - angleAVal - angleBVal;
      
      if (inputKeys.includes('a')) {
        aVal = a;
      } else if (inputKeys.includes('b')) {
        bVal = b;
      }
    }
    else if (inputKeys.includes('angleA') && inputKeys.includes('angleC')) {
      angleAVal = angleA;
      angleCVal = angleC;
      
      // 验证角度和
      if (angleAVal + angleCVal >= 180 - EPSILON) {
        throw new Error('角度和必须小于180°');
      }
      
      angleBVal = 180 - angleAVal - angleCVal;
      
      if (inputKeys.includes('a')) {
        aVal = a;
      } else if (inputKeys.includes('c')) {
        cVal = c;
      }
    }
    else { // angleB && angleC
      angleBVal = angleB;
      angleCVal = angleC;
      
      // 验证角度和
      if (angleBVal + angleCVal >= 180 - EPSILON) {
        throw new Error('角度和必须小于180°');
      }
      
      angleAVal = 180 - angleBVal - angleCVal;
      
      if (inputKeys.includes('b')) {
        bVal = b;
      } else if (inputKeys.includes('c')) {
        cVal = c;
      }
    }
    
    // 正弦定理求其他边
    if (typeof aVal === 'number') {
      bVal = aVal * Math.sin(toRadian(angleBVal)) / Math.sin(toRadian(angleAVal));
      cVal = aVal * Math.sin(toRadian(angleCVal)) / Math.sin(toRadian(angleAVal));
    } 
    else if (typeof bVal === 'number') {
      aVal = bVal * Math.sin(toRadian(angleAVal)) / Math.sin(toRadian(angleBVal));
      cVal = bVal * Math.sin(toRadian(angleCVal)) / Math.sin(toRadian(angleBVal));
    } 
    else { // cVal defined
      aVal = cVal * Math.sin(toRadian(angleAVal)) / Math.sin(toRadian(angleCVal));
      bVal = cVal * Math.sin(toRadian(angleBVal)) / Math.sin(toRadian(angleCVal));
    }

    return {
      a: aVal,
      b: bVal,
      c: cVal,
      angleA: angleAVal,
      angleB: angleBVal,
      angleC: angleCVal
    };
  } else {
    throw new Error('请提供有效的参数组合');
  }
},

  // 直角三角形计算 - 严格遵循边角关系
  calculateRightTriangle(inputs) {
    const { a, b, c, angleA, angleB, angleC } = inputs;
    const toRadian = (angle) => angle * Math.PI / 180;
    const toDegree = (radian) => radian * 180 / Math.PI;
    const EPSILON = 1e-8;
    
    // 直角三角形约定：角C = 90°
    const angleCVal = 90;

    // 已知两条直角边 (a, b) - 对边a, 邻边b
    if (a !== undefined && b !== undefined) {
      const aVal = a; // 角A的对边
      const bVal = b; // 角B的对边
      
      // 斜边c (角C的对边)
      const cVal = Math.sqrt(aVal * aVal + bVal * bVal);
      
      // 计算锐角
      const angleAVal = toDegree(Math.atan(aVal / bVal));
      const angleBVal = 90 - angleAVal;

      return {
        a: aVal,
        b: bVal,
        c: cVal,
        angleA: angleAVal,
        angleB: angleBVal,
        angleC: angleCVal
      };
    }

    // 已知直角边a和斜边c (对边a, 斜边c)
    if (a !== undefined && c !== undefined) {
      const aVal = a; // 角A的对边
      const cVal = c; // 角C的对边 (斜边)
      
      if (aVal >= cVal) throw new Error('直角边必须小于斜边');
      
      // 另一条直角边b (角B的对边)
      const bVal = Math.sqrt(cVal * cVal - aVal * aVal);
      
      // 计算锐角
      const angleAVal = toDegree(Math.asin(aVal / cVal));
      const angleBVal = 90 - angleAVal;

      return {
        a: aVal,
        b: bVal,
        c: cVal,
        angleA: angleAVal,
        angleB: angleBVal,
        angleC: angleCVal
      };
    }

    // 已知直角边b和斜边c (邻边b, 斜边c)
    if (b !== undefined && c !== undefined) {
      const bVal = b; // 角B的对边
      const cVal = c; // 角C的对边 (斜边)
      
      if (bVal >= cVal) throw new Error('直角边必须小于斜边');
      
      // 另一条直角边a (角A的对边)
      const aVal = Math.sqrt(cVal * cVal - bVal * bVal);
      
      // 计算锐角
      const angleBVal = toDegree(Math.asin(bVal / cVal));
      const angleAVal = 90 - angleBVal;

      return {
        a: aVal,
        b: bVal,
        c: cVal,
        angleA: angleAVal,
        angleB: angleBVal,
        angleC: angleCVal
      };
    }

    // 已知直角边a和角度A (对边a, 锐角A)
    if (a !== undefined && angleA !== undefined) {
      const aVal = a; // 角A的对边
      const angleAVal = angleA; // 角A
      
      if (angleAVal <= 0 || angleAVal >= 90) throw new Error('角度A必须在0-90°之间');
      
      // 斜边c
      const cVal = aVal / Math.sin(toRadian(angleAVal));
      
      // 邻边b
      const bVal = aVal / Math.tan(toRadian(angleAVal));
      
      // 另一锐角
      const angleBVal = 90 - angleAVal;

      return {
        a: aVal,
        b: bVal,
        c: cVal,
        angleA: angleAVal,
        angleB: angleBVal,
        angleC: angleCVal
      };
    }

    // 已知直角边b和角度B (邻边b, 锐角B)
    if (b !== undefined && angleB !== undefined) {
      const bVal = b; // 角B的对边
      const angleBVal = angleB; // 角B
      
      if (angleBVal <= 0 || angleBVal >= 90) throw new Error('角度B必须在0-90°之间');
      
      // 斜边c
      const cVal = bVal / Math.sin(toRadian(angleBVal));
      
      // 对边a
      const aVal = bVal / Math.tan(toRadian(angleBVal));
      
      // 另一锐角
      const angleAVal = 90 - angleBVal;

      return {
        a: aVal,
        b: bVal,
        c: cVal,
        angleA: angleAVal,
        angleB: angleBVal,
        angleC: angleCVal
      };
    }

    // 已知斜边c和角度A (斜边c, 锐角A)
    if (c !== undefined && angleA !== undefined) {
      const cVal = c; // 角C的对边 (斜边)
      const angleAVal = angleA; // 角A
      
      if (angleAVal <= 0 || angleAVal >= 90) throw new Error('角度A必须在0-90°之间');
      
      // 对边a
      const aVal = cVal * Math.sin(toRadian(angleAVal));
      
      // 邻边b
      const bVal = cVal * Math.cos(toRadian(angleAVal));
      
      // 另一锐角
      const angleBVal = 90 - angleAVal;

      return {
        a: aVal,
        b: bVal,
        c: cVal,
        angleA: angleAVal,
        angleB: angleBVal,
        angleC: angleCVal
      };
    }

    // 已知斜边c和角度B (斜边c, 锐角B)
    if (c !== undefined && angleB !== undefined) {
      const cVal = c; // 角C的对边 (斜边)
      const angleBVal = angleB; // 角B
      
      if (angleBVal <= 0 || angleBVal >= 90) throw new Error('角度B必须在0-90°之间');
      
      // 对边b (角B的对边)
      const bVal = cVal * Math.sin(toRadian(angleBVal));
      
      // 邻边a
      const aVal = cVal * Math.cos(toRadian(angleBVal));
      
      // 另一锐角
      const angleAVal = 90 - angleBVal;

      return {
        a: aVal,
        b: bVal,
        c: cVal,
        angleA: angleAVal,
        angleB: angleBVal,
        angleC: angleCVal
      };
    }

    throw new Error('请提供有效的参数组合');
  }
});