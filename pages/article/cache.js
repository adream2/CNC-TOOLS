/**
 * 小程序缓存管理模块
 * 用于缓存API响应数据，减轻服务器压力
 */

class CacheManager {
  constructor() {
    // 缓存键名前缀
    this.prefix = 'wp_cache_';
    // 默认缓存时长（毫秒）
    this.defaultExpireTime = 5 * 60 * 1000;
  }

  /**
   * 生成缓存键名
   * @param {string} key - 基础键名
   * @returns {string} 完整缓存键名
   */
  generateKey(key) {
    return this.prefix + key;
  }

  /**
   * 设置缓存
   * @param {string} key - 缓存键名
   * @param {any} data - 缓存数据
   * @param {number} expireTime - 过期时间（毫秒），可选
   */
  set(key, data, expireTime = this.defaultExpireTime) {
    try {
      const cacheKey = this.generateKey(key);
      const cacheData = {
        data: data,
        timestamp: Date.now(),
        expireTime: expireTime
      };
      
      wx.setStorageSync(cacheKey, cacheData);
    } catch (e) {
      console.error('设置缓存失败:', e);
    }
  }

  /**
   * 获取缓存
   * @param {string} key - 缓存键名
   * @returns {any|null} 缓存数据，如果不存在或过期则返回null
   */
  get(key) {
    try {
      const cacheKey = this.generateKey(key);
      const cacheData = wx.getStorageSync(cacheKey);
      
      if (!cacheData) {
        return null;
      }
      
      // 检查是否过期
      if (Date.now() - cacheData.timestamp > cacheData.expireTime) {
        // 过期则删除缓存
        wx.removeStorageSync(cacheKey);
        return null;
      }
      
      return cacheData.data;
    } catch (e) {
      console.error('获取缓存失败:', e);
      return null;
    }
  }

  /**
   * 删除缓存
   * @param {string} key - 缓存键名
   */
  remove(key) {
    try {
      const cacheKey = this.generateKey(key);
      wx.removeStorageSync(cacheKey);
    } catch (e) {
      console.error('删除缓存失败:', e);
    }
  }

  /**
   * 清空所有缓存
   */
  clear() {
    try {
      const res = wx.getStorageInfoSync();
      for (let key of res.keys) {
        if (key.startsWith(this.prefix)) {
          wx.removeStorageSync(key);
        }
      }
    } catch (e) {
      console.error('清空缓存失败:', e);
    }
  }

  /**
   * 获取缓存统计信息
   * @returns {object} 缓存统计信息
   */
  getStats() {
    try {
      const res = wx.getStorageInfoSync();
      let count = 0;
      let size = 0;
      
      for (let key of res.keys) {
        if (key.startsWith(this.prefix)) {
          count++;
          // 简化处理，实际大小可能需要更精确的计算
        }
      }
      
      return {
        count: count,
        size: size
      };
    } catch (e) {
      console.error('获取缓存统计信息失败:', e);
      return {
        count: 0,
        size: 0
      };
    }
  }
}

// 导出单例
module.exports = new CacheManager();