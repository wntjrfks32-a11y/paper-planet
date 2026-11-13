
import { Routes, Route, Link } from "react-router-dom";
import StickerShop from "./pages/StickerShop";
import Decorate from "./pages/Decorate";
import Gallery from "./pages/Gallery";
import "./App.css";

function Home() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">
          PAPER PLANET.
        </Link>

        <nav className="nav">
          <Link to="/">HOME</Link>
          <Link to="/stickers">STICKER SHOP</Link>
          <Link to="/gallery">MY COLLECTION</Link>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              YOUR LITTLE CREATIVE SPACE
            </span>

            <h1>
              Make your own
              <br />
              <span>paper world.</span>
            </h1>

            <p>
              귀여운 스티커와 함께 나만의 작은 종이 세상을 만들어 보세요.
            </p>

            <Link to="/stickers" className="start-button">
              스티커 구경하기 <span>→</span>
            </Link>

            <div className="hero-note">
              Make something lovely today ♡
            </div>
          </div>

          <div className="hero-art">
            <div className="paper-card">
              <div className="tape"></div>
              <div className="sticker star">✦</div>
              <div className="sticker heart">♥</div>
              <div className="sticker flower">✿</div>

              <div className="paper-title">
                My Little
                <br />
                Paper World
              </div>

              <div className="paper-subtitle">
                a lovely creative day
              </div>

              <div className="paper-decoration">
                ♡ ✿ ♡
              </div>

              <div className="paper-message">
                made with love
              </div>
            </div>

            <div className="floating-note note-one">
              Be Creative! ✨
            </div>

            <div className="floating-note note-two">
              Little Things ♡
            </div>
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span>EXPLORE THE WORLD</span>
            <h2>무엇으로 꾸며볼까요?</h2>
            <p>마음에 드는 아이템을 골라 나만의 작품을 만들어 보세요.</p>
          </div>

          <div className="category-list">
            <Link to="/stickers" className="category-card pink">
              <div className="category-icon">🐰</div>
              <h3>Sticker</h3>
              <p>귀여운 캐릭터와 다양한 스티커</p>
              <span>EXPLORE →</span>
            </Link>

            <Link to="/stickers" className="category-card yellow">
              <div className="category-icon">💌</div>
              <h3>Memo Paper</h3>
              <p>마음을 기록하는 아기자기한 메모지</p>
              <span>EXPLORE →</span>
            </Link>

            <Link to="/stickers" className="category-card purple">
              <div className="category-icon">🎀</div>
              <h3>Washi Tape</h3>
              <p>종이 세상을 꾸며 줄 귀여운 테이프</p>
              <span>EXPLORE →</span>
            </Link>
          </div>
        </section>

        <section className="collection-section" id="collection">
          <div>
            <span>MAKE IT YOURS</span>
            <h2>나만의 작품을 만들어 보세요.</h2>
            <p>원하는 스티커를 골라 자유롭게 꾸며보세요.</p>
          </div>

          <Link to="/stickers" className="collection-button">
            시작하기 →
          </Link>
        </section>
      </main>

      <footer className="footer">
        PAPER PLANET.
        <span> Made for your little imagination ♡</span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stickers" element={<StickerShop />} />
      <Route path="/decorate" element={<Decorate />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}

export default App;
