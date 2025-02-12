// scripts.js
let currentSlide = 0;
const slides = document.querySelectorAll('.hero .slides img');
const totalSlides = slides.length;
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const sideNav = document.querySelector('.side-nav');
const heroSection = document.querySelector('.hero');
const heroHeight = heroSection.offsetHeight;

function showSlide(index) {
    // 隐藏所有图片
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });

    // 显示当前图片
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// 初始化：显示第一张图片
showSlide(currentSlide);

// 自动轮播
let autoSlideInterval = setInterval(nextSlide, 5000);

// 为左右箭头按钮添加点击事件
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// 监听页面滚动事件
window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const newTop = Math.max(scrollTop + 20, heroHeight + 20); // 不超过轮播图范围
    sideNav.style.top = newTop + 'px';
});

// 为特色板块的卡片添加点击跳转功能
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
        const link = card.querySelector('a').href;
        window.location.href = link;
    });
});

// 获取所有分类按钮
const categoryButtons = document.querySelectorAll('.category-list button');
// 获取所有景区元素
const attractions = document.querySelectorAll('.attraction');

// 鼠标悬停在轮播图按钮上时停止自动轮播
prevBtn.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

nextBtn.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

// 鼠标离开轮播图按钮时恢复自动轮播
prevBtn.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
});

nextBtn.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
});

// 改进的搜索功能
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    if (!searchTerm) {
        searchResults.style.display = 'none';
        return;
    }

    // 定义搜索范围
    const searchAreas = [
        ...document.querySelectorAll('.description, .feature-card p, .feature-card h2, .guide-content p, .comments p')
    ];

    // 移除之前的高亮
    document.querySelectorAll('.highlight').forEach(el => {
        el.outerHTML = el.innerHTML;
    });

    let hasResults = false;
    searchAreas.forEach(element => {
        const content = element.textContent.toLowerCase();
        if (content.includes(searchTerm)) {
            hasResults = true;
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            element.innerHTML = element.innerHTML.replace(regex, '<span class="highlight">$1</span>');

            // 创建结果条目
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <div class="title">${element.parentElement.querySelector('h1, h2, h3')?.textContent || '相关结果'}</div>
                <div class="content">${element.textContent.substring(0, 100)}...</div>
            `;
            resultItem.onclick = () => {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                searchResults.style.display = 'none';
            };
            searchResults.appendChild(resultItem);
        }
    });

    if (hasResults) {
        searchResults.style.display = 'block';
    } else {
        searchResults.innerHTML = '<div class="no-results">未找到相关结果</div>';
        searchResults.style.display = 'block';
    }
}

// 实时搜索
document.getElementById('searchInput').addEventListener('input', () => {
    performSearch();
    if (document.getElementById('searchInput').value.trim()) {
        document.getElementById('searchResults').style.display = 'block';
    }
});

// 点击页面其他区域关闭搜索结果
document.addEventListener('click', (e) => {
    const searchBox = document.querySelector('.search-box');
    if (!searchBox.contains(e.target)) {
        document.getElementById('searchResults').style.display = 'none';
    }
});

// 回车键搜索
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});