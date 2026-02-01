// 主要的JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 点击菜单项后关闭移动端菜单
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // 添加平滑滚动到锚点链接
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
    
    // 添加悬停效果到卡片
    const cards = document.querySelectorAll('.article-card, .category-card, .value-card, .team-member');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 搜索功能
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    if (searchBox) {
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchInput = this.previousElementSibling;
            performSearch(searchInput.value);
        });
    }
    
    // 回到顶部按钮
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.id = 'backToTop';
    backToTop.style.display = 'none';
    backToTop.title = '回到顶部';
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
});

// 搜索功能
function performSearch(query) {
    if (query.trim() !== '') {
        alert(`搜索功能将在完整版本中实现。搜索词: ${query}`);
        // 这里可以添加实际的搜索逻辑
    }
}

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
    },
    
    // 获取URL参数
    getUrlParameter: function(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
    
    // 添加类名到元素
    addClass: function(element, className) {
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ' ' + className;
        }
    },
    
    // 移除元素类名
    removeClass: function(element, className) {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    },
    
    // 切换元素类名
    toggleClass: function(element, className) {
        if (element.classList) {
            element.classList.toggle(className);
        } else {
            const classes = element.className.split(' ');
            const existingIndex = classes.indexOf(className);
            
            if (existingIndex >= 0) {
                classes.splice(existingIndex, 1);
            } else {
                classes.push(className);
            }
            
            element.className = classes.join(' ');
        }
    }
};

// DOM操作工具
const dom = {
    // 选择单个元素
    get: function(selector) {
        return document.querySelector(selector);
    },
    
    // 选择多个元素
    getAll: function(selector) {
        return document.querySelectorAll(selector);
    },
    
    // 创建元素
    create: function(tag, attributes = {}) {
        const element = document.createElement(tag);
        
        for (const [key, value] of Object.entries(attributes)) {
            if (key === 'text') {
                element.textContent = value;
            } else if (key === 'html') {
                element.innerHTML = value;
            } else {
                element.setAttribute(key, value);
            }
        }
        
        return element;
    },
    
    // 添加元素到DOM
    append: function(parent, child) {
        parent.appendChild(child);
    },
    
    // 移除元素
    remove: function(element) {
        element.parentNode.removeChild(element);
    }
};