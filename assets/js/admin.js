// 管理后台JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 侧边栏导航激活状态
    const sidebarNavItems = document.querySelectorAll('.sidebar-nav .nav-item');
    sidebarNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有激活状态
            sidebarNavItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // 添加激活状态到当前项
            this.classList.add('active');
        });
    });
    
    // 统计卡片动画
    const statNumbers = document.querySelectorAll('.stat-info h3');
    statNumbers.forEach(stat => {
        animateCounter(stat);
    });
    
    // 文章操作按钮
    const editButtons = document.querySelectorAll('.post-actions .btn-outline');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postItem = this.closest('.post-item');
            const postTitle = postItem.querySelector('h4').textContent;
            alert(`编辑功能将在完整版本中实现。要编辑的文章: ${postTitle}`);
        });
    });
    
    // 删除文章按钮
    const deleteButtons = document.querySelectorAll('.post-actions .fa-trash');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postItem = this.closest('.post-item');
            const postTitle = postItem.querySelector('h4').textContent;
            
            if (confirm(`确定要删除文章 "${postTitle}" 吗？`)) {
                postItem.style.opacity = '0';
                setTimeout(() => {
                    postItem.remove();
                    updateStats();
                }, 300);
            }
        });
    });
    
    // 快速操作按钮
    const quickActionButtons = document.querySelectorAll('.action-btn');
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            alert(`${action} 功能将在完整版本中实现`);
        });
    });
    
    // 表单提交处理
    const editorForm = document.querySelector('.editor-form');
    if (editorForm) {
        editorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = this.querySelector('.form-input').value;
            const content = this.querySelector('.form-textarea').value;
            
            if (!title || !content) {
                alert('请填写标题和内容');
                return;
            }
            
            // 显示加载状态
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> 发布中...';
            submitBtn.disabled = true;
            
            // 模拟发布过程
            setTimeout(() => {
                alert(`文章 "${title}" 已成功发布！`);
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // 重置表单
                this.reset();
                
                // 更新统计
                updateStats();
            }, 1500);
        });
    }
    
    // 实时字数统计
    const contentTextarea = document.querySelector('.form-textarea');
    if (contentTextarea) {
        const counter = document.createElement('div');
        counter.className = 'word-count';
        counter.textContent = `字数: ${contentTextarea.value.length}`;
        contentTextarea.parentNode.insertBefore(counter, contentTextarea.nextSibling);
        
        contentTextarea.addEventListener('input', function() {
            counter.textContent = `字数: ${this.value.length}`;
        });
    }
    
    // 文章状态切换
    const statusElements = document.querySelectorAll('.post-status');
    statusElements.forEach(status => {
        status.addEventListener('click', function() {
            // 循环切换状态
            if (this.classList.contains('status-published')) {
                this.classList.remove('status-published');
                this.classList.add('status-draft');
                this.textContent = '草稿';
            } else if (this.classList.contains('status-draft')) {
                this.classList.remove('status-draft');
                this.classList.add('status-pending');
                this.textContent = '待审核';
            } else if (this.classList.contains('status-pending')) {
                this.classList.remove('status-pending');
                this.classList.add('status-published');
                this.textContent = '已发布';
            }
        });
    });
});

// 动画计数器函数
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000; // 动画持续时间
    const increment = target / (duration / 16); // 每帧递增
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            element.textContent = target;
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 16);
}

// 更新统计数据
function updateStats() {
    // 这里可以更新统计信息
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const statNumber = card.querySelector('h3');
        animateCounter(statNumber);
    });
}

// 管理后台工具函数
const adminUtils = {
    // 显示通知
    showNotification: function(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // 添加样式
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '4px',
            color: 'white',
            zIndex: '10000',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            backgroundColor: type === 'success' ? '#2ecc71' : 
                           type === 'error' ? '#e74c3c' : 
                           type === 'warning' ? '#f39c12' : '#3498db'
        });
        
        document.body.appendChild(notification);
        
        // 添加关闭事件
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // 3秒后自动移除
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    },
    
    // 验证表单
    validateForm: function(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e74c3c';
                
                // 添加错误提示
                let errorEl = input.parentNode.querySelector('.error-message');
                if (!errorEl) {
                    errorEl = document.createElement('div');
                    errorEl.className = 'error-message';
                    errorEl.style.color = '#e74c3c';
                    errorEl.style.fontSize = '0.8rem';
                    errorEl.style.marginTop = '0.25rem';
                    errorEl.textContent = '此字段为必填项';
                    input.parentNode.appendChild(errorEl);
                }
            } else {
                input.style.borderColor = '#ddd';
                const errorEl = input.parentNode.querySelector('.error-message');
                if (errorEl) errorEl.remove();
            }
        });
        
        return isValid;
    },
    
    // 格式化文件大小
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    // 生成随机ID
    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    }
};

// API模拟函数（用于演示目的）
const api = {
    // 获取文章列表
    getPosts: function(page = 1, limit = 10) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: [
                        { id: 1, title: 'GitHub协作开发完全指南', status: 'published', date: '2026-02-01', author: 'admin' },
                        { id: 2, title: '提升工作效率的10个实用技巧', status: 'draft', date: '2026-01-30', author: 'admin' },
                        { id: 3, title: '人工智能对未来生活的影响', status: 'published', date: '2026-01-28', author: 'admin' }
                    ],
                    total: 24,
                    page: page,
                    totalPages: Math.ceil(24 / limit)
                });
            }, 500);
        });
    },
    
    // 创建新文章
    createPost: function(postData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: {
                        id: Date.now(),
                        ...postData,
                        date: new Date().toISOString().split('T')[0],
                        author: 'admin'
                    }
                });
            }, 1000);
        });
    },
    
    // 更新文章
    updatePost: function(id, postData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: {
                        id: id,
                        ...postData
                    }
                });
            }, 800);
        });
    },
    
    // 删除文章
    deletePost: function(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 500);
        });
    }
};