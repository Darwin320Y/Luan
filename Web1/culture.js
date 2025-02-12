// 获取所有分类按钮
const categoryButtons = document.querySelectorAll('.category-list button');

// 获取所有景区元素
const attractions = document.querySelectorAll('.attraction-list .attraction');

// 为每个分类按钮添加点击事件监听器
categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        // 获取当前点击按钮的 data-category 属性值
        const category = this.getAttribute('data-category');

        // 遍历所有景区元素
        attractions.forEach(attraction => {
            // 获取当前景区元素的 data-category 属性值
            const attractionCategory = attraction.getAttribute('data-category');

            if (category === 'all') {
                // 如果点击的是“全部”按钮，显示所有景区
                attraction.classList.remove('hidden');
            } else {
                // 否则，根据点击的按钮筛选景区
                if (attractionCategory === category) {
                    // 如果景区的类别与点击的按钮类别相同，显示该景区
                    attraction.classList.remove('hidden');
                } else {
                    // 否则，隐藏该景区
                    attraction.classList.add('hidden');
                }
            }
        });
    });
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