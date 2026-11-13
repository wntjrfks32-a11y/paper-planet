
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import "./Decorate.css";

const stickerOptions = [
  "🐰", "🐻", "🍓", "🍰", "💗",
  "💕", "🌼", "🌷", "🎀", "⭐",
];

function Decorate() {
  const location = useLocation();
  const canvasRef = useRef(null);

  const selectedStickers = location.state?.cart || [];
  const savedArtwork = location.state?.savedArtwork;

  const [placedStickers, setPlacedStickers] = useState(() => {
    if (savedArtwork?.stickers) {
      return savedArtwork.stickers;
    }

    return selectedStickers.map((sticker, index) => ({
      id: `${sticker.id}-${index}-${Date.now()}`,
      emoji: sticker.emoji,
      x: 50 + (index % 4) * 75,
      y: 50 + Math.floor(index / 4) * 75,
    }));
  });

  const [draggingId, setDraggingId] = useState(null);
  const [message, setMessage] = useState("");

  const addSticker = (emoji) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newSticker = {
      id: Date.now() + Math.random(),
      emoji,
      x: Math.max(0, canvas.clientWidth / 2 - 25),
      y: Math.max(0, canvas.clientHeight / 2 - 25),
    };

    setPlacedStickers((current) => [...current, newSticker]);
    setMessage("");
  };

  const moveSticker = (event, sticker) => {
    if (draggingId !== sticker.id) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const x = Math.max(
      0,
      Math.min(event.clientX - rect.left - 25, rect.width - 50)
    );

    const y = Math.max(
      0,
      Math.min(event.clientY - rect.top - 25, rect.height - 50)
    );

    setPlacedStickers((current) =>
      current.map((item) =>
        item.id === sticker.id ? { ...item, x, y } : item
      )
    );
  };

  const deleteSticker = (id) => {
    setPlacedStickers((current) =>
      current.filter((sticker) => sticker.id !== id)
    );
    setMessage("");
  };

  const clearCanvas = () => {
    setPlacedStickers([]);
    setMessage("캔버스를 비웠어요.");
  };

  const saveDesign = () => {
    try {
      const newArtwork = {
        id: Date.now(),
        name: `나의 작품 ${new Date().toLocaleDateString("ko-KR")}`,
        date: new Date().toLocaleString("ko-KR"),
        stickers: placedStickers,
      };

      const existingArtworks = JSON.parse(
        localStorage.getItem("paperPlanetGallery") || "[]"
      );

      const updatedArtworks = [
        newArtwork,
        ...existingArtworks,
      ];

      localStorage.setItem(
        "paperPlanetGallery",
        JSON.stringify(updatedArtworks)
      );

      localStorage.setItem(
        "paperPlanetDesign",
        JSON.stringify(placedStickers)
      );

      setMessage("작품 보관함에 저장했어요! 💗");
    } catch (error) {
      setMessage("작품 저장에 실패했어요.");
    }
  };

  const loadDesign = () => {
    try {
      const savedDesign = localStorage.getItem("paperPlanetDesign");

      if (!savedDesign) {
        setMessage("저장된 작품이 아직 없어요.");
        return;
      }

      const parsedDesign = JSON.parse(savedDesign);

      if (!Array.isArray(parsedDesign)) {
        setMessage("저장된 작품을 불러오지 못했어요.");
        return;
      }

      setPlacedStickers(parsedDesign);
      setMessage("저장한 작품을 불러왔어요! 🎀");
    } catch (error) {
      setMessage("작품을 불러오지 못했어요.");
    }
  };

  const downloadImage = async () => {
    if (!canvasRef.current) return;

    try {
      setMessage("이미지를 만들고 있어요...");

      const canvasImage = await html2canvas(canvasRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const imageUrl = canvasImage.toDataURL("image/png");
      const downloadLink = document.createElement("a");

      downloadLink.href = imageUrl;
      downloadLink.download = "paper-planet-design.png";
      downloadLink.click();

      setMessage("나만의 작품을 이미지로 저장했어요! 💗");
    } catch (error) {
      console.error("이미지 다운로드 오류:", error);
      setMessage("이미지 저장에 실패했어요. 다시 시도해 주세요.");
    }
  };

  return (
    <main className="decorate-page">
      <header className="decorate-header">
        <Link to="/" className="decorate-logo">
          PAPER PLANET.
        </Link>

        <div className="decorate-header-links">
          <Link to="/gallery">MY COLLECTION</Link>
          <span>MY LITTLE DESIGN STUDIO</span>
        </div>
      </header>

      <section className="decorate-heading">
        <p>CREATE YOUR OWN WORLD</p>
        <h1>나만의 종이 세상을 꾸며봐!</h1>
        <span>
          스티커를 골라 캔버스 위에 자유롭게 배치해 보세요.
        </span>
      </section>

      <section className="editor-layout">
        <aside className="sticker-palette">
          <h2>Sticker Box</h2>
          <p>원하는 스티커를 눌러 추가해 봐!</p>

          <div className="palette-grid">
            {stickerOptions.map((emoji, index) => (
              <button
                key={`${emoji}-${index}`}
                className="palette-item"
                onClick={() => addSticker(emoji)}
                aria-label={`${emoji} 스티커 추가`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </aside>

        <div className="canvas-area">
          <div className="canvas-top">
            <span>MY PAPER</span>

            <div className="canvas-actions">
              <button onClick={loadDesign}>불러오기</button>
              <button onClick={saveDesign}>저장하기 ♡</button>
              <button onClick={downloadImage}>
                이미지 다운로드 ↓
              </button>
              <button onClick={clearCanvas}>
                모두 지우기 ↺
              </button>
            </div>
          </div>

          <div className="paper-canvas" ref={canvasRef}>
            {placedStickers.length === 0 && (
              <div className="canvas-empty">
                <span>🎀</span>
                <p>이곳에 나만의 작품을 만들어 봐!</p>
                <small>
                  왼쪽 스티커를 눌러 추가해 보세요.
                </small>
              </div>
            )}

            {placedStickers.map((sticker) => (
              <div
                key={sticker.id}
                className={
                  draggingId === sticker.id
                    ? "placed-sticker dragging"
                    : "placed-sticker"
                }
                style={{
                  left: sticker.x,
                  top: sticker.y,
                }}
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(
                    event.pointerId
                  );
                  setDraggingId(sticker.id);
                }}
                onPointerMove={(event) =>
                  moveSticker(event, sticker)
                }
                onPointerUp={() => setDraggingId(null)}
                onPointerCancel={() => setDraggingId(null)}
              >
                <span>{sticker.emoji}</span>

                <button
                  className="remove-sticker"
                  data-html2canvas-ignore="true"
                  onPointerDown={(event) =>
                    event.stopPropagation()
                  }
                  onClick={() => deleteSticker(sticker.id)}
                  aria-label="스티커 삭제"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {message && (
            <p className="save-message" role="status">
              {message}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Decorate;
