import { useEffect, useMemo, useState } from "react";
import type { WeddingPhoto } from "../types/photo";

const SLIDESHOW_INTERVAL_MS = 3500;

type LightboxProps = {
  photos: WeddingPhoto[];
  activeIndex: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

export default function Lightbox({
  photos,
  activeIndex,
  onChange,
  onClose,
}: LightboxProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const activePhoto = photos[activeIndex];

  const nextIndex = useMemo(
    () => (activeIndex + 1) % photos.length,
    [activeIndex, photos.length],
  );
  const previousIndex = useMemo(
    () => (activeIndex - 1 + photos.length) % photos.length,
    [activeIndex, photos.length],
  );

  useEffect(() => {
    document.body.classList.add("body--locked");

    return () => {
      document.body.classList.remove("body--locked");
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        onChange(nextIndex);
      }

      if (event.key === "ArrowLeft") {
        onChange(previousIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextIndex, onChange, onClose, previousIndex]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const intervalId = window.setInterval(() => {
      onChange((activeIndex + 1) % photos.length);
    }, SLIDESHOW_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, isPlaying, onChange, photos.length]);

  if (!activePhoto) {
    return null;
  }

  return (
    <div className="lightbox" aria-modal="true" role="dialog">
      <button
        className="lightbox__close"
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        x
      </button>

      <button
        className="lightbox__nav lightbox__nav--prev"
        type="button"
        onClick={() => onChange(previousIndex)}
        aria-label="Previous photo"
      >
        ‹
      </button>

      <figure className="lightbox__figure">
        <img
          key={activePhoto.id}
          src={activePhoto.fullUrl}
          alt={activePhoto.name}
          decoding="async"
        />
      </figure>

      <button
        className="lightbox__nav lightbox__nav--next"
        type="button"
        onClick={() => onChange(nextIndex)}
        aria-label="Next photo"
      >
        ›
      </button>

      <div className="lightbox__toolbar">
        <span>
          {activeIndex + 1} / {photos.length}
        </span>
        <button
          className="button button--ghost"
          type="button"
          onClick={() => setIsPlaying((current) => !current)}
        >
          {isPlaying ? "Pause" : "Play Slideshow"}
        </button>
      </div>
    </div>
  );
}
