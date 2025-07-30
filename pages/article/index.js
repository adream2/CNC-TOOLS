const config = require('./config.js')
const cache = require('./cache.js')
const util = require('./util.js')

Page({
  data: {
    posts: [],
    categories: [],
    currentCategory: 0,
    page: 1,
    loading: false,
    hasMore: true
  },

  onLoad: function() {
    this.getCategories()
    this.getPosts()
  },

  // 获取分类列表
  getCategories() {
    // 先尝试从缓存获取
    const cachedCategories = cache.get('categories');
    if (cachedCategories) {
      const allCategory = {id: 0, name: '全部'}
      this.setData({
        categories: [allCategory].concat(cachedCategories)
      })
      return;
    }
    
    const that = this
    wx.request({
      url: config.apiBaseUrl + '/categories',
      success: (res) => {
        if (res.statusCode === 200) {
          // 缓存分类数据（30分钟）
          cache.set('categories', res.data, 30 * 60 * 1000);
          
          const allCategory = {id: 0, name: '全部'}
          that.setData({
            categories: [allCategory].concat(res.data)
          })
        }
      },
      fail: (err) => {
      }
    })
  },

  // 获取文章列表
  getPosts(categoryId = null) {
    // 如果传入了分类ID，则使用传入的，否则使用当前选中的分类
    const targetCategory = categoryId !== null ? categoryId : this.data.currentCategory;
    
    if (this.data.loading) return
    
    this.setData({ loading: true })
    
    // 生成缓存键
    const cacheKey = `posts_page_${this.data.page}_category_${targetCategory}`;
    
    // 先尝试从缓存获取
    const cachedPosts = cache.get(cacheKey);
    if (cachedPosts && this.data.page === 1) {
      this.setData({
        posts: cachedPosts,
        loading: false,
        hasMore: cachedPosts.length === 10
      })
      return;
    }
    
    const that = this
    const requestData = {
      page: this.data.page,
      per_page: 10
    }
    
    // 如果不是"全部"分类，添加分类筛选参数
    if (targetCategory !== 0) {
      requestData.categories = targetCategory
    }
    
    wx.request({
      url: config.apiBaseUrl + '/posts',
      data: requestData,
      success: (res) => {
        if (res.statusCode === 200) {
          // 处理文章数据
          const newPosts = res.data.map(post => {
            // 获取分类名称
            let categoryName = '未分类'
            if (post.categories && Array.isArray(post.categories) && post.categories.length > 0) {
              // 这里简化处理，只取第一个分类
              categoryName = post.categories[0].name || categoryName
            }
            
            return {
              id: post.id,
              title: post.title && typeof post.title === 'object' ? post.title.rendered : post.title,
              excerpt: post.excerpt && typeof post.excerpt === 'object' ? post.excerpt.rendered : post.excerpt,
              category_name: categoryName,
              date: post.date ? util.formatDate(post.date) : '',
              view_count: post.view_count,
              comment_count: post.comment_count,
              thumbnail: post.thumbnail
            }
          })
          
          // 更新数据
          const updatedPosts = that.data.page === 1 ? newPosts : that.data.posts.concat(newPosts);
          
          // 如果是第一页，缓存数据
          if (that.data.page === 1) {
            // 获取服务器缓存时长设置
            wx.request({
              url: config.apiBaseUrl + '/site-info',
              success: (siteRes) => {
                if (siteRes.statusCode === 200 && siteRes.data.cache_duration) {
                  // 使用服务器设置的缓存时长（转换为毫秒）
                  cache.set(cacheKey, newPosts, siteRes.data.cache_duration * 1000);
                } else {
                  // 使用默认缓存时长（5分钟）
                  cache.set(cacheKey, newPosts, 5 * 60 * 1000);
                }
              },
              fail: () => {
                // 获取失败时使用默认缓存时长
                cache.set(cacheKey, newPosts, 5 * 60 * 1000);
              }
            });
          }
          
          that.setData({
            posts: updatedPosts,
            loading: false,
            hasMore: newPosts.length === 10 // 如果返回少于10篇文章，说明没有更多了
          })
        } else {
          that.setData({ 
            loading: false,
            hasMore: false
          })
        }
      },
      fail: (err) => {
        that.setData({ 
          loading: false,
          hasMore: false
        })
      }
    })
  },

  // 切换分类
  onCategoryTap(e) {
    const categoryId = e.currentTarget.dataset.id
    this.setData({
      currentCategory: categoryId,
      posts: [],
      page: 1
    })
    this.getPosts(categoryId)
  },

  // 下拉刷新
  onPullDownRefresh() {
    // 清除所有文章相关缓存
    const res = wx.getStorageInfoSync();
    for (let key of res.keys) {
      if (key.startsWith(cache.prefix + 'posts_') || key.startsWith(cache.prefix + 'categories')) {
        wx.removeStorageSync(key);
      }
    }
    
    this.setData({
      posts: [],
      page: 1
    })
    this.getPosts()
    wx.stopPullDownRefresh()
  },

  // 上拉加载更多
  onReachBottom() {
    if (!this.data.loading && this.data.hasMore) {
      this.setData({ 
        page: this.data.page + 1 
      })
      this.getPosts()
    }
  },

  // 点击文章
  onPostTap(e) {
    const postId = e.currentTarget.dataset.id
    if (postId) {
      // 保存文章ID到全局数据
      getApp().globalData.currentPostId = postId
      
      // 跳转到文章详情页
      wx.navigateTo({
        url: '../article/detail?id=' + postId,
        fail: function(err) {
          // 如果相对路径跳转失败，尝试使用绝对路径
          wx.navigateTo({
            url: '/pages/article/detail?id=' + postId,
            fail: function(err2) {
            }
          })
        }
      })
    } else {
    }
  }
})