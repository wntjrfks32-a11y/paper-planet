
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StickerShop.css";

const categories = ["전체", "동물", "음식", "하트", "꽃"];

const stickers = [
  { id: 1, name: "핑크 토끼", emoji: "🐰", category: "동물", price: 500 },
  { id: 2, name: "귀여운 곰", emoji: "🐻", category: "동물", price: 500 },
  { id: 3, name: "딸기 케이크", emoji: "🍰", category: "음식", price: 700 },
  { id: 4, name: "달콤한 딸기", emoji: "🍓", category: "음식", price: 500 },
  { id: 5, name: "핑크 하트", emoji: "💗", category: "하트", price: 300 },
  { id: 6, name: "반짝 하트", emoji: "💕", category: "하트", price: 300 },
  { id: 7, name: "작은 꽃", emoji: "🌼", category: "꽃", price: 400 },
  { id: 8, name: "분홍 튤립", emoji: "🌷", category: "꽃", price: 500 },
];

function StickerShop() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [cart, setCart] = useState([]);

  const filteredStickers =
    selectedCategory === "전체"
      ? stickers
      : stickers.filter(
          (sticker) => sticker.category === selectedCategory
        );

  const addSticker = (sticker) => {
    setCart((currentCart) => [...currentCart, sticker]);
  };

  const goToDecorate = () => {
    if (cart.length === 0) return;

    navigate("/decorate", {
      state: { cart },
    });
  };

  return (
    <main className="shop-page">
      <section className="shop-heading">
        <p className="shop-label">PAPER PLANET STICKER SHOP</p>
        <h1>마음에 드는 스티커를 골라봐!</h1>
        <p>나만의 작은 종이 세상을 꾸며 줄 친구들을 만나보세요.</p>
      </section>

      <section className="shop-content">
        <div className="shop-top">
          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="cart-count">
            담은 스티커 <strong>{cart.length}</strong>개
          </p>
        </div>

        <div className="sticker-grid">
          {filteredStickers.map((sticker) => (
            <article className="sticker-card" key={sticker.id}>
              <div className="sticker-image">
                <span>{sticker.emoji}</span>
              </div>

              <h3>{sticker.name}</h3>
              <p>{sticker.price.toLocaleString()}원</p>

              <button
                className="add-sticker-button"
                onClick={() => addSticker(sticker)}
              >
                + 스티커 담기
              </button>
            </article>
          ))}
        </div>

        <div className="shop-bottom">
          <p>마음에 드는 스티커를 골랐다면?</p>

          <button
            className="decorate-button"
            disabled={cart.length === 0}
            onClick={goToDecorate}
          >
            꾸미기 시작하기 →
          </button>
        </div>
      </section>
    </main>
  );
}

export default StickerShop;
