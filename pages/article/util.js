function formatDate(dateString) {
  if (!dateString) return '';
  
  // 处理不同的日期格式
  let date;
  if (dateString.includes('T')) {
    // ISO格式日期 2020-12-01T12:00:00
    date = new Date(dateString.split('T')[0]);
  } else if (dateString.includes(' ')) {
    // 日期时间格式 2020-12-01 12:00:00
    date = new Date(dateString.split(' ')[0]);
  } else {
    // 其他格式
    date = new Date(dateString);
  }
  
  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return dateString; // 如果无法解析，返回原始字符串
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

module.exports = {
  formatDate
}