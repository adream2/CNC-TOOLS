Page({
  data: {
    // 尺寸类型选项
    dimensionTypeOptions: [
      { name: '线性尺寸', value: 'linear', index: 0 },
      { name: '角度尺寸', value: 'angle', index: 1 },
      { name: '倒角倒圆尺寸', value: 'chamfer', index: 2 }
    ],
    
    // 公差等级选项
    toleranceClassOptions: [
      { name: '精密级(f)', value: 'f', index: 0 },
      { name: '中等级(m)', value: 'm', index: 1 },
      { name: '粗糙级(c)', value: 'c', index: 2 },
      { name: '最粗级(v)', value: 'v', index: 3 }
    ],
    
    // 表单数据
    formData: {
      dimensionType: 'linear',
      dimensionTypeIndex: 0,
      toleranceClass: 'm',
      toleranceClassIndex: 1,
      sizeValue: ''
    },
    
    // 错误信息
    errors: {
      dimensionType: '',
      toleranceClass: '',
      sizeValue: ''
    },
    
    // 查询结果
    queryResult: null,
    
    // 线性尺寸公差表 (GB/T 1804-2000)
    linearToleranceTable: [
      { min: 0, max: 3, f: "±0.05", m: "±0.1", c: "±0.2", v: "±0.5" },
      { min: 3, max: 6, f: "±0.05", m: "±0.1", c: "±0.3", v: "±0.5" },
      { min: 6, max: 30, f: "±0.1", m: "±0.2", c: "±0.5", v: "±1" },
      { min: 30, max: 120, f: "±0.15", m: "±0.3", c: "±0.8", v: "±1.5" },
      { min: 120, max: 400, f: "±0.2", m: "±0.5", c: "±1.2", v: "±2.5" },
      { min: 400, max: 1000, f: "±0.3", m: "±0.8", c: "±2", v: "±4" },
      { min: 1000, max: 2000, f: "±0.5", m: "±1.2", c: "±3", v: "±6" },
      { min: 2000, max: 4000, f: "±0.8", m: "±2", c: "±4", v: "±8" }
    ],
    
    // 角度尺寸公差表 (GB/T 1804-2020)
    angleToleranceTable: [
      { min: 0, max: 10, f: "±1°", m: "±1°", c: "±1°30'", v: "±3°" },
      { min: 10, max: 50, f: "±30'", m: "±30'", c: "±1°", v: "±2°" },
      { min: 50, max: 120, f: "±20'", m: "±20'", c: "±30'", v: "±1°" },
      { min: 120, max: 400, f: "±10'", m: "±10'", c: "±15'", v: "±30'" },
      { min: 400, max: 10000, f: "±5'", m: "±5'", c: "±10'", v: "±20'" }
    ],
    
    // 倒圆倒角尺寸公差表 (GB/T 1804-2020)
    chamferToleranceTable: [
      { min: 0.5, max: 3, f: "±0.2", m: "±0.2", c: "±0.4", v: "±0.4" },
      { min: 3, max: 6, f: "±0.5", m: "±0.5", c: "±1", v: "±1" },
      { min: 6, max: 30, f: "±1", m: "±1", c: "±2", v: "±2" },
      { min: 30, max: 120, f: "±2", m: "±2", c: "±4", v: "±4" }
    ],
    
    // 标准说明
    standardInfo: "本查询功能基于GB/T 1804-2020《一般公差 未注公差的线性和角度尺寸的公差》标准编制。\n\n该标准规定了未注公差的线性和角度尺寸的一般公差等级和极限偏差数值，适用于金属切削加工的尺寸，也适用于一般的冲压加工尺寸。非金属材料和其他工艺方法加工的尺寸可参照采用。\n\n注：2020版标准相较于2000版主要更新了公差数值表示方式和部分公差带范围。"
  },
  
  // 处理尺寸类型变更
  handleDimensionTypeChange: function(e) {
    const index = e.detail.value;
    const dimensionType = this.data.dimensionTypeOptions[index].value;
    
    this.setData({
      'formData.dimensionType': dimensionType,
      'formData.dimensionTypeIndex': index,
      'errors.dimensionType': ''
    });
  },
  
  // 处理公差等级变更
  handleToleranceClassChange: function(e) {
    const index = e.detail.value;
    const toleranceClass = this.data.toleranceClassOptions[index].value;
    
    this.setData({
      'formData.toleranceClass': toleranceClass,
      'formData.toleranceClassIndex': index,
      'errors.toleranceClass': ''
    });
  },
  
  // 处理尺寸值输入
  handleSizeValueInput: function(e) {
    this.setData({
      'formData.sizeValue': e.detail.value,
      'errors.sizeValue': ''
    });
  },
  
  // 验证表单
  validateForm: function() {
    const { dimensionType, toleranceClass, sizeValue } = this.data.formData;
    let isValid = true;
    const errors = { ...this.data.errors };
    
    // 重置错误信息
    Object.keys(errors).forEach(key => {
      errors[key] = '';
    });
    
    // 验证尺寸值
    if (!sizeValue) {
      errors.sizeValue = '请输入基本尺寸';
      isValid = false;
    } else {
      const value = parseFloat(sizeValue);
      
      if (isNaN(value)) {
        errors.sizeValue = '请输入有效的数字';
        isValid = false;
      } else if (value < 0) {
        errors.sizeValue = '基本尺寸不能为负数';
        isValid = false;
      } else {
        // 根据不同尺寸类型验证范围
        let maxSize;
        let dimensionTypeName = this.data.dimensionTypeOptions.find(
          item => item.value === dimensionType
        ).name;
        
        if (dimensionType === 'linear') {
          maxSize = 4000; // 线性尺寸最大范围
        } else if (dimensionType === 'angle') {
          maxSize = 10000; // 角度尺寸最大范围
          dimensionTypeName = '角度尺寸';
        } else { // chamfer
          maxSize = 120; // 倒圆倒角尺寸最大范围
        }
        
        if (value > maxSize) {
          errors.sizeValue = `${dimensionTypeName}基本尺寸不能超过${maxSize}${dimensionType === 'angle' ? '°' : 'mm'}`;
          isValid = false;
        }
      }
    }
    
    this.setData({ errors });
    return isValid;
  },
  
  // 查询公差
  queryTolerance: function() {
    if (!this.validateForm()) {
      return;
    }
    
    const { dimensionType, toleranceClass, sizeValue } = this.data.formData;
    const size = parseFloat(sizeValue);
    let tolerance = '';
    let table = [];
    
    // 根据尺寸类型选择对应的公差表
    if (dimensionType === 'linear') {
      table = this.data.linearToleranceTable;
    } else if (dimensionType === 'angle') {
      table = this.data.angleToleranceTable;
    } else { // chamfer
      table = this.data.chamferToleranceTable;
    }
    
    // 查找对应的公差范围
    for (let i = 0; i < table.length; i++) {
      const range = table[i];
      if (size >= range.min && size <= range.max) {
        tolerance = range[toleranceClass];
        break;
      }
    }
    
    // 获取尺寸类型名称和单位
    const dimensionTypeName = this.data.dimensionTypeOptions.find(
      item => item.value === dimensionType
    ).name;
    
    const unit = dimensionType === 'angle' ? '°' : 'mm';
    
    // 获取公差等级名称
    const toleranceClassName = this.data.toleranceClassOptions.find(
      item => item.value === toleranceClass
    ).name;
    
    // 构建结果
    const result = {
      dimensionType: dimensionTypeName,
      toleranceClass: toleranceClassName,
      sizeValue: size,
      unit: unit,
      tolerance: tolerance
    };
    
    this.setData({ queryResult: result });
  },
  
  // 重置表单
  resetForm: function() {
    this.setData({
      formData: {
        dimensionType: 'linear',
        dimensionTypeIndex: 0,
        toleranceClass: 'm',
        toleranceClassIndex: 1,
        sizeValue: ''
      },
      errors: {
        dimensionType: '',
        toleranceClass: '',
        sizeValue: ''
      },
      queryResult: null
    });
  }
});