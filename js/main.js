// 主要的JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileToggle = document.createElement('button');
    mobileToggle.classList.add('mobile-toggle');
    mobileToggle.innerHTML = '☰';
    mobileToggle.setAttribute('aria-label', '切换菜单');
    
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        // 为移动端添加菜单切换按钮
        const navContainer = document.querySelector('.nav-container');
        if (window.innerWidth <= 768) {
            navContainer.appendChild(mobileToggle);
            
            mobileToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
            });
        }
        
        // 平滑滚动到锚点
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // 添加悬停效果到卡片
    const cards = document.querySelectorAll('.post-card, .category-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 搜索功能
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value;
            alert(`搜索功能将在完整版本中实现。搜索词: ${searchTerm}`);
        });
    }
    
    // 页脚年份自动更新
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `&copy; ${currentYear} 自由迪迪. 保留所有权利.`;
    }
});

// 工具函数
const utils = {
    // 格式化日期
    formatDate: function(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('zh-CN', options);
    },
    
    // 验证邮箱
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};