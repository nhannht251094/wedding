import { useState } from "react";
import type { WeddingPhoto } from "../types/photo";
import ImageCard from "./ImageCard";
import Lightbox from "./Lightbox";

type GalleryProps = {
  photos: WeddingPhoto[];
  isLoading: boolean;
  error: string | null;
};

export default function Gallery({ photos, isLoading, error }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-heading fade-in">
        <span className="section-kicker">Curated frames</span>
        <h2>The Wedding Archive.</h2>
        <p>
          A dark, floral album wall for the portraits, vows, details, and
          little in-between moments worth keeping close.
        </p>
      </div>

      {isLoading && (
        <div className="masonry-grid" aria-label="Loading our memories">
          {Array.from({ length: 10 }, (_, index) => (
            <div
              className="skeleton-card"
              key={index}
              style={{ minHeight: `${220 + (index % 4) * 44}px` }}
            />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <div className="state-message" role="alert">
          <h3>Could not load photos.</h3>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && photos.length === 0 && (
        <div className="state-message">
          <h3>No memories found yet.</h3>
          <p>Add shared image files to the Google Drive folder.</p>
        </div>
      )}

      {!isLoading && !error && photos.length > 0 && (
        <div className="masonry-grid">
          {photos.map((photo, index) => (
            <ImageCard
              key={photo.id}
              photo={photo}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}

      {activeIndex !== null && (
        <Lightbox
          photos={photos}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
}
