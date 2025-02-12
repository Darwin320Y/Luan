// feature.js

// 轮播图功能
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

// 显示指定索引的幻灯片
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = 'none'; // 隐藏所有幻灯片
        if (i === index) {
            slide.style.display = 'block'; // 显示当前幻灯片
        }
    });
}

// 切换到下一张幻灯片
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// 切换到上一张幻灯片
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// 自动轮播
let autoSlideInterval = setInterval(nextSlide, 5000);

// 绑定左右箭头按钮事件
document.querySelector('.carousel-control.prev').addEventListener('click', prevSlide);
document.querySelector('.carousel-control.next').addEventListener('click', nextSlide);

// 初始化显示第一张幻灯片
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
});

// 博客分页功能
const blogPosts = document.querySelectorAll('.blog-post');
const postsPerPage = 5;
let currentPage = 1;

function showPage(page) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    blogPosts.forEach((post, index) => {
        if (index >= startIndex && index < endIndex) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });

    // 更新分页按钮状态
    updatePaginationButtons(page);
}

function updatePaginationButtons(page) {
    const paginationButtons = document.querySelectorAll('.pagination button');
    paginationButtons.forEach((button, index) => {
        if (index + 1 === page) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function changePage(page) {
    currentPage = page;
    showPage(currentPage);
}

// 初始化页面显示
document.addEventListener('DOMContentLoaded', () => {
    showPage(currentPage);
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