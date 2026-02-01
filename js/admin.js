// 管理后台JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 表单提交处理
    const postForm = document.getElementById('newPostForm');
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const title = document.getElementById('postTitle').value;
            const category = document.getElementById('postCategory').value;
            const content = document.getElementById('postContent').value;
            
            // 简单验证
            if (!title || !category || !content) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 在实际应用中，这里会发送数据到服务器
            alert('文章将在完整版本中保存到数据库');
            console.log({
                title: title,
                category: category,
                content: content.substring(0, 100) + '...'
            });
            
            // 重置表单
            postForm.reset();
        });
    }
    
    // 编辑按钮事件
    const editButtons = document.querySelectorAll('.btn-secondary');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const title = row.cells[0].textContent;
            alert(`编辑功能将在完整版本中实现。要编辑的文章: ${title}`);
        });
    });
    
    // 删除按钮事件
    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const title = row.cells[0].textContent;
            
            if (confirm(`确定要删除文章 "${title}" 吗？`)) {
                row.remove();
                alert('文章将在完整版本中从数据库删除');
            }
        });
    });
    
    // 添加实时字符计数器到内容区域
    const contentArea = document.getElementById('postContent');
    if (contentArea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = `字符数: ${contentArea.value.length}`;
        contentArea.parentNode.insertBefore(counter, contentArea.nextSibling);
        
        contentArea.addEventListener('input', function() {
            counter.textContent = `字符数: ${this.value.length}`;
        });
    }
    
    // 为表格行添加点击选择效果
    const tableRows = document.querySelectorAll('.admin-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // 如果点击的是按钮，不触发行选择
            if (e.target.tagName === 'BUTTON') return;
            
            this.classList.toggle('selected');
        });
    });
});

// 管理后台专用工具函数
const adminUtils = {
    // 显示通知
    showNotification: function(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 添加样式
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '4px',
            color: 'white',
            zIndex: '10000',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        });
        
        // 根据类型设置颜色
        switch(type) {
            case 'success':
                notification.style.backgroundColor = '#2ecc71';
                break;
            case 'error':
                notification.style.backgroundColor = '#e74c3c';
                break;
            case 'warning':
                notification.style.backgroundColor = '#f39c12';
                break;
            default:
                notification.style.backgroundColor = '#3498db';
        }
        
        document.body.appendChild(notification);
        
        // 3秒后自动移除
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },
    
    // 格式化文件大小
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
};