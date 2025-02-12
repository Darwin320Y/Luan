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

// 旅游攻略数据
const travelGuides = [
    {
        id: 1,
        title: "六安经典三日游(1)",
        budget: 900,
        days: 3,
        tags: ["文化之旅", "家庭游"],
        image: "images/guide1.jpg",
        content: "深度体验皖西文化，包含六万情霞、天堂寨、红色展馆等经典景点",
        rating: 4.8,
        type: ["luxury", "3days"]
    },
    {
        id: 2,
        title: "六安经典三日游(2)",
        budget: 650,
        days: 3,
        tags: ["自然风光", "自驾游"],
        image: "images/guide2.jpg",
        content: "尽情领略自然风光，包含万佛湖、天堂寨等经典景点",
        rating: 4.8,
        type: ["luxury", "3days"]
    },
    {
        id: 3,
        title: "六安经典三日游(3)",
        budget: 1200,
        days: 3,
        tags: ["豪华旅行", "极致体验"],
        image: "images/guide3.jpg",
        content: "各种5A景点畅玩，星级酒店和传统美食的体验",
        rating: 4.8,
        type: ["luxury", "3days"]
    },
    {
        id: 4,
        title: "周末经济游",
        budget: 300,
        days: 2,
        tags: ["经济实惠", "自然风光"],
        image: "images/guide4.jpg",
        content: "两天一夜玩转六安，适合学生党和预算有限的旅行者",
        rating: 4.5,
        type: ["budget", "weekend"]
    },
    {
        id: 5,
        title: "周末畅快游",
        budget: 800,
        days: 2,
        tags: ["文化之旅", "家庭游"],
        image: "images/guide5.jpg",
        content: "深度体验皖西文化，包含万佛湖、天堂寨等经典景点",
        rating: 4.8,
        type: ["luxury", "3days"]
    },
    {
        id: 6,
        title: "周末豪华游",
        budget: 800,
        days: 2,
        tags: ["文化之旅", "家庭游"],
        image: "images/guide6.jpg",
        content: "深度体验皖西文化，包含万佛湖、天堂寨等经典景点",
        rating: 4.8,
        type: ["luxury", "3days"]
    },
];

let currentPage = 1;
const itemsPerPage = 2;

// 当前选中的分类
let currentFilter = 'all';

// 分页功能
function updatePagination() {
    const filteredGuides = filterGuides();
    const totalPages = Math.ceil(filteredGuides.length / itemsPerPage);
    const pageNumbers = document.querySelector('.page-numbers');
    pageNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.toggle('active', i === currentPage);
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderBlogCards();
            updatePagination();
        });
        pageNumbers.appendChild(pageButton);
    }
}

// 根据当前选中的分类过滤攻略
function filterGuides() {
    if (currentFilter === 'all') {
        return travelGuides;
    }
    return travelGuides.filter(guide => guide.type.includes(currentFilter));
}

// 渲染博客卡片
function renderBlogCards() {
    const grid = document.querySelector('.blog-grid');
    grid.innerHTML = '';

    const filteredGuides = filterGuides();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentGuides = filteredGuides.slice(start, end);

    currentGuides.forEach(guide => {
        grid.appendChild(createBlogCard(guide));
    });
}

// 创建博客卡片
function createBlogCard(guide) {
    guide.likes = typeof guide.likes === 'number' ? guide.likes : 0;

    const card = document.createElement('article');
    card.className = 'blog-card';
    card.innerHTML = `
        <div class="card-badge">${guide.days}天${guide.days > 1 ? '夜' : ''}</div>
        <div class="card-image">
            <img src="${guide.image}" alt="${guide.title}">
        </div>
        <div class="card-content">
            <div class="card-meta">
                <span>预算：¥${guide.budget}</span>
                <div class="rating">${'★'.repeat(Math.floor(guide.rating))}</div>
            </div>
            <h3>${guide.title}</h3>
            <div class="card-tags">
                ${guide.tags.map(tag => `<span class="card-tag">#${tag}</span>`).join('')}
            </div>
            <p>${guide.content.substring(0, 100)}...</p>
            <div class="card-footer">
                <button class="like-btn">
                    ♥ <span class="like-count">${guide.likes}</span>
                </button>
                <button class="details-btn">查看详情</button>
            </div>
        </div>
    `;

    // 点赞功能
    const likeBtn = card.querySelector('.like-btn');
    const likeCount = card.querySelector('.like-count');
    likeBtn.addEventListener('click', () => {
        guide.likes++;
        likeCount.textContent = guide.likes;
        likeBtn.classList.add('liked');
    });

    // 详情跳转
    const detailsBtn = card.querySelector('.details-btn');
    detailsBtn.addEventListener('click', () => {
        window.location.href = `https://mbd.baidu.com/newspage/data/dtlandingsuper?nid=dt_5271025162209892879&sourceFrom=search_a?id=${guide.id}`;
    });

    return card;
}

// 初始化
function init() {
    renderBlogCards();
    updatePagination();

    // 上一页按钮
    document.querySelector('.page-prev').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderBlogCards();
            updatePagination();
        }
    });

    // 下一页按钮
    document.querySelector('.page-next').addEventListener('click', () => {
        const filteredGuides = filterGuides();
        if (currentPage < Math.ceil(filteredGuides.length / itemsPerPage)) {
            currentPage++;
            renderBlogCards();
            updatePagination();
        }
    });

    // 分类筛选按钮
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的 active 类
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            // 给当前点击的按钮添加 active 类
            button.classList.add('active');
            // 更新当前选中的分类
            currentFilter = button.dataset.filter;
            // 重置当前页码
            currentPage = 1;
            // 重新渲染卡片和分页
            renderBlogCards();
            updatePagination();
        });
    });
}

document.addEventListener('DOMContentLoaded', init);