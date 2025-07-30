const config = require('./config.js')
const cache = require('./cache.js')

Page({
  data: {
    post: {
      content: ''
    },
    comments: [],
    loading: true,
    error: false,
    errorMsg: '',
    commentContent: '',
    replyToComment: null, // 用于存储正在回复的评论ID
    userInfo: {
      nickName: '匿名用户',
      avatarUrl: ''
    },
    expandedComments: {}, // 用于跟踪展开的评论
    lastCommentTime: 0, // 上次评论时间戳
    hasCodeBlocks: false // 标记是否有代码块
  },

  onLoad: function(options) {
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: '文章详情'
    });
    
    // 获取用户信息
    this.getUserInfo();
    
    // 获取上次评论时间
    const lastCommentTime = wx.getStorageSync('lastCommentTime') || 0;
    this.setData({
      lastCommentTime: lastCommentTime
    });
    
    const postId = options.id
    if (postId) {
      this.getPostDetail(postId)
      this.getComments(postId)
    } else {
      // 如果没有postId参数，显示错误信息
      this.setData({ 
        loading: false,
        error: true,
        errorMsg: '缺少文章ID参数'
      });
    }
  },

  // 获取用户信息
  getUserInfo: function() {
    const that = this;
    
    // 首先尝试从本地存储获取用户信息
    const storedUserInfo = wx.getStorageSync('userInfo');
    if (storedUserInfo) {
      that.setData({
        userInfo: storedUserInfo
      });
      return;
    }
    
    // 如果本地存储没有用户信息，使用默认匿名用户
    that.setData({
      userInfo: {
        nickName: '匿名用户',
        avatarUrl: ''
      }
    });
  },

  // 处理用户授权信息
  onGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo
      });
      // 将用户信息保存到本地存储
      wx.setStorageSync('userInfo', e.detail.userInfo);
      wx.showToast({
        title: '获取昵称成功',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '获取昵称失败',
        icon: 'none'
      });
    }
  },

  // 新的获取用户信息方法
  onGetUserInfoTap: function() {
    const that = this;
    wx.getUserProfile({
      desc: '用于评论时显示用户信息',
      success: (res) => {
        // 更新用户信息
        that.setData({
          userInfo: res.userInfo
        });
        // 将用户信息保存到本地存储
        wx.setStorageSync('userInfo', res.userInfo);
        wx.showToast({
          title: '获取昵称成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        console.error('获取用户信息失败:', err);
        wx.showToast({
          title: '获取昵称失败',
          icon: 'none'
        });
      }
    });
  },

  // 处理内容点击事件
  handleContentTap: function(e) {
    // 可以在这里添加实际的点击处理逻辑
  },

  // 处理代码标签样式 - 优化内容保留和显示效果
    processCodeTags: function(content) {
        // 确保content是字符串类型
        if (typeof content !== 'string') {
            content = String(content || '');
        }
        
        // 首先解码HTML实体
        content = content.replace(/&lt;/g, '<')
                         .replace(/&gt;/g, '>')
                         .replace(/&amp;/g, '&')
                         .replace(/&quot;/g, '"')
                         .replace(/&#39;/g, '\'')
                         .replace(/&nbsp;/g, ' ');

        // 处理带有行号的代码块（来自API处理后的代码块）
        content = content.replace(/<div class="code-block-wrapper">([\s\S]*?)<\/div>/gi, 
          '<div class="code-block-wrapper" style="position:relative;margin:20rpx 0;overflow-x:auto;background-color:#1e1e1e;border-radius:6rpx;">$1</div>');

        // 处理带有行号的pre代码块（API处理后的内容）
        content = content.replace(/<pre>([\s\S]*?)<\/pre>/gi, 
          '<pre style="background-color:#1e1e1e;color:#dcdcdc;padding:0;margin:0;font-size:26rpx;font-family:SFMono-Regular,Consolas,Monaco,\'Andale Mono\',\'Ubuntu Mono\',monospace;white-space:pre;overflow-x:auto;box-shadow:0 2rpx 6rpx rgba(0,0,0,0.15);border:1rpx solid #333;border-radius:6rpx;">$1</pre>');

        // 处理内联代码
        content = content.replace(/<code class="inline-code">([\s\S]*?)<\/code>/gi,
          '<code class="inline-code" style="background-color:#f0f0f0;color:#d73a49;padding:2rpx 6rpx;border-radius:4rpx;font-size:24rpx;font-family:SFMono-Regular,Consolas,Monaco,\'Andale Mono\',\'Ubuntu Mono\',monospace;white-space:nowrap;margin:0 4rpx;border:1rpx solid #e0e0e0;vertical-align:middle;">$1</code>');

        // 处理普通code标签（不带行号的）
        content = content.replace(/<code>([\s\S]*?)<\/code>/gi,
          '<code style="background-color:#f0f0f0;color:#d73a49;padding:2rpx 6rpx;border-radius:4rpx;font-size:24rpx;font-family:SFMono-Regular,Consolas,Monaco,\'Andale Mono\',\'Ubuntu Mono\',monospace;white-space:nowrap;margin:0 4rpx;border:1rpx solid #e0e0e0;vertical-align:middle;">$1</code>');

        // 处理带行号的代码行
        content = content.replace(/<div class="code-line">([\s\S]*?)<\/div>/gi,
          '<div class="code-line" style="display:flex;align-items:flex-start;padding:0 20rpx;line-height:1.6;background-color:#1e1e1e;min-width:max-content;">$1</div>');

        // 处理行号
        content = content.replace(/<span class="line-number">(\d+)<\/span>/gi,
          '<span class="line-number" style="color:#6b6b6b;text-align:right;min-width:40rpx;margin-right:15rpx;user-select:none;font-family:SFMono-Regular,Consolas,Monaco,\'Andale Mono\',\'Ubuntu Mono\',monospace;font-size:26rpx;padding-top:2rpx;">$1</span>');

        // 处理行内容
        content = content.replace(/<span class="line-content">([\s\S]*?)<\/span>/gi,
          '<span class="line-content" style="flex:1;color:#dcdcdc;font-family:SFMono-Regular,Consolas,Monaco,\'Andale Mono\',\'Ubuntu Mono\',monospace;white-space:pre;font-size:26rpx;padding-top:2rpx;">$1</span>');

        // 处理标题样式
        content = content.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '<h1 style="font-size:40rpx;margin:40rpx 0 20rpx;padding-bottom:10rpx;border-bottom:1rpx solid #eee;color:#333;font-weight:bold;">$1</h1>');
        content = content.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '<h2 style="font-size:36rpx;margin:35rpx 0 18rpx;padding-bottom:8rpx;border-bottom:1rpx solid #f0f0f0;color:#444;font-weight:bold;">$1</h2>');
        content = content.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '<h3 style="font-size:32rpx;margin:30rpx 0 16rpx;color:#555;font-weight:bold;">$1</h3>');
        content = content.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '<h4 style="font-size:28rpx;margin:25rpx 0 14rpx;color:#666;font-weight:bold;">$1</h4>');
        content = content.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '<h5 style="font-size:26rpx;margin:20rpx 0 12rpx;color:#777;font-weight:bold;">$1</h5>');
        content = content.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '<h6 style="font-size:24rpx;margin:20rpx 0 12rpx;color:#888;font-weight:bold;">$1</h6>');
        
        // 处理段落样式
        content = content.replace(/<p[^>]*>(.*?)<\/p>/gi, '<p style="margin:16rpx 0;line-height:1.8;">$1</p>');
        
        // 处理列表样式
        content = content.replace(/<ul[^>]*>(.*?)<\/ul>/gi, '<ul style="margin:20rpx 0;padding-left:40rpx;">$1</ul>');
        content = content.replace(/<ol[^>]*>(.*?)<\/ol>/gi, '<ol style="margin:20rpx 0;padding-left:40rpx;">$1</ol>');
        content = content.replace(/<li[^>]*>(.*?)<\/li>/gi, '<li style="margin:10rpx 0;line-height:1.6;">$1</li>');
        
        // 处理引用样式
        content = content.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '<blockquote style="margin:20rpx 0;padding:20rpx 30rpx;border-left:6rpx solid #1890ff;background-color:#f8f9fa;color:#666;font-style:italic;">$1</blockquote>');
        
        // 处理链接样式
        content = content.replace(/<a([^>]*?)href=(['"])([^'"].*?)\2([^>]*?)>(.*?)<\/a>/gi, '<a$1href=$2$3$2$4 style="color:#1890ff;text-decoration:none;">$5</a>');

        // 处理div标签为p标签以支持更多内容
        content = content.replace(/<div([^>]*?)>([\s\S]*?)<\/div>/gi, '<p$1>$2</p>');

        // 处理图片样式
        content = content.replace(/<img([^>]*?)>/gi, '<img$1 style="max-width:100%;height:auto;border-radius:8rpx;margin:20rpx 0;box-shadow:0 2rpx 8rpx rgba(0,0,0,0.1);">');
        
        // 处理表格样式
        content = content.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, '<table style="width:100%;border-collapse:collapse;margin:20rpx 0;">$1</table>');
        content = content.replace(/<th[^>]*>([\s\S]*?)<\/th>/gi, '<th style="padding:12rpx;border:1rpx solid #ddd;text-align:left;background-color:#f8f9fa;font-weight:bold;">$1</th>');
        content = content.replace(/<td[^>]*>([\s\S]*?)<\/td>/gi, '<td style="padding:12rpx;border:1rpx solid #ddd;text-align:left;">$1</td>');
        
        return content;
    },

  // 将HTML内容转换为节点数组 - 直接返回原始HTML确保内容一致
  parseContentToNodes: function(content) {
    // 确保content是字符串类型
    if (typeof content !== 'string') {
      content = String(content || '');
    }
    
    // 返回字符串格式，让rich-text组件自动解析
    return content;
  },

  // 获取文章详情
  getPostDetail: function(postId) {
    this.setData({ loading: true, error: false, errorMsg: '' });
    
    // 先尝试从缓存获取
    const cachedPost = cache.get(`post_${postId}`);
    if (cachedPost) {
      this.setData({
        post: cachedPost,
        error: false,
        errorMsg: '',
        loading: false,
        hasCodeBlocks: cachedPost.content.indexOf('<pre') !== -1
      });
      return;
    }
    
    const that = this; // 保存this引用
    
    // 从服务器获取文章详情
    wx.request({
      url: config.apiBaseUrl + '/posts/' + postId,
      success: function(res) {
        if (res.statusCode === 200) {
          // 处理分类名称
          let categoryName = '未分类';
          if (res.data.categories && res.data.categories.length > 0) {
            // 从缓存中获取分类名称
            const categories = cache.get('categories');
            if (categories) {
              const category = categories.find(cat => cat.id == res.data.categories[0]);
              if (category) {
                categoryName = category.name;
              }
            }
          }
          
          // 处理日期格式，只保留年月日
          var processedPost = {
            id: res.data.id,
            title: res.data.title && typeof res.data.title === 'object' ? res.data.title.rendered : res.data.title,
            content: res.data.content && typeof res.data.content === 'object' ? res.data.content.rendered : res.data.content,
            category_name: categoryName,
            date: that.formatDate(res.data.date),
            view_count: res.data.view_count,
            comment_count: res.data.comment_count,
            thumbnail: res.data.thumbnail
          };
          
          // 确保content为字符串格式，解决rich-text组件nodes属性类型问题
          if (typeof processedPost.content !== 'string') {
            processedPost.content = String(processedPost.content || '');
          }
          
          // 处理内容中的代码标签
          processedPost.content = that.processCodeTags(processedPost.content);
          
          // 再次确保content为字符串格式
          if (typeof processedPost.content !== 'string') {
            processedPost.content = String(processedPost.content || '');
          }
          
          // 检查是否有代码块
          const hasCodeBlocks = processedPost.content.indexOf('<pre') !== -1;
          
          // 获取服务器缓存时长设置
          wx.request({
            url: config.apiBaseUrl + '/site-info',
            success: (siteRes) => {
              if (siteRes.statusCode === 200 && siteRes.data.cache_duration) {
                // 使用服务器设置的缓存时长（转换为毫秒）
                cache.set(`post_${postId}`, processedPost, siteRes.data.cache_duration * 1000);
              } else {
                // 使用默认缓存时长（2分钟）
                cache.set(`post_${postId}`, processedPost, 2 * 60 * 1000);
              }
            },
            fail: () => {
              // 获取失败时使用默认缓存时长
              cache.set(`post_${postId}`, processedPost, 2 * 60 * 1000);
            }
          });
          
          that.setData({
            post: processedPost,
            error: false,
            errorMsg: '',
            loading: false,
            hasCodeBlocks: hasCodeBlocks
          });
        } else {
          that.setData({ 
            loading: false,
            error: true,
            errorMsg: '获取文章失败，错误代码：' + res.statusCode
          });
        }
      },
      fail: function() {
        that.setData({ 
          loading: false,
          error: true,
          errorMsg: '网络连接失败，请检查网络设置后重试'
        });
      }
    });
  },

  // 获取评论
  getComments: function(postId) {
    const that = this;
    
    wx.request({
      url: config.apiBaseUrl + '/comments?post=' + postId,
      success: function(res) {
        if (res.statusCode === 200) {
          // 处理评论数据，添加楼层号
          const comments = res.data.map((comment, index) => {
            // 处理日期格式
            const date = that.formatDate(comment.date);
            
            // 确保content为字符串格式
            let content = comment.content && typeof comment.content === 'object' ? comment.content.rendered : comment.content;
            if (typeof content !== 'string') {
              content = String(content || '');
            }
            
            // 如果是子评论，直接返回
            if (comment.parent !== 0) {
              return {
                ...comment,
                content: content,
                date: date,
                floor: index + 1
              };
            }
            
            // 如果是根评论，处理子评论
            if (comment.children && comment.children.length > 0) {
              comment.children = comment.children.map((child, childIndex) => {
                // 确保子评论content为字符串格式
                let childContent = child.content && typeof child.content === 'object' ? child.content.rendered : child.content;
                if (typeof childContent !== 'string') {
                  childContent = String(childContent || '');
                }
                
                return {
                  ...child,
                  content: childContent,
                  date: that.formatDate(child.date),
                  floor: childIndex + 1
                };
              });
            }
            
            return {
              ...comment,
              content: content,
              date: date,
              floor: index + 1
            };
          });
          
          that.setData({
            comments: comments
          });
        }
      },
      fail: function() {
        // 获取评论失败，不显示错误，只显示无评论
        that.setData({
          comments: []
        });
      }
    });
  },

  // 构建评论树结构
  buildCommentTree: function(comments) {
    // 创建ID到评论的映射
    const commentMap = {};
    comments.forEach(comment => {
      commentMap[comment.id] = comment;
    });
    
    // 构建树结构
    const rootComments = [];
    comments.forEach(comment => {
      if (comment.parent === 0) {
        // 根评论
        comment.children = [];
        rootComments.push(comment);
      } else {
        // 子评论
        const parentComment = commentMap[comment.parent];
        if (parentComment) {
          if (!parentComment.children) {
            parentComment.children = [];
          }
          parentComment.children.push(comment);
        }
      }
    });
    
    return rootComments;
  },

  // 格式化日期
  formatDate: function(dateString) {
    if (!dateString) return '';
    
    // 解决iOS兼容性问题，将日期格式中的空格替换为T，或替换为斜杠格式
    let formattedDateString = dateString;
    if (typeof dateString === 'string' && dateString.includes(' ')) {
      // 检查是否是 yyyy-MM-dd HH:mm:ss 格式
      if (dateString.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
        // 替换为 yyyy/MM/dd HH:mm:ss 格式，iOS Safari可以正确解析
        formattedDateString = dateString.replace(/-/g, '/').replace(' ', 'T');
      }
    }
    
    const date = new Date(formattedDateString);
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      return dateString; // 如果无法解析，返回原始字符串
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  // 重新加载文章
  reloadPost: function() {
    const postId = this.data.post.id || wx.getCurrentPages()[0].options.id;
    if (postId) {
      this.getPostDetail(postId);
      this.getComments(postId);
    }
  },

  // 输入评论内容
  onCommentInput: function(e) {
    this.setData({
      commentContent: e.detail.value
    });
  },

  // 开始回复评论
  startReply: function(e) {
    const commentId = e.currentTarget.dataset.id;
    const commentAuthor = e.currentTarget.dataset.author;
    
    this.setData({
      replyToComment: commentId,
      commentContent: '回复 @' + commentAuthor + '：'
    });
  },

  // 取消回复
  cancelReply: function() {
    this.setData({
      replyToComment: null,
      commentContent: ''
    });
  },

  // 展开/折叠评论
  toggleComment: function(e) {
    const commentId = e.currentTarget.dataset.id;
    const expandedComments = this.data.expandedComments;
    
    // 切换展开状态
    expandedComments[commentId] = !expandedComments[commentId];
    
    this.setData({
      expandedComments: expandedComments
    });
  },

  // 检查是否可以提交评论
  canSubmitComment: function() {
    const currentTime = Date.now();
    const lastCommentTime = this.data.lastCommentTime;
    const interval = 5 * 60 * 1000; // 5分钟间隔
    
    return (currentTime - lastCommentTime) >= interval;
  },

  // 更新上次评论时间
  updateLastCommentTime: function() {
    const currentTime = Date.now();
    this.setData({
      lastCommentTime: currentTime
    });
    wx.setStorageSync('lastCommentTime', currentTime);
  },

  // 提交评论
  submitComment: function() {
    const that = this;
    const content = this.data.commentContent;
    const postId = this.data.post.id;
    const replyToComment = this.data.replyToComment;
    
    // 检查postId是否存在
    if (!postId) {
      wx.showToast({
        title: '文章ID不存在',
        icon: 'none'
      });
      return;
    }
    
    // 检查内容
    if (!content || content.trim() === '') {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      });
      return;
    }
    
    // 检查内容长度
    if (content.length > 500) {
      wx.showToast({
        title: '评论内容不能超过500字',
        icon: 'none'
      });
      return;
    }
    
    // 检查评论频率限制（10秒内不能重复评论）
    const now = Date.now();
    const lastCommentTime = this.data.lastCommentTime;
    if (now - lastCommentTime < 10000) {
      wx.showToast({
        title: '评论过于频繁，请稍后再试',
        icon: 'none'
      });
      return;
    }
    
    // 显示加载提示
    wx.showLoading({
      title: '提交中...'
    });
    
    // 获取用户昵称
    let authorName = '匿名用户';
    if (this.data.userInfo && this.data.userInfo.nickName) {
      authorName = this.data.userInfo.nickName;
    }
    
    // 准备评论数据
    const commentData = {
      post: parseInt(postId), // 确保postId是整数
      content: content.trim(), // 去除首尾空格
      author_name: authorName
      // 移除了author_email字段，因为它是可选的并且我们不使用它
    };
    
    // 如果是回复评论，添加父评论ID
    if (replyToComment) {
      commentData.parent = parseInt(replyToComment);
    }
    
    // 提交评论
    wx.request({
      url: config.apiBaseUrl + '/comments',
      method: 'POST',
      data: commentData,
      success: function(res) {
        if (res.statusCode === 201) {
          wx.showToast({
            title: '评论成功',
            icon: 'success'
          });
          
          // 更新上次评论时间
          that.setData({
            lastCommentTime: now
          });
          wx.setStorageSync('lastCommentTime', now);
          
          // 清空评论内容和回复状态
          that.setData({
            commentContent: '',
            replyToComment: null
          });
          
          // 重新加载评论
          that.getComments(postId);
        } else {
          // 更详细地显示错误信息
          let errorMsg = '评论失败';
          if (res.data) {
            if (res.data.message) {
              errorMsg = res.data.message;
            } else if (res.data.code) {
              errorMsg = '错误代码: ' + res.data.code;
            }
          }
          errorMsg += ' (状态码: ' + res.statusCode + ')';
          
          wx.showToast({
            title: errorMsg,
            icon: 'none',
            duration: 5000
          });
        }
      },
      fail: function(err) {
        console.error('Comment submission error:', err);
        wx.showToast({
            title: '网络错误: ' + err.errMsg,
            icon: 'none',
            duration: 3000
        });
      },
      complete: function() {
        // 确保总是隐藏加载提示
        wx.hideLoading();
      }
    });
  }
})