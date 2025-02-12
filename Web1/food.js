// food.js

// 喜欢按钮点击事件
function handleLikeButtonClick() {
    const foodCard = this.closest('.food-card');
    const likeCountElement = foodCard.querySelector('.like-count');
    let likeCount = parseInt(likeCountElement.textContent.split(' ')[1]) || 0;
    likeCount++;
    likeCountElement.textContent = `♥ ${likeCount}`;
    sortFoodCards();
}

// 提交评论功能
document.getElementById('submit-comment').addEventListener('click', function() {
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();

    if (commentText) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.textContent = commentText;
        document.querySelector('.comments-list').appendChild(commentElement);
        commentInput.value = ''; // 清空输入框
    } else {
        alert('请输入评论内容！');
    }
});

// 分类筛选功能
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        document.querySelectorAll('.food-card').forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            card.style.display = (category === 'all' || cardCategory === category) ? 'block' : 'none';
        });
        sortFoodCards();
    });
});

// 加载更多功能
let currentIndex = 0;
const newCards = [
    { name: "野生葛粉糕", category: "snack", image: "images/food4.jpg", description: "野生葛粉糕，采深山野葛精粹，凝就如玉糕体，口感清甜软糯，恰似山林间逸出的自然诗韵。 " },
    { name: "六安瓜片炒虾仁", category: "meat", image: "images/food5.jpg", description: "六安瓜片邂逅鲜嫩虾仁，茶香萦绕舌尖，虾滑触动味蕾，于唇齿间演绎一场山野与河鲜的绮梦。 " },
    { name: "六安米糊仙草糕", category: "snack", image: "images/food6.jpg", description: "六安米糊邂逅仙草，相融成糕。米糊醇厚，仙草清凉，入口似揽六安山水的温柔惬意。 " },
    { name: "毛坦厂蒿子粑粑", category: "snack", image: "images/food7.jpg", description: "毛坦厂蒿子粑粑，揉蒿之清新、米之软糯，裹藏山野风味，恰似田园诗篇在舌尖轻吟。 " },
    { name: "叶集风干羊肉", category: "meat", image: "images/food8.jpg", description: "叶集风干羊肉，经时光风干，肉质紧实，鲜香醇厚，恰似皖西大地寄来的风味情笺。 " },
    { name: "金寨观音豆腐", category: "snack", image: "images/food9.jpg", description: "金寨观音豆腐，取山野草木精魂，凝作碧玉般模样，口感爽滑，一缕清新漫上舌尖心间。 " },
    { name: "臭鳜鱼", category: "meat", image: "images/food10.jpg", description: "臭鳜鱼，嗅之奇臭，食之至鲜。蒜瓣肉质嫩弹，醇厚入味，恰似江上渔家藏着的至味秘笺。 " },
    { name: "六安瓜片", category: "tea", image: "images/food11.jpg", description: "六安瓜片，采深山灵韵，制就翠叶飘香。汤色清绿，滋味醇厚，宛如皖西山水的动人诗行。 " },
    { name: "六安毛尖", category: "tea", image: "images/food12.jpg", description: "六安毛尖，沐皖西朝露，叶细如针。汤色嫩绿明亮，茶香清幽，恰似山林间飘来的淡雅诗章。  " },
    { name: "霍山黄芽", category: "tea", image: "images/food13.jpg", description: "霍山黄芽，孕霍山灵秀，芽叶嫩黄披毫。汤黄明亮，滋味鲜醇，宛如仙山逸出的一抹灵韵。  " },
    { name: "舒城兰花", category: "tea", image: "images/food14.jpg", description: "舒城兰花，集山川秀气，叶似兰草舒张。汤清味醇，兰香幽逸，宛如皖地画卷里的一缕茶香诗韵。 " },
    { name: "金寨红茶", category: "tea", image: "images/food15.jpg", description: "金寨红茶，撷山川灵秀，凝岁月芬芳。汤红似琥珀，香高味醇，宛如金寨绮梦晕染唇舌。 " },
    { name: "黄山毛峰", category: "tea", image: "images/food16.jpg", description: "黄山毛峰，揽黄山云雾之灵，芽尖锋芒隐翠。汤色清碧微黄，茶香如缕，宛如峰间缥缈的诗魂。  " }
];

document.getElementById('load-more').addEventListener('click', function() {
    const foodGrid = document.querySelector('.food-grid');
    const cardsToAdd = Math.min(3, newCards.length - currentIndex); // 每次最多加载3个卡片

    for (let i = 0; i < cardsToAdd; i++) {
        const newCardData = newCards[currentIndex];
        const newCard = createFoodCard(newCardData);
        foodGrid.appendChild(newCard);
        currentIndex++;
    }

    if (currentIndex >= newCards.length) {
        this.disabled = true; // 如果没有更多卡片可加载，禁用按钮
    }
});

// 创建美食卡片
function createFoodCard(cardData) {
    const newCard = document.createElement('div');
    newCard.classList.add('food-card');
    newCard.setAttribute('data-name', cardData.name);
    newCard.setAttribute('data-category', cardData.category);

    const img = document.createElement('img');
    img.src = cardData.image;
    img.alt = cardData.name;

    const h3 = document.createElement('h3');
    h3.textContent = cardData.name;

    const p = document.createElement('p');
    p.textContent = cardData.description;

    const likeBtn = document.createElement('button');
    likeBtn.classList.add('like-btn');
    likeBtn.textContent = '喜欢';
    likeBtn.addEventListener('click', handleLikeButtonClick);

    const likeCount = document.createElement('div');
    likeCount.classList.add('like-count');
    likeCount.textContent = '♥ 0';

    newCard.appendChild(img);
    newCard.appendChild(h3);
    newCard.appendChild(p);
    newCard.appendChild(likeBtn);
    newCard.appendChild(likeCount);

    return newCard;
}

// 排序美食卡片
function sortFoodCards() {
    const foodGrid = document.querySelector('.food-grid');
    const foodCards = Array.from(foodGrid.querySelectorAll('.food-card'));

    foodCards.sort((a, b) => {
        const likeCountA = parseInt(a.querySelector('.like-count').textContent.split(' ')[1]) || 0;
        const likeCountB = parseInt(b.querySelector('.like-count').textContent.split(' ')[1]) || 0;
        return likeCountB - likeCountA;
    });

    foodGrid.innerHTML = '';
    foodCards.forEach(card => foodGrid.appendChild(card));
}

// 初始化喜欢按钮事件
document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', handleLikeButtonClick);
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
        ...document.querySelectorAll('.food-card h3, .food-card p')
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
                <div class="title">${element.closest('.food-card').querySelector('h3').textContent}</div>
                <div class="content">${element.textContent.substring(0, 100)}...</div>
            `;
            resultItem.onclick = () => {
                element.closest('.food-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
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