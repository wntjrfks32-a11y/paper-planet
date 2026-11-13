
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Gallery.css";

function Gallery() {
  const navigate = useNavigate();

  const [artworks, setArtworks] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("paperPlanetGallery")
      ) || [];
    } catch {
      return [];
    }
  });

  const deleteArtwork = (id) => {
    const updatedArtworks = artworks.filter(
      (artwork) => artwork.id !== id
    );

    setArtworks(updatedArtworks);

    localStorage.setItem(
      "paperPlanetGallery",
      JSON.stringify(updatedArtworks)
    );
  };

  const openArtwork = (artwork) => {
    navigate("/decorate", {
      state: {
        savedArtwork: artwork,
      },
    });
  };

  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <Link to="/" className="gallery-logo">
          PAPER PLANET.
        </Link>

        <Link to="/decorate" className="gallery-home-link">
          편집기로 돌아가기
        </Link>
      </header>

      <section className="gallery-heading">
        <p>MY LITTLE COLLECTION</p>
        <h1>나만의 작품 보관함</h1>
        <span>
          소중하게 꾸민 나만의 작품들을 모아 보세요.
        </span>
      </section>

      <section className="gallery-content">
        <div className="gallery-count">
          <h2>My Artworks</h2>
          <span>{artworks.length}개의 작품</span>
        </div>

        {artworks.length === 0 ? (
          <div className="gallery-empty">
            <span>🎀</span>
            <h3>아직 저장한 작품이 없어요.</h3>
            <p>첫 번째 작품을 만들어 보세요!</p>

            <Link to="/decorate">
              작품 만들러 가기
            </Link>
          </div>
        ) : (
          <div className="gallery-grid">
            {artworks.map((artwork) => (
              <article className="gallery-card" key={artwork.id}>
                <div className="gallery-preview">
                  {artwork.stickers.map((sticker) => (
                    <span
                      key={sticker.id}
                      className="gallery-sticker"
                      style={{
                        left: `${(sticker.x / 700) * 100}%`,
                        top: `${(sticker.y / 580) * 100}%`,
                      }}
                    >
                      {sticker.emoji}
                    </span>
                  ))}
                </div>

                <div className="gallery-card-info">
                  <div>
                    <h3>{artwork.name}</h3>
                    <p>{artwork.date}</p>
                  </div>

                  <div className="gallery-card-actions">
                    <button
                      onClick={() => openArtwork(artwork)}
                    >
                      열기
                    </button>

                    <button
                      className="gallery-delete"
                      onClick={() => deleteArtwork(artwork.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Gallery;
