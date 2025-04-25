// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();

// Загрузка товаров
async function loadProducts() {
    const response = await fetch('https://your-api.com/products');
    const products = await response.json();
    
    const catalog = document.querySelector('.catalog');
    catalog.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">${product.price} TON <span>≈ $${(product.price * 3.5).toFixed(2)}</span></div>
            <button class="buy-btn" onclick="handleBuy('${product.id}')">Купить через TON</button>
        </div>
    `).join('');
}

// Обработка покупки
function handleBuy(productId) {
    tg.sendData(JSON.stringify({
        action: 'buy',
        product_id: productId
    }));
}

// Поиск товаров
document.querySelector('.search-btn').addEventListener('click', () => {
    const query = document.querySelector('.search-bar input').value;
    tg.showAlert(`Поиск: ${query}`);
});

// Загружаем товары при старте
loadProducts();
