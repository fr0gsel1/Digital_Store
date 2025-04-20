// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();

// Подключение TonConnect
const connector = new TonConnect.TonConnect({
    manifestUrl: 'https://your-site.com/tonconnect-manifest.json'
});

// Получение курса
async function getRate() {
    const response = await fetch('https://your-api.com/rate');
    return await response.json();
}

// Конвертация
document.getElementById('convert-btn').addEventListener('click', async () => {
    const amount = document.getElementById('ton-amount').value;
    const rate = await getRate();
    document.getElementById('result').innerHTML = `
        <p>${amount} TON = ${(amount * rate).toFixed(2)} USDT</p>
    `;
});

// Подключение кошелька
document.getElementById('connect-wallet').addEventListener('click', () => {
    connector.connect().then(wallet => {
        tg.showAlert(`Кошелёк подключен: ${wallet.account.address}`);
    });
});