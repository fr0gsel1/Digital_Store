// Отправка данных о покупке
const handleBuy = (productId) => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify({
        action: 'buy',
        product_id: productId
      }));
      window.Telegram.WebApp.close();
    } else {
      alert('Оплата через TON (тестовый режим)');
    }
  };
  
  // В кнопке "Купить":
  <button onClick={() => handleBuy(product.id)} className="buy-btn">
    Купить за {product.price} TON
  </button>
