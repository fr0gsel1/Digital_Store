from aiogram import Bot, Dispatcher, F, types
from aiogram.types import WebAppInfo
from aiogram.filters import Command
import json

bot = Bot(token="7724093672:AAFnWkmxXRm6Thd0UalWtL-s9HIKW08X8Ho")
dp = Dispatcher()

# Загрузка товаров из JSON
def load_products():
    with open('products.json', 'r', encoding='utf-8') as f:
        return json.load(f)

# Кнопка для открытия магазина
@dp.message(Command("shop"))
async def cmd_shop(message: types.Message):
    await message.answer(
        "🛍️ Откройте интерактивный каталог:",
        reply_markup=types.InlineKeyboardMarkup(inline_keyboard=[[
            types.InlineKeyboardButton(
                text="Открыть магазин",
                web_app=WebAppInfo(url="https://digitalstore-roan.vercel.app/"))
        ]])
    )

# Обработка данных из Web App
@dp.message(F.web_app_data)
async def handle_web_app_data(message: types.Message):
    data = json.loads(message.web_app_data.data)
    
    if data['action'] == 'buy':
        product = next(p for p in load_products() if p['id'] == data['product_id'])
        await message.answer(
            f"✅ Товар \"{product['name']}\" за {product['price']} TON\n"
            f"Отправьте TON на адрес: <code>UQBbXCSq-bPbP75etjYp44wA5q8YqcYcbX_OaSTByU-jjs91</code>",
            parse_mode="HTML"
        )

if __name__ == "__main__":
    dp.run_polling(bot)